# stride
* linalg[meta header]
* function[meta id-type]
* std::linalg[meta namespace]
* layout_transpose::mapping[meta class]
* cpp26[meta cpp]

```cpp
constexpr index_type stride(size_t r) const;
```

## 概要
`i`番目次元のストライド幅を取得する。


## 事前条件
`is_strided() == true`かつ`r < 2`


## 戻り値
`nested-mapping_.stride(r == 0 ? 1 : 0)`


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
