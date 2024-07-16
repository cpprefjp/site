# column_major_t
* linalg[meta header]
* class[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  struct column_major_t { explicit column_major_t() = default; };

  inline constexpr column_major_t column_major{};
}
```

## 概要
`column_major_t`は、[`layout_blas_packed`](layout_blas_packed.md)を指定した多次元配列ビュー[`mdspan`](/reference/mdspan/mdspan.md)において、要素の格納順が列優先(column-major)であることを指示するためのタグ型である。

`column_major_t`型の定数`column_major`が提供される。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`mdspan`](/reference/mdspan/mdspan.md)
- [`layout_blas_packed`](layout_blas_packed.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
