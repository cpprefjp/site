# get
* ranges[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<size_t N, class I, class S, subrange_kind K>
    requires (N < 2)
  constexpr auto get(const subrange<I, S, K>& r);

  template<size_t N, class I, class S, subrange_kind K>
    requires (N < 2)
  constexpr auto get(subrange<I, S, K>&& r);
}

namespace std {
  using ranges::get;
}
```
* subrange[link ../subrange.md]
* subrange_kind[link ../subrange_kind.md]

## 概要
タプルと見なせる型から指定した位置の要素を取得する。

[`<ranges>`](/reference/ranges.md)ヘッダでは、[`subrange`](/reference/ranges/subrange.md)に関する特殊化を定義する。

[`subrange`](/reference/ranges/subrange.md)をタプルとして見たとき、大きさ2で、第0要素はイテレータ、第1要素は番兵である。

## 効果

```cpp
if constexpr (N == 0)
  return r.begin();
else
  return r.end();
```


## 例外
投げない


## 例
```cpp example
#include <ranges>

int main()
{
  constexpr std::ranges::subrange sub = std::views::empty<int>;
  static_assert(std::get<0>(sub) == sub.begin());
  static_assert(std::get<1>(sub) == sub.end());
}
```
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
