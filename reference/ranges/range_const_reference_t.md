# range_const_reference_t
* ranges[meta header]
* std::ranges[meta namespace]
* type-alias[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<range R>
  using range_const_reference_t = iter_const_reference_t<iterator_t<R>>;
}
```
* range[link range.md]
* iter_const_reference_t[link /reference/iterator/iter_const_reference_t.md]
* iterator_t[link iterator_t.md]

## 概要

任意のRange型`R`から、そのRangeの要素への`const`参照型を取得する。

## 例

```cpp example
#include <ranges>
#include <vector>

int main() {
  static_assert(std::same_as<std::ranges::range_const_reference_t<std::vector<int>> , const int&>);
  static_assert(std::same_as<std::ranges::range_const_reference_t<std::vector<bool>>, bool>);
}
```
* std::ranges::range_const_reference_t[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]

## 参照

- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
