# iter_reference_t
* iterator[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<dereferenceable I>
  using iter_reference_t = decltype(*declval<I&>());
}
```
* dereferenceable[link /reference/iterator/dereferenceable.md]
* declval[link /reference/utility/declval.md]

## 概要

任意のイテレータ型`I`から、そのイテレータの要素への参照型（`reference`）を取得する。

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <vector>

int main() {
  using vec_iterator = std::vector<int>::iterator;
  using pointer = double*;

  static_assert(std::same_as<std::iter_reference_t<vec_iterator>, int&>);
  static_assert(std::same_as<std::iter_reference_t<pointer>     , double&>);
}
```
* std::iter_reference_t[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 6 [mark verified]

## 関連項目

- [`iterator_traits`](iterator_traits.md)

## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)