# implicit_unit_diagonal_t
* linalg[meta header]
* class[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  struct implicit_unit_diagonal_t { explicit implicit_unit_diagonal_t() = default; };

  inline constexpr implicit_unit_diagonal_t implicit_unit_diagonal{};
}
```

## 概要
`implicit_unit_diagonal_t`は、行列の全ての対角成分を暗黙に乗法における単位元とみなすことを表すタグ型である。このタグが渡されると、行列の対角成分が必要になった時、その成分にアクセスせず、乗法における単位元であるとして計算する。

`implicit_unit_diagonal_t`型の定数`implicit_unit_diagonal`が提供される。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
