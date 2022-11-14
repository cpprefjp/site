# subrange
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<input_or_output_iterator I, sentinel_for<I> S = I, subrange_kind K = sized_sentinel_for<S, I> ? subrange_kind::sized : subrange_kind::unsized>
    requires (K == subrange_kind::sized || !sized_sentinel_for<S, I>)
  class subrange : public view_interface<subrange<I, S, K>> { …… };
}
```
* input_or_output_iterator[link /reference/iterator/input_or_output_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* subrange_kind[link subrange_kind.md]
* view_interface[link view_interface.md]

## 概要
`subrange`は、イテレータ`i`と番兵`s`が表す範囲`[i, s)`をRangeとして扱うクラステンプレート。

`subrange`は[`borrowed_range`](borrowed_range.md)、[`view`](view.md)のモデルであり、また、大きさ2のtuple-likeな型である。第0要素はイテレータ、第1要素は番兵。

`subrange`は[`sized_range`](sized_range.md)である場合(`K == subrange_kind::sized`)とそうでない場合(`K == subrange_kind::unsized`)の両方をサポートする。
また、元のRangeが[`sized_range`](sized_range.md)でなくても、長さを別に指定することで[`sized_range`](sized_range.md)になれる。

## テンプレートパラメータ制約
[`subrange_kind`](subrange_kind.md)`​ K`が`sized`である。または、イテレータ`I`と番兵`S`が[`sized_sentinel_for`](/reference/iterator/sized_sentinel_for.md)を満たさない。

## メンバ関数

| 名前                                           | 説明                             | 対応バージョン |
|------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](subrange/op_constructor.md)  | コンストラクタ                   | C++20          |
| [`operator PairLike`](subrange/op_pairlike.md) | pair-likeな型に変換する          | C++20          |
| [`begin`](subrange/begin.md)                   | 先頭を指すイテレータを取得する   | C++20          |
| [`end`](subrange/end.md)                       | 番兵を取得する                   | C++20          |
| [`empty`](subrange/empty.md)                   | Rangeが空かどうかを判定する      | C++20          |
| [`size`](subrange/size.md)                     | 要素数を取得する                 | C++20          |
| [`next`](subrange/next.md)                     | 先頭を前進させた部分Rangeを得る  | C++20          |
| [`prev`](subrange/prev.md)                     | 先頭を後退させた部分Rangeを得る  | C++20          |
| [`advance`](subrange/advance.md)               | 部分Rangeの先頭を動かす          | C++20          |

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|-----------------------------------|----------------|
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++20          |
| [`data`](view_interface/data.md)             | 配列の先頭へのポインタを取得する  | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する        | C++20          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する        | C++20          |
| [`operator[]`](view_interface/op_at.md)      | 要素へアクセスする                | C++20          |


## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](subrange/op_deduction_guide.md) | クラステンプレートの推論補助 | C++20          |

## カスタマイゼーション

| 名前                                                         | 説明                                                | 対応バージョン |
|--------------------------------------------------------------|-----------------------------------------------------|----------------|
| [`enable_borrowed_range`](subrange/enable_borrowed_range.md) | `enable_borrowed_range`の特殊化 (variable template) | C++20          |

## タプルインターフェース

| 名前                                         | 説明                               | 対応バージョン |
|----------------------------------------------|------------------------------------|----------------|
| [`tuple_size`](subrange/tuple_size.md)       | 静的な要素数取得(class template)   | C++20          |
| [`tuple_element`](subrange/tuple_element.md) | 静的な要素の型取得(class template) | C++20          |
| [`get`](subrange/get.md)                     | 要素を取得する(function template)  | C++20          |

## 説明専用コンセプト

このクラスの説明では以下のコンセプトを用いる。

```cpp
// uses-nonqualification-pointer-conversion: 直接変換できない型同士のポインタの変換が必要
template<class From, class To>
concept uses-nonqualification-pointer-conversion =
  is_pointer_v<From> && is_pointer_v<To> &&
  !convertible_to<remove_pointer_t<From>(*)[], remove_pointer_t<To>(*)[]>;

// convertible-to-non-slicing: スライシングを起こさずに変換できる
template<class From, class To>
concept convertible-to-non-slicing =
  convertible_to<From, To> &&
  !uses-nonqualification-pointer-conversion<decay_t<From>, decay_t<To>>;

// pair-like: 大きさ2のtuple-likeな型である
template<class T>
concept pair-like =
  !is_reference_v<T> && requires(T t) {
    typename tuple_size<T>::type;
    requires derived_from<tuple_size<T>, integral_constant<size_t, 2>>;
    typename tuple_element_t<0, remove_const_t<T>>;
    typename tuple_element_t<1, remove_const_t<T>>;
    { get<0>(t) } -> convertible_to<const tuple_element_t<0, T>&>;
    { get<1>(t) } -> convertible_to<const tuple_element_t<1, T>&>;
  };

// pair-like-convertible-from: U, Vから構築できるpair-likeである (その際、Uはスライシングを起こさない)
template<class T, class U, class V>
concept pair-like-convertible-from =
  !range<T> && pair-like<T> &&
  constructible_from<T, U, V> &&
  convertible-to-non-slicing<U, tuple_element_t<0, T>> &&
  convertible_to<V, tuple_element_t<1, T>>;
```
* convertible_to[link /reference/concepts/convertible_to.md]
* constructible_from[link /reference/concepts/derived_from.md]
* derived_from[link /reference/concepts/derived_from.md]
* is_pointer_v[link /reference/type_traits/is_pointer.md]
* decay_t[link /reference/type_traits/decay.md]
* integral_constant[link /reference/type_traits/integral_constant.md]
* remove_pointer_t[link /reference/type_traits/remove_pointer.md]
* remove_const_t[link /reference/type_traits/remove_const.md]
* range[link /reference/ranges/range.md]
* tuple_element_t[link /reference/tuple/tuple_element.md]
* not-same-as[italic][link /reference/concepts/same_as.md]
* uses-nonqualification-pointer-conversion[italic]
* convertible-to-non-slicing[italic]
* pair-like[italic]
* pair-like-convertible-from[italic]
* make-unsigned-like-t[italic][link /reference/type_traits/make_unsigned.md]


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
