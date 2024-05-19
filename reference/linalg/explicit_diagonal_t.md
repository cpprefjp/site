# explicit_diagonal_t
* linalg[meta header]
* class[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  struct explicit_diagonal_t { explicit explicit_diagonal_t() = default; };

  inline constexpr explicit_diagonal_t explicit_diagonal{};
}
```

## 概要
`explicit_diagonal_t`は行列の対角成分が必要になった時、その成分にアクセスすることを表すタグ型である。

`explicit_diagonal_t`型の定数`explicit_diagonal`が提供される。


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

