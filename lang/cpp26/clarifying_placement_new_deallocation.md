# 配置newの解放処理を明確化 [P3769R1]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
配置`new`式 (placement new-expression) で確保したメモリ上にオブジェクトを構築する際、そのコンストラクタが例外を送出すると、確保したメモリを解放するために「対応する配置解放関数 (placement deallocation function) 」が呼び出される。

この、呼び出す配置解放関数を選択する規則が規格上あいまいに規定されており、コンパイラによって挙動が分かれていた。C++26では、この選択規則を明確化する。とくに、関数テンプレートである配置解放関数が候補として考慮され、テンプレート引数推論が行われることが規定される (従来の規定では考慮されなかった)。

```cpp
#include <cstddef>
#include <new>

struct Tag {};

void* operator new(std::size_t s, Tag)
{
  return ::operator new(s);
}

// 上記の配置newに対応する配置delete
void operator delete(void* p, Tag)
{
  ::operator delete(p);
}

struct X {
  X() { throw 0; }
};

int main()
{
  // Xのコンストラクタが例外を送出すると、対応する配置delete (operator delete(void*, Tag))
  // が呼び出され、確保したメモリが解放される
  try {
    X* p = new (Tag{}) X;
    (void)p;
  }
  catch (...) {}
}
```


## 仕様
配置確保関数 (placement allocation function) に対応する配置解放関数は、次のように選択される。

1. 候補のうち関数テンプレートであるものは、テンプレート引数推論によって生成される特殊化に置き換える。
2. 第1引数を除いたパラメータ型リストが、配置確保関数のものと一致しない候補を除外する。
3. 制約 (constraint) を満たさない候補を除外する。
4. 残った候補がちょうど1つであれば、それを呼び出す配置解放関数として選択する。そうでない (該当なし、または複数残る) 場合は、解放関数は呼び出されない (メモリは解放されずリークする)。

選択された配置解放関数は、削除 (`= delete`) されておらず、配置`new`式が現れる位置からアクセス可能でなければならない。また、通常の (配置でない) 解放関数が配置解放関数として選択される状況では、プログラムは不適格となる。


## 例
関数テンプレートである配置解放関数も候補として考慮され、テンプレート引数推論によって選択される。

```cpp example
#include <cstddef>
#include <iostream>
#include <new>

template <int I>
struct Tag {};

template <int I>
void* operator new(std::size_t s, Tag<I>)
{
  return ::operator new(s);
}

// 関数テンプレートの配置delete
template <int I>
void operator delete(void* p, Tag<I>)
{
  std::cout << "template placement delete<" << I << "> called" << std::endl;
  ::operator delete(p);
}

struct X {
  X() { throw 0; }
};

int main()
{
  // Xのコンストラクタが例外を送出すると、テンプレート引数推論によってI=7が推論され、
  // operator delete<7>(void*, Tag<7>) が呼び出される
  try {
    X* p = new (Tag<7>{}) X;
    (void)p;
  }
  catch (...) {}
}
```

### 出力
```
template placement delete<7> called
```


## この機能が必要になった背景・経緯
この変更は、[P3492R2 Sized deallocation for placement new](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3492r2.html)に含まれていた、配置`new`式での解放関数選択に関する副次的な修正を、レビューしやすいように独立した提案として切り出したものである。

配置解放関数の選択については、以下の2点で実装が分かれていた。

- 関数テンプレートを候補として考慮しテンプレート引数推論を行うかどうか。従来の規格では「考慮しない」とされていたが、実際にはEDGのみがこれ (グローバルな解放関数テンプレートに限る) に準拠していた。
- 削除された、またはアクセスできない解放関数が選択された場合にプログラムを不適格とする規定について、GCCとEDGが非準拠だった。

これらの実装の不一致を解消するため、規格のwordingを整理して明確化し、欠陥報告 (DR) として適用する。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [`operator new`](/reference/new/op_new.md)
- [`operator delete`](/reference/new/op_delete.md)


## 参照
- [P3769R1 Clarification of placement new deallocation](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3769r1.html)
    - 配置`new`式での配置解放関数の選択規則を明確化する欠陥報告 (DR)
- [P3492R2 Sized deallocation for placement new](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3492r2.html)
- [P2719R5 Type-aware allocation and deallocation functions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2719r5.html)
