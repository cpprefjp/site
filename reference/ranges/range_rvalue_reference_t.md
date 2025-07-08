# range_rvalue_reference_t
* ranges[meta header]
* std::ranges[meta namespace]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<range R>
  using range_rvalue_reference_t = iter_rvalue_reference_t<iterator_t<R>>;
}
```

## 概要

任意のRange型`R`から、そのRangeの要素の右辺値参照型を取得する。

## 例
```cpp example
#include <ranges>
#include <vector>

int main() {
  static_assert(std::same_as<std::ranges::range_rvalue_reference_t<std::vector<int>>, int&&>);
}
```
* std::ranges::range_rvalue_reference_t[color ff0000]

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
