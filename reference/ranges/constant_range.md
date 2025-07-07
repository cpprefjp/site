# constant_range
* ranges[meta header]
* concept[meta id-type]
* std::ranges[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<class T>
  concept constant_range = input_range<T> && constant-iterator<iterator_t<T>>;
}
```
* constant-iterator[link /reference/iterator/constant-iterator.md]

## 概要

`constant_range`は、その要素が変更不可能な`range`を表すコンセプトである。

## 例

```cpp example
#include <ranges>
#include <vector>

int main() {
  static_assert(not std::ranges::constant_range<      std::vector<int>>);
  static_assert(    std::ranges::constant_range<const std::vector<int>>);

  static_assert(std::ranges::constant_range<std::ranges::iota_view<int>>);
}
```

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
