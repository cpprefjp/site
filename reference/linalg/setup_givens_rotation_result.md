# setup_givens_rotation_result
* linalg[meta header]
* class template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<class Real>
  struct setup_givens_rotation_result {
    Real c;
    Real s;
    Real r;
  };

  template<class Real>
  struct setup_givens_rotation_result<complex<Real>> {
    Real c;
    complex<Real> s;
    complex<Real> r;
  };
}
```
* complex[link /reference/complex/complex.md]


## 概要
ギブンス回転の結果を表すクラス。詳しくは、[`setup_givens_rotation`](setup_givens_rotation.md)にて。


## 適格要件
- `Real`は[`complex`](/reference/complex/complex.md)`<Real>`が規定できる型であること。


## 例
[`setup_givens_rotation`](setup_givens_rotation.md)に記載。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`setup_givens_rotation`](setup_givens_rotation.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
- [Numerics library](https://eel.is/c++draft/complex.numbers)
