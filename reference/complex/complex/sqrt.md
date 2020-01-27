# sqrt
* complex[meta header]
* std[meta namespace]
* function template[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  template <class T>
  complex<T> sqrt(const complex<T>& x);
}
```

## 概要
複素数値の平方根（square root）を得る。


## 戻り値
引数 `x` の平方根のうち、（複素平面の）右半平面の範囲の複素数値（つまり、実部は 0 以上）。もし、引数が負の実数の場合、戻り値は虚軸の�の範囲。

つまり、複素数の平方根にも実数と同様に±の2つがあるがこの関数は常に�の平方根を返す。また、負の実数の平方根は常に純虚数（$\sqrt{-x}i$）となる。

## 備考
- 分岐截�は負の実軸に沿っている。
- 規格には、上記の戻り値の記載、および、分岐截�以外の規定・説明は無い。  
	なお、C99 の規格にある本関数と�価の関数群（`complex.h` ヘッダの `csqrt`、`csqrtf`、`csqrtl` の 3 つ。それぞれ C++ の `sqrt<double>`、`sqrt<float>`、`sqrt<long double>` に相当）では、処理系が ISO IEC 60559（IEEE 754 と同一）に準拠している場合、以下のように規定されている。
	- `sqrt(`[`conj`](conj.md)`(x)) =` [`conj`](conj.md)`(sqrt(x))` 。
	- `sqrt(complex(±0, +0))` は `complex(+0, +0)` を返す。
	- （`NaN` も含む）あらゆる `x` に対して、`sqrt(complex(x, +∞))` は `complex(+∞, +∞)` を返す。
	- 有限の `x` に対して、`sqrt(complex(x, NaN))` は `complex(NaN, NaN)` を返し、無効演算の浮動小数点例外（`FE_INVALID`）を引き起こす可能性がある。
	- 有限で�の符号を持つ（`+0` を含む）`y` に対して、`sqrt(complex(-∞, y))` は `complex(+0, +∞)` を返す。
	- 有限で�の符号を持つ（`+0` を含む）`y` に対して、`sqrt(complex(+∞, y))` は `complex(+∞, +0)` を返す。
	- `sqrt(complex(-∞, NaN))` は `complex(NaN, ±∞)` を返す（結果の虚部の符号は未規定）。
	- `sqrt(complex(+∞, NaN))` は `complex(+∞, NaN)` を返す。
	- 有限の `y` に対して、`sqrt(complex(NaN, y))` は `complex(NaN, NaN)` を返し、無効演算の浮動小数点例外（`FE_INVALID`）を引き起こす可能性がある。
	- `sqrt(complex(NaN, NaN))` は `complex(NaN, NaN)` を返す。
- 処理系が ISO IEC 60559 に準拠しているかどうかは、C99 の場合はマク� `__STDC_IEC_559_COMPLEX__` が `1` に定義されている事で判別可能であるが、C++ の規格書には該当する記載を見つける事ができなかった。
- 平方根の算出については、一部の算術型、および、[`valarray`](/reference/valarray.md) クラステンプレートに対しても、他のヘッダで定義されている。

	| 引数の型                                  | 関数                                           | ヘッダ                               | 備考       |
	|-------------------------------------------|------------------------------------------------|--------------------------------------|------------|
	| `float`                                   | [`sqrt`](/reference/cmath/sqrt.md)             | [`cmath`](/reference/cmath.md)       |            |
	| `double`                                  | [`sqrt`](/reference/cmath/sqrt.md)             | [`cmath`](/reference/cmath.md)       |            |
	| `long double`                             | [`sqrt`](/reference/cmath/sqrt.md)             | [`cmath`](/reference/cmath.md)       |            |
	| 任意の整数型                              | [`sqrt`](/reference/cmath/sqrt.md)             | [`cmath`](/reference/cmath.md)       | C++11 から |
	| [`valarray`](/reference/valarray.md)`<T>` | [`sqrt`](/reference/valarray/valarray/sqrt.md) | [`valarray`](/reference/valarray.md) |            |


## 例
```cpp example
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);

  std::complex<double> result = std::sqrt(c);
  std::cout << "sqrt( " << c << " ) = " << result << std::endl;
  
  std::cout << std::endl;
  
  std::cout << "sqrt( 1.0 + 0.0i) = " << std::sqrt(std::complex<double>{ 1.0,  0.0}) << std::endl;
  std::cout << "sqrt(-1.0 + 0.0i) = " << std::sqrt(std::complex<double>{-1.0,  0.0}) << std::endl;
  
  std::cout << "sqrt( 0.0 + 1.0i) = " << std::sqrt(std::complex<double>{ 0.0,  1.0}) << std::endl;
  std::cout << "sqrt( 0.0 - 1.0i) = " << std::sqrt(std::complex<double>{ 0.0, -1.0}) << std::endl;
  
  std::cout << "sqrt( 1.0 + 1.0i) = " << std::sqrt(std::complex<double>{ 1.0,  1.0}) << std::endl;
  std::cout << "sqrt( 1.0 - 1.0i) = " << std::sqrt(std::complex<double>{ 1.0, -1.0}) << std::endl;
  
  std::cout << "sqrt(-1.0 + 1.0i) = " << std::sqrt(std::complex<double>{-1.0,  1.0}) << std::endl;
  std::cout << "sqrt(-1.0 - 1.0i) = " << std::sqrt(std::complex<double>{-1.0, -1.0}) << std::endl;
}
```
* std::sqrt[color ff0000]

### 出力
```
sqrt( (1,2) ) = (1.27202,0.786151)

sqrt( 1.0 + 0.0i) = (1,0)
sqrt(-1.0 + 0.0i) = (0,1)
sqrt( 0.0 + 1.0i) = (0.707107,0.707107)
sqrt( 0.0 - 1.0i) = (0.707107,-0.707107)
sqrt( 1.0 + 1.0i) = (1.09868,0.45509)
sqrt( 1.0 - 1.0i) = (1.09868,-0.45509)
sqrt(-1.0 + 1.0i) = (0.45509,1.09868)
sqrt(-1.0 - 1.0i) = (0.45509,-1.09868)
```


## バージョン
### 言語
- C++98

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

### 備考
- libstdc++ では、通常 glibc の対応する関数を呼び出すため、上記の備考に記載した C99 の ISO IEC 60559 準拠要件を満たす。  
	しかし、glibc を使用していない libstdc++、および、libc++ は、当該要件を満たしていない（満たすつもりが無い？）ようである。


## 関連項目
| 名前                               | 説明                           |
|------------------------------------|--------------------------------|
| [`acos`](acos.md)                  | 複素数の逆余弦を求める。       |
| [`asin`](asin.md)                  | 複素数の逆�弦を求める。       |
| [`atan`](atan.md)                  | 複素数の逆�接を求める。       |
| [`acosh`](acosh.md)                | 複素数の双曲線逆余弦を求める。 |
| [`asinh`](asinh.md)                | 複素数の双曲線逆�弦を求める。 |
| [`atanh`](atanh.md)                | 複素数の双曲線逆�接を求める。 |
| [`cos`](cos.md)                    | 複素数の余弦を求める。         |
| [`cosh`](cosh.md)                  | 複素数の双曲線余弦を求める。   |
| [`exp`](exp.md)                    | 複素数の指数関数を求める。     |
| [`log`](log.md)                    | 複素数の自然対数を求める。     |
| [`log10`](log10.md)                | 複素数の常用対数を求める。     |
| [`pow`](pow.md)                    | 複素数の累乗を求める。         |
| [`sin`](sin.md)                    | 複素数の�弦を求める。         |
| [`sinh`](sinh.md)                  | 複素数の双曲線�弦を求める。   |
| [`tan`](tan.md)                    | 複素数の�接を求める。         |
| [`tanh`](tanh.md)                  | 複素数の双曲線�接を求める。   |
| [`sqrt`](/reference/cmath/sqrt.md) | 実数の平方根を求める。         |
