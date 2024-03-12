# offset
* linalg[meta header]
* function[meta id-type]
* std::linalg[meta namespace]
* conjugated_accessor[meta class]
* cpp26[meta cpp]

```cpp
constexpr offset_policy::data_handle_type offset(data_handle_type p, size_t i) const;
```

## 概要
指定オフセット位置のハンドルを取得する。


## 戻り値
`nested-accessor_.offset(p, i)`


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
