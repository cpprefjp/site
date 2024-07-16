# tuple_size
* ranges[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class I, class S, ranges::subrange_kind K>
  struct tuple_size<ranges::subrange<I, S, K>> : integral_constant<size_t, 2> {};
}
```
* integral_constant[link /reference/type_traits/integral_constant.md]

## 概要
`tuple_size`は、タプルとして見なせる型の要素数を取得するためのクラスである。

要素数は、[`integral_constant`](/reference/type_traits/integral_constant.md)の機能を利用してコンパイル時の定数値として取得できる。

[`<ranges>`](/reference/ranges.md)ヘッダでは、[`subrange`](/reference/ranges/subrange.md)に関する特殊化を定義する。

[`subrange`](/reference/ranges/subrange.md)をタプルとして見たとき、大きさ2で、第0要素はイテレータ、第1要素は番兵である。

## 例
```cpp example
#include <ranges>

int main()
{
  constexpr std::ranges::subrange sub = std::views::empty<int>;
  static_assert(std::tuple_size<decltype(sub)>::value == 2);
}
```
* std::tuple_size[color ff0000]
* std::ranges::subrange[link /reference/ranges/subrange.md]
* std::views::empty[link /reference/ranges/empty_view.md]

### 出力
```
```

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
