# observable_checkpoint
* utility[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  void observable_checkpoint() noexcept;
}
```

## 概要
観測可能チェックポイント (observable checkpoint) を設置する。

C++では未定義動作を含むプログラムに対して、コンパイラは未定義動作が「将来」発生することを根拠に、それより「前」の操作を削除・変更する最適化を行うことが許容される。これは「タイムトラベル最適化」と呼ばれる。

例として以下のコードでは、(2)で未定義動作があるため、(1)の出力すら省略される可能性がある:

```cpp
#include <cstdio>

int main() {
  std::printf("Hello, ");   // (1) 出力
  int* p = nullptr;
  *p = 42;                  // (2) 未定義動作（nullポインタのデリファレンス）
  std::printf("World!\n");  // (3) 出力
}
```

`std::observable_checkpoint()`を呼び出すと、その時点で観測可能チェックポイントが設置される。観測可能チェックポイントより前に完了した操作の観測可能な動作は、その後に発生する未定義動作によって遡って無効化されないことが保証される。これにより、タイムトラベル最適化を抑止できる:

```cpp
#include <cstdio>
#include <utility>

int main() {
  std::printf("Hello, ");          // (1) 出力
  std::observable_checkpoint();    // ここまでの観測可能な動作を保護
  int* p = nullptr;
  *p = 42;                         // (2) 未定義動作
  std::printf("World!\n");         // (3) 出力
}
```

この場合、`std::observable_checkpoint()`によって(1)の出力`"Hello, "`が保護され、(2)の未定義動作があっても遡って消去されない。

`std::observable_checkpoint()`の明示的な呼び出しに加え、以下の操作も暗黙的に観測可能チェックポイントを設置する:

- C標準の入出力関数（[`std::printf()`](/reference/cstdio/printf.md)、[`std::fwrite()`](/reference/cstdio/fwrite.md)など）のうち、ファイルへのデータ書き込みを行う関数呼び出しからの復帰
- [`std::basic_filebuf`](/reference/fstream/basic_filebuf.md)のオーバーフロー操作（出力シーケンスへの書き込み完了時）
- Unicode出力時の[`std::print()`](/reference/print/print.md) / [`std::println()`](/reference/print/println.md)の内部出力関数[`std::vprint_unicode()`](/reference/print/vprint_unicode.md)によるターミナルへの書き込み（[`<ostream>`](/reference/ostream.md)版および[`<print>`](/reference/print.md)版）

上記の例では`std::printf()`がC標準の入出力関数であるため、(1)の呼び出しの復帰が暗黙の観測可能チェックポイントとなり、`"Hello, "`の出力は(2)の未定義動作によって遡って消去されない。


## 効果
観測可能チェックポイントを設置する。


## 例外
投げない


## 備考
- `std::observable_checkpoint()`の呼び出し自体は観測可能な動作ではない。コンパイラはこの関数を組み込み関数 (intrinsic) として実装でき、最適化後にゼロ命令のコードを生成できる
- `volatile`アクセスは暗黙の観測可能チェックポイントではない。`volatile`アクセスの順序保証は従来の happens before 規則に従う
- この関数はフリースタンディング環境でも使用可能である


## 例
### 基本的な使い方
```cpp example
#include <cstdio>
#include <utility>

int table[10];

void process(int i) {
  std::printf("processing %d\n", i);  // (1) 暗黙の観測可能チェックポイント
  table[i] = i * i;                   // i が範囲外なら未定義動作
}

int main() {
  for (int i = 0; i < 12; ++i) {
    process(i);
  }
}
```

この例では、`i`が10以上になると`table[i]`で範囲外アクセスの未定義動作が発生する。しかし`std::printf()`はC標準の入出力関数であり、呼び出しの復帰が暗黙の観測可能チェックポイントとなる。そのため、`i`が0から9までの反復で出力された`"processing 0"`から`"processing 9"`は、その後の未定義動作によって遡って消去されることはない。

#### 出力例
```
processing 0
processing 1
processing 2
processing 3
processing 4
processing 5
processing 6
processing 7
processing 8
processing 9
processing 10
processing 11
```

### 明示的なチェックポイントの設置
```cpp example
#include <cstdio>
#include <utility>

int main() {
  int result = 0;

  for (int i = 1; i <= 5; ++i) {
    result += i;
  }
  std::printf("sum = %d\n", result);
  std::observable_checkpoint();  // ここまでの出力を保護

  // 以降のコードに未定義動作があっても
  // "sum = 15" の出力は保証される
  int* p = nullptr;
  *p = 0;  // 未定義動作
}
```
* std::observable_checkpoint[color ff0000]

#### 出力例
```
sum = 15
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 15 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`unreachable`](unreachable.md)


## 参照
- [P1494R5 Partial program correctness](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p1494r5.html)
- [P3641R0 Rename `std::observable` to `std::observable_checkpoint`, and add a feature-test macro](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3641r0.html)
