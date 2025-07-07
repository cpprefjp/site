# iota_diff_t
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

## 概要

[`iota_view`](../iota_view.md)のイテレータの差の型。

このクラスの名前は規定されていない。

このクラスの型を取得したい場合、[`range_difference_t`](../range_difference_t.md)を使用できる。

## 定義

`iota_diff_t(W)` は次のように定義される。

1. `W`が整数型ではないか、`sizeof(`[`iter_difference_t`](/reference/iterator/iter_difference_t.md)`<W>) > sizeof(W)`ならば、[`iter_difference_t`](/reference/iterator/iter_difference_t.md)`<W>`
2. それ以外の場合、そのような型が存在すれば、符号付き整数型であってその幅が`W`の幅より大きい型
3. それ以外の場合、未規定の[符号付き整数のような型](/reference/iterator/is_integer_like.md)で、幅が`W`の幅以上の型

## 実装例(MSVC)
```cpp
template <class _Ty>
using _Iota_diff_t = conditional_t<is_integral_v<_Ty>,
  conditional_t<sizeof(_Ty) < sizeof(int), int,
    conditional_t<sizeof(_Ty) < sizeof(long long), long long, _Signed128>>,
  iter_difference_t<_Ty>>;
```
* conditional_t[link /reference/type_traits/conditional.md]
* is_integral_v[link /reference/type_traits/is_integral.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
