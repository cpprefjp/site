# sum_of_squares_result

* linalg[meta header]
* class template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<class Scalar>
  struct sum_of_squares_result {
    Scalar scaling_factor;
    Scalar scaled_sum_of_squares;
  };
}
```

## 概要
スケールされた、ベクトルの成分の2乗和の結果を表すクラス。詳しくは、[`vector_sum_of_squares`](vector_sum_of_squares.md)にて。


## 例


### 出力


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`vector_sum_of_squares`](vector_sum_of_squares.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
- [`LAPACK: classq`](https://netlib.org/lapack/explore-html/d8/d76/group__lassq_gab70baa330cb7a13111b72aef0734e26d.html#gab70baa330cb7a13111b72aef0734e26d)
