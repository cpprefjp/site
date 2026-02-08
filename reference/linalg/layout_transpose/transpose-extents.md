# transpose-extents
* [meta exposition-only]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
template<class IndexType, size_t InputExtent0, size_t InputExtent1>
constexpr extents<IndexType, InputExtent1, InputExtent0>
  transpose-extents(const extents<IndexType, InputExtent0, InputExtent1>& in);

template<class InputExtents>
using transpose-extents-t =
  decltype(transpose-extents(declval<InputExtents>()));
```
* extents[link /reference/mdspan/extents.md]

## 概要
行列転置操作の動作説明に用いる説明専用の関数テンプレート


## 戻り値
[`extents`](/reference/mdspan/extents.md)`<IndexType, InputExtent1, InputExtent0>(in.extent(1), in.extent(0))`


## バージョン
### 言語
- C++26


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
