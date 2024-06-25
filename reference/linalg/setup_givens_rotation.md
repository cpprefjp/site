# setup_givens_rotation

* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<class Real>
  setup_givens_rotation_result<Real> setup_givens_rotation(Real a, Real b) noexcept; // (1)

  template<class Real>
  setup_givens_rotation_result<complex<Real>> setup_givens_rotation(complex<Real> a, complex<Real> b) noexcept; // (2)
}
```


## 概要
ギブンス回転を計算する。すなわち、以下の式が成り立つような、`Real`型の値`c`と `s`, `r`を計算する。

$$
\begin{split}
\begin{pmatrix}
c             & s \\
-\overline{s} & c
\end{pmatrix}
\begin{pmatrix}
a \\
b
\end{pmatrix}
&=
\begin{pmatrix}
r \\
0
\end{pmatrix},\\
c^2 + |s|^2 &= 1
\end{split}
$$

ただし、`s`と`r`の型は`a`と`b`の型による。

- (1) `a`と`b`の型が`Real`の場合、`s`と`r`の型も`Real`。`r`は$(a, b)^T$のユークリッドノルム、つまり$\sqrt{|a|^2 + |b|^2}$である。
- (2) `a`と`b`の型が`complex<Real>`の場合、`s`と`r`の型も`complex<Real>`。以下で定義される$sgn$関数を用いると、`r`は$sgn(a) * \sqrt{|a|^2 + |b|^2}$である。
$$
sgn(x):=
    \begin{cases}
        \frac{x}{|x|}   &   \text{($x \neq 0$)}  \\
        1        &   \text{($x = 0$)}
    \end{cases}
$$


## テンプレートパラメータ制約
- `Real`は`complex<Real>`が規定できる型であること。


## 戻り値
`c`と`s`が入力$(a, b)^T$に対するギブンス回転行列の成分で、`r`を入力$(a, b)^T$のユークリッドノルムとすると、戻り値は`{c, s, r}`である。


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
- [`setup_givens_rotation_result`](setup_givens_rotation_result.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
- [Working Draft Programming Languages — C++: 28 Numerics libarary](https://eel.is/c++draft/complex.numbers)
- [LAPACK: clartg](https://netlib.org/lapack/explore-html/da/dd3/group__lartg_ga45afd4405cf6da478ce4de9576303369.html#ga45afd4405cf6da478ce4de9576303369)
