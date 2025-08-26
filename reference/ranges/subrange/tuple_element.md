# tuple_element
* ranges[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class I, class S, ranges::subrange_kind K>
  struct tuple_element<0, ranges::subrange<I, S, K>> {
    using type = I;
  };

  template<class I, class S, ranges::subrange_kind K>
  struct tuple_element<0, const ranges::subrange<I, S, K>> {
    using type = I;
  };

  template<class I, class S, ranges::subrange_kind K>
  struct tuple_element<1, ranges::subrange<I, S, K>> {
    using type = S;
  };

  template<class I, class S, ranges::subrange_kind K>
  struct tuple_element<1, const ranges::subrange<I, S, K>> {
    using type = S;
  };
}
```
* ranges::subrange[link ../subrange.md]
* ranges::subrange_kind[link ../subrange_kind.md]


## 概要
`tuple_element`は、タプルとして見なせる型から、`I`番目の要素型を取得するためのクラスである。

[`<ranges>`](/reference/ranges.md)ヘッダでは、[`subrange`](/reference/ranges/subrange.md)に関する特殊化を定義する。

[`subrange`](/reference/ranges/subrange.md)をタプルとして見たとき、大きさ2で、第0要素はイテレータ、第1要素は番兵である。

## 例
```cpp example
#include <ranges>
#include <concepts>

int main()
{
  constexpr std::ranges::subrange sub = std::views::empty<int>;
  static_assert(std::same_as<std::tuple_element_t<0, decltype(sub)>, std::ranges::iterator_t<decltype(sub)>>);
  static_assert(std::same_as<std::tuple_element_t<1, decltype(sub)>, std::ranges::sentinel_t<decltype(sub)>>);
}
```
* std::tuple_element_t[link /reference/tuple/tuple_element.md]
* std::ranges::subrange[link /reference/ranges/subrange.md]
* std::same_as[link /reference/concepts/same_as.md]
* std::ranges::iterator_t[link /reference/ranges/iterator_t.md]
* std::ranges::sentinel_t[link /reference/ranges/sentinel_t.md]
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
