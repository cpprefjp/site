# view_base
* ranges[meta header]
* std::ranges[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  struct view_base { };
}
```

## 概要

`view_base`は、基底クラスにすることで[`view`](view.md)コンセプトの構文要件の1つである[`enable_view`](enable_view.md)を満たすタグ型である。

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
* view_base[color ff0000]
* enable_view[link enable_view.md]

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
