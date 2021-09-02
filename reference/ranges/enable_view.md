# enable_view
* ranges[meta header]
* std::ranges[meta namespace]
* variable[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class T>
  inline constexpr bool enable_view = derived_from<T, view_base>;
}
```
* derived_from[link /reference/concepts/derived_from.md]
* view_base[link view_base.md]

## 概要

`enable_view<T>`が`true`であることは、`T`が[`view`](view.md)であるための必要条件である。

[`view`](view.md)コンセプトの要件は意味論要件がメインなため、[`view_base`](view_base.md)を基底クラスにするか、`enable_view`を特殊化することで、明示的に`view`であることを示すようになっている。

## 例

```cpp example
#include <ranges>

int main()
{
  using namespace std::ranges;
  static_assert(enable_view<view_base>);
  static_assert(!enable_view<int>);
    
  struct t : view_base { };
    
  static_assert(enable_view<t>);
}
```
* enable_view[color ff0000]
* view_base[link view_base.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 6

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
