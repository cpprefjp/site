# 共用体メンバの生存期間規則の調整 [P3726R2]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26では、[共用体の特殊メンバ関数のトリビアル化](/lang/cpp26/trivial_unions.md)（P3074R7）が導入した「トリビアルなデフォルトコンストラクタは、共用体の先頭メンバが暗黙的生存期間型であればそのメンバの生存期間を暗黙に開始する」という規則が問題を起こすことがわかったため、正式発行前のC++26に対する修正として、次のように調整される。

- 先頭メンバの生存期間を暗黙に開始する規則は撤回される。トリビアルなデフォルトコンストラクタは、どのメンバの生存期間も開始しない
- 代わりに、オブジェクトの生存期間を明示的に開始する[`std::start_lifetime()`](/reference/memory/start_lifetime.md)関数が[`<memory>`](/reference/memory.md)に追加される。この関数は定数評価の中でも使用でき、共用体メンバを対象とした場合はそのメンバがアクティブメンバとなる
- 共用体メンバの配列については、一部の要素だけが生存期間内にある状態（未初期化の「穴」がある状態）でも定数式の結果として許可されるよう、構成要素値 (constituent value) の規則が緩和される

これによって、共用体を未初期化ストレージとして使う固定容量コンテナは次のように実装でき、部分的にしか要素を構築していない状態でも`constexpr`変数や定数テンプレート引数として使用できる。

```cpp
template <typename T, std::size_t N>
struct FixedVector {
  union { T storage[N]; };
  std::size_t size = 0;

  constexpr FixedVector() {
    // 配列T[N]自体の生存期間だけを明示的に開始し、アクティブメンバにする
    // （コンストラクタは呼ばれず、各要素の生存期間はまだ開始されない）
    std::start_lifetime(storage);
  }

  constexpr ~FixedVector() {
    std::destroy(storage, storage + size);
  }

  constexpr void push_back(T const& v) {
    std::construct_at(storage + size, v);  // storageは生存期間内なので適格
    ++size;
  }
};

// OK: storage[0]だけが生存期間内で、残り3要素は生存期間外（穴）だが、
// 生存期間外の配列要素は構成要素値から除外されるため定数式として有効
constexpr FixedVector<int, 4> v = [] {
  FixedVector<int, 4> v;
  v.push_back(1);
  return v;
}();
```
* std::start_lifetime[link /reference/memory/start_lifetime.md]
* std::construct_at[link /reference/memory/construct_at.md]
* std::destroy[link /reference/memory/destroy.md]


## 仕様
- P3074R7が導入した、トリビアルなデフォルトコンストラクタが共用体の先頭メンバ（暗黙的生存期間型の場合）の生存期間を開始するという規定は削除される
- 共用体要素部分オブジェクト (union elemental subobject) という用語が定義される。共用体の直接のメンバ、および共用体要素部分オブジェクトである配列の要素がこれにあたり、生存期間内にないものを非アクティブな共用体要素部分オブジェクトと呼ぶ
    - オブジェクトの構成要素値・構成要素参照の規則は、「非アクティブな共用体メンバ」ではなく「非アクティブな共用体要素部分オブジェクト」を除外するよう変更される。これにより、共用体メンバの配列に生存期間外の要素が含まれていても、その要素は定数式の妥当性判定の対象にならない
- テンプレート引数の等価性の規則が拡張され、配列型の2つの値は、対応する要素どうしが「両方とも生存期間内で等価」または「両方とも生存期間外」である場合に等価となる
- [`<memory>`](/reference/memory.md)に[`std::start_lifetime()`](/reference/memory/start_lifetime.md)関数が追加される
- 機能テストマクロが次のように変更される
    - `__cpp_trivial_union`の値が`202603L`に更新される
    - `__cpp_lib_start_lifetime`（値`202603L`）が追加される


## 例
```cpp
#include <memory>

struct A {
  union {
    int i;
    int arr[4];
  };
};

constexpr A v1;         // OK: 構成要素値はない（どのメンバも生存期間外）
constexpr A v2{.i = 1}; // OK: 構成要素値は {v2.i}
constexpr A v3 = [] {
  A a;
  std::start_lifetime(a.arr);  // arrが共用体のアクティブメンバとなる
  std::construct_at(&a.arr[1], 1);
  a.arr[2] = 2;
  return a;
}();                    // OK: 構成要素値は {v3.arr[1], v3.arr[2]}。
                        // 生存期間外のv3.arr[0]とv3.arr[3]は除外される

int main() {}
```
* std::start_lifetime[link /reference/memory/start_lifetime.md]
* std::construct_at[link /reference/memory/construct_at.md]

このコードはC++26の最終的な規則のもとでは適格だが、2026年9月時点でこの調整を実装した処理系はない（GCC trunkはP3074R7時点の規則を実装しており、`__cpp_trivial_union`は`202502L`、`std::start_lifetime()`は未実装である）。

### 出力
```
```


## この機能が必要になった背景・経緯
P3074R7の「先頭メンバの生存期間の暗黙開始」には、次の問題が指摘された。

- アクティブメンバを持たない共用体オブジェクトを定数テンプレート引数として使っていた既存の適格なコードが、暗黙開始によってアクティブメンバを持つようになり、意味（マングリング）が変わってABI破壊となる。さらにテンプレート引数として無効になりコンパイルエラーとなる場合もある

また、暗黙開始とは独立して、構成要素値の規則にも問題があった。共用体メンバの配列がアクティブになると全要素が構成要素値の判定対象になるため、[`std::inplace_vector`](/reference/inplace_vector/inplace_vector.md)のように配列の一部の要素だけを構築するコンテナは、未初期化の要素が不定値・エラー値と判定されて`constexpr`変数にできなかった。

そこで本提案では、暗黙開始を撤回した上で、初期の提案（P3074R0）にあった「生存期間を開始する専用関数」のアプローチを採用し、あわせて配列の「穴」を許可するよう構成要素値の規則を緩和した。配列以外の集成体へ穴の許可を広げることも検討されたが、生存期間外の要素を含む配列はヒープ確保された配列（[`std::allocator`](/reference/memory/allocator.md)`::`[`allocate()`](/reference/memory/allocator/allocate.md)は配列オブジェクトの生存期間を開始するが要素の生存期間は開始しない）としてすでに存在する概念であるのに対し、それ以外への拡張には十分な動機がないとして、C++26では配列に限定された。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++26 共用体の特殊メンバ関数のトリビアル化](/lang/cpp26/trivial_unions.md)
- [`std::start_lifetime()`](/reference/memory/start_lifetime.md)
- [`std::inplace_vector`](/reference/inplace_vector/inplace_vector.md)


## 参照
- [P3726R2 Adjustments to Union Lifetime Rules](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3726r2.html)
- [P3074R7 trivial unions (was std::uninitialized)](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3074r7.html)
    - 本提案が調整対象とした、共用体の特殊メンバ関数をトリビアル化する提案
