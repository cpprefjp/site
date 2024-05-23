# lower_triangle_t
* linalg[meta header]
* class[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  struct lower_triangle_t { explicit lower_triangle_t() = default; };

  inline constexpr lower_triangle_t lower_triangle{};
}
```

## 概要
`lower_triangle_t`は、行列が下三角行列であることを表すタグ型である。

`lower_triangle_t`型の定数`lower_triangle`が提供される。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`layout_blas_packed`](layout_blas_packed.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)

