# iter_common_reference_t
* iterator[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<indirectly_readable I>
  using iter_common_reference_t = common_reference_t<iter_reference_t<I>, iter_value_t<I>&>;
}
```
* indirectly_readable[link /reference/iterator/indirectly_readable.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]

## 概要

任意のイテレータ型`I`から、そのイテレータの参照型（`reference`）と要素型（`value_type`）の間の共通の参照型（[`common_reference`](/reference/type_traits/common_reference.md)）を取得する。

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <vector>

int main() {
  using vec_iterator = std::vector<int>::iterator;
  using pointer = double*;

  static_assert(std::same_as<std::iter_common_reference_t<vec_iterator>, int&>);
  static_assert(std::same_as<std::iter_common_reference_t<pointer>     , double&>);
}
```
* std::iter_common_reference_t[color ff0000]

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
- [`common_reference`](/reference/type_traits/common_reference.md)

## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
