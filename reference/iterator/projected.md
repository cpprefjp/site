# projected
* iterator[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  // (1) C++20の定義
  template <indirectly_readable I, indirectly_regular_unary_invocable<I> Proj>
  struct projected {
    using value_type = remove_cvref_t<indirect_result_t<Proj&, I>>;

    indirect_result_t<Proj&, I> operator*() const;	// 宣言のみ
  };
  // incrementable_traitsにアダプトする
  template <weakly_incrementable I, class Proj>
  struct incrementable_traits<projected<I, Proj>> {
    using difference_type = iter_difference_t<I>;
  };

  // (1) C++26の定義
  template <class I, class Proj>
  struct projected-impl { // 説明用の型
    struct type { // 説明用の型
      using value_type = remove_cvref_t<indirect_result_t<Proj&, I>>;
      using difference_type = iter_difference_t<I>; // weakly_incrementableをモデル化する場合にのみ存在する
      indirect_result_t<Proj&, I> operator*() const; // 宣言のみで定義なし
    };
  };
  template <indirectly_readable I, indirectly_regular_unary_invocable<I> Proj>
  using projected = projected-impl<I, Proj>::type;
}
```
* indirectly_readable[link /reference/iterator/indirectly_readable.md]
* indirectly_regular_unary_invocable[link /reference/iterator/indirectly_unary_invocable.md]
* indirect_result_t[link /reference/iterator/indirect_result_t.md]
* incrementable_traits[link /reference/iterator/incrementable_traits.md]

## 概要

間接参照可能な型`I`に任意の射影操作`Proj`を適用した結果を表す[`indirectly_readable`](/reference/iterator/indirectly_readable.md)のモデルとなる型を生成する。

これは射影操作を受け取るコンセプトやアルゴリズムを制約するために使用するものであり、評価される文脈で使用可能ではない。主に、射影操作の結果に対してイテレータ関連のコンセプトを適用する場合に使用する（射影の結果を再び`indirectly_readable`な型に写す事で、一部のイテレータに対するコンセプトを使いまわす事が出来る）。


## 備考
- C++26:
    - C++20の`projected`の定義では、ADLによって不完全型に完全な定義を要求してしまっており、以下のようなコードがコンパイルエラーになっていたが、C++26での定義変更によって不完全型が許容されるようになった。
        ```cpp
        Holder<Incomplete> *a[10] = {};
        std::ranges::count(a, a + 10, nullptr); // コンパイルエラー
        ```

## 例
```cpp example
#include <iterator>
#include <vector>

int main() {
  using vec_iterator = std::vector<int>::iterator;
  using vecitr_proj = std::projected<vec_iterator, std::identity>;

  static_assert(std::indirectly_readable<vecitr_proj>);
  static_assert(std::same_as<vecitr_proj::value_type                  , int>);
  static_assert(std::same_as<std::iter_difference_t<vecitr_proj>      , std::ptrdiff_t>);
  static_assert(std::same_as<std::iter_value_t<vecitr_proj>           , int>);
  static_assert(std::same_as<std::iter_reference_t<vecitr_proj>       , int&>);
  static_assert(std::same_as<std::iter_rvalue_reference_t<vecitr_proj>, int&&>);
  static_assert(std::same_as<std::iter_common_reference_t<vecitr_proj>, int&>);

  //別の射影でプロジェクション
  using vecitr_proj2 = std::projected<vec_iterator, decltype([](int) -> double { return 0.0;})>;

  static_assert(std::indirectly_readable<vecitr_proj2>);
  static_assert(std::same_as<vecitr_proj2::value_type                  , double>);
  static_assert(std::same_as<std::iter_difference_t<vecitr_proj2>      , std::ptrdiff_t>);
  static_assert(std::same_as<std::iter_value_t<vecitr_proj2>           , double>);
  static_assert(std::same_as<std::iter_reference_t<vecitr_proj2>       , double>);
  static_assert(std::same_as<std::iter_rvalue_reference_t<vecitr_proj2>, double>);
  static_assert(std::same_as<std::iter_common_reference_t<vecitr_proj2>, double>);
}
```
* std::projected[color ff0000]
* indirectly_readable[link /reference/iterator/indirectly_readable.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]
* iter_common_reference_t[link /reference/iterator/iter_common_reference_t.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 6 [mark verified]

## 関連項目

- [`projected_value_t`](projected_value_t.md)
- [`indirectly_comparable`](indirectly_comparable.md)
- [`mergeable`](mergeable.md)
- [`sortable`](sortable.md)

## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [P2538R1 ADL-proof `std::projected`](http://open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2538r1.html)
