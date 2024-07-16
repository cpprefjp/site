# operator()
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* layout_transpose::mapping[meta class]
* cpp26[meta cpp]

```cpp
template<class Index0, class Index1>
constexpr index_type operator()(Index0 ind0, Index1 ind1) const;
```

## 概要
2次元インデクス値`ind0, ind1`に対応する要素位置を求める。


## 戻り値
`nested-mapping_(ind1, ind0)`


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
