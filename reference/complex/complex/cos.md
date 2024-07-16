# cos
* complex[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  complex<T>
    cos(const complex<T>& x); // (1) C++03
  template <class T>
  constexpr complex<T>
    cos(const complex<T>& x); // (1) C++26
}
```

## 概要
複素数値の余弦（コサイン：cosine）を得る。


## 戻り値
引数 `x` の余弦。


## 備考
- 規格には、上記の戻り値に記載されている以上の規定・説明は無い。  
	なお、C99 の規格にある本関数と等価の関数群（`complex.h` ヘッダの `ccos`、`ccosf`、`ccosl` の 3 つ。それぞれ C++ の `cos<double>`、`cos<float>`、`cos<long double>` に相当）では、処理系が ISO IEC 60559（IEEE 754 と同一）に準拠している場合、`cos(x) = ` [`cosh`](cosh.md)`(`*i* `x)` であると規定されている（*i* は虚数単位）。
- 処理系が ISO IEC 60559 に準拠しているかどうかは、C99 の場合はマクロ `__STDC_IEC_559_COMPLEX__` が `1` に定義されている事で判別可能であるが、C++ の規格書には該当する記載を見つける事ができなかった。
- 余弦の算出については、一部の算術型、および、[`valarray`](/reference/valarray.md) クラステンプレートに対しても、他のヘッダで定義されている。

	| 引数の型                                  | 関数                                         | ヘッダ                               | 備考       |
	|-------------------------------------------|----------------------------------------------|--------------------------------------|------------|
	| `float`                                   | [`cos`](/reference/cmath/cos.md)             | [`cmath`](/reference/cmath.md)       |            |
	| `double`                                  | [`cos`](/reference/cmath/cos.md)             | [`cmath`](/reference/cmath.md)       |            |
	| `long double`                             | [`cos`](/reference/cmath/cos.md)             | [`cmath`](/reference/cmath.md)       |            |
	| 任意の整数型                              | [`cos`](/reference/cmath/cos.md)             | [`cmath`](/reference/cmath.md)       | C++11 から |
	| [`valarray`](/reference/valarray.md)`<T>` | [`cos`](/reference/valarray/valarray/cos.md) | [`valarray`](/reference/valarray.md) |            |


## 例
```cpp example
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);

  std::complex<double> result = std::cos(c);
  std::cout << "cos( " << c << " ) = " << result << std::endl;
}
```
* std::cos[color ff0000]

### 出力
```
cos( (1,2) ) = (2.03272,-3.0519)
```


## バージョン
### 言語
- C++98

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified], 4.4.7 [mark verified], 4.5.4 [mark verified], 4.6.4 [mark verified], 4.7.3 [mark verified], 4.8.1 [mark verified], 4.8.2 [mark verified], 4.9.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
| 名前                               | 説明                                      |
|------------------------------------|-------------------------------------------|
| [`acos`](acos.md)                  | 複素数の逆余弦を求める。                  |
| [`asin`](asin.md)                  | 複素数の逆正弦を求める。                  |
| [`atan`](atan.md)                  | 複素数の逆正接を求める。                  |
| [`acosh`](acosh.md)                | 複素数の逆双曲線余弦を求める。            |
| [`asinh`](asinh.md)                | 複素数の逆双曲線正弦を求める。            |
| [`atanh`](atanh.md)                | 複素数の逆双曲線正接を求める。            |
| [`cosh`](cosh.md)                  | 複素数の双曲線余弦を求める。              |
| [`exp`](exp.md)                    | 自然対数の底 e の累乗（複素数）を求める。 |
| [`log`](log.md)                    | 複素数の自然対数を求める。                |
| [`log10`](log10.md)                | 複素数の常用対数を求める。                |
| [`pow`](pow.md)                    | 複素数の累乗を求める。                    |
| [`sin`](sin.md)                    | 複素数の正弦を求める。                    |
| [`sinh`](sinh.md)                  | 複素数の双曲線正弦を求める。              |
| [`sqrt`](sqrt.md)                  | 複素数の平方根を求める。                  |
| [`tan`](tan.md)                    | 複素数の正接を求める。                    |
| [`tanh`](tanh.md)                  | 複素数の双曲線正接を求める。              |
| [`cos`](/reference/cmath/cos.md)   | 実数の余弦を求める。                      |


## 参照
- [P1383R2 More constexpr for `<cmath>` and `<complex>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1383r2.pdf)
    - C++26で`constexpr`対応した
