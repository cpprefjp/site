#cosh
```cpp
namespace std {
  template <class T>
  complex<T> cosh(const complex<T>& x);
}
```

##概要
複素数値の双曲線余弦（ハイパボリックコサイン：hyperbolic cosine）を得る。


##戻り値
引数 `x` の双曲線余弦。


##備考
- 規格には、上記の戻り値に記載されている以上の規定・説明は無い。  
	なお、C99 の規格にある本関数と同等の関数群（`complex.h` ヘッダの `ccosh`、`ccoshf`、`ccoshl` の 3 つ。それぞれ C++ の `cosh<double>`、`cosh<float>`、`cosh<long double>` に相当）では、処理系が ISO IEC 60559（IEEE 754 と同一）に準拠している場合、以下のように規定されている。
	- `cosh(`[`conj`](conj.md)`(x)) = `[`conj`](conj.md)`(cosh(x))` で、また、`cosh` は偶関数（つまり、`cosh(-x) = cosh(x)`）。
	- `cosh(complex(+0, +0))` は `complex(+1, +0)` を返す。
	- `cosh(complex(+0, +∞))` は `complex(NaN, ±0)` を返し（結果の虚部の符号は未規定）、無効演算の浮動小数点例外（`FE_INVALID`）を引き起こす。
	- `cosh(complex(+0, NaN))` は `complex(NaN, ±0)` を返す（結果の虚部の符号は未規定）。
	- 有限で非ゼロの `x` に対して、`cosh(complex(x, +∞))` は `complex(NaN, NaN)` を返し、無効演算の浮動小数点例外（`FE_INVALID`）を引き起こす。
	- 有限で非ゼロの `x` に対して、`cosh(complex(x, NaN))` は `complex(NaN, NaN)` を返し、無効演算の浮動小数点例外（`FE_INVALID`）を引き起こす可能性がある。
	- `cosh(complex(+∞, +0))` は `complex(+∞, +0)` を返す。
	- 有限で非ゼロの `y` に対して、`cosh(complex(+∞, y))` は `+∞ * complex(`[`cos`](/reference/cmath/cos.md)`(y), `[`sin`](/reference/cmath/sin.md)`(y))` を返す。
	- `cosh(complex(+∞, +∞))` は `complex(±∞, NaN)` を返し（結果の実部の符号は未規定）、無効演算の浮動小数点例外（`FE_INVALID`）を引き起こす。
	- `cosh(complex(+∞, NaN))` は `complex(+∞, NaN)` を返す。
	- `cosh(complex(NaN, +0))` は `complex(NaN, ±0)` を返す（結果の虚部の符号は未規定）。
	- あらゆる非ゼロの `y` に対して、`cosh(complex(NaN, y))` は `complex(NaN, NaN)` を返し、無効演算の浮動小数点例外（`FE_INVALID`）を引き起こす可能性がある。
	- `cosh(complex(NaN, NaN))` は `complex(NaN, NaN)` を返す。
- 処理系が ISO IEC 60559 に準拠しているかどうかは、C99 の場合はマクロ `__STDC_IEC_559_COMPLEX__` が `1` に定義されている事で判別可能であるが、C++ の規格書には該当する記載を見つける事ができなかった。
- 双曲線余弦の算出については、一部の算術型、および、[`valarray`](/reference/valarray.md) クラステンプレートに対しても、他のヘッダで定義されている。

	| 引数の型                                  | 関数                                           | ヘッダ                               | 備考       |
	|-------------------------------------------|------------------------------------------------|--------------------------------------|------------|
	| `float`                                   | [`cosh`](/reference/cmath/cosh.md)             | [`cmath`](/reference/cmath.md)       |            |
	| `double`                                  | [`cosh`](/reference/cmath/cosh.md)             | [`cmath`](/reference/cmath.md)       |            |
	| `long double`                             | [`cosh`](/reference/cmath/cosh.md)             | [`cmath`](/reference/cmath.md)       |            |
	| 任意の整数型                              | [`cosh`](/reference/cmath/cosh.md)             | [`cmath`](/reference/cmath.md)       | C++11 から |
	| [`valarray`](/reference/valarray.md`<T>`) | [`cosh`](/reference/valarray/valarray/cosh.md) | [`valarray`](/reference/valarray.md) |            |


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);

  std::complex<double> result = std::cosh(c);
  std::cout << "cosh( " << c << " ) = " << result << std::endl;
}
```
* cosh[color ff0000]
* iostream[link /reference/iostream.md]
* complex[link /reference/complex.md]

###出力
```
cosh( (1,2) ) = (-0.642148,1.06861)
```


##バージョン
###言語
- C++98

###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

###備考
- libstdc++ では、通常 glibc の対応する関数を呼び出すため、上記の備考に記載した C99 の ISO IEC 60559 準拠要件を満たす。  
	しかし、glibc を使用していない libstdc++、および、libc++ は、当該要件を満たしていない（満たすつもりが無い？）ようである。


##参照
|                                    |                                           |
|------------------------------------|-------------------------------------------|
| [`acos`](acos.md)                  | 複素数の逆余弦を求める。                  |
| [`asin`](asin.md)                  | 複素数の逆正弦を求める。                  |
| [`atan`](atan.md)                  | 複素数の逆正接を求める。                  |
| [`acosh`](acosh.md)                | 複素数の逆双曲線余弦を求める。            |
| [`asinh`](asinh.md)                | 複素数の逆双曲線正弦を求める。            |
| [`atanh`](atanh.md)                | 複素数の逆双曲線正接を求める。            |
| [`cos`](cos.md)                    | 複素数の余弦を求める。                    |
| [`exp`](exp.md)                    | 自然対数の底 e の累乗（複素数）を求める。 |
| [`log`](log.md)                    | 複素数の自然対数を求める。                |
| [`log10`](log10.md)                | 複素数の常用対数を求める。                |
| [`pow`](pow.md)                    | 複素数の累乗を求める。                    |
| [`sin`](sin.md)                    | 複素数の正弦を求める。                    |
| [`sinh`](sinh.md)                  | 複素数の双曲線正弦を求める。              |
| [`sqrt`](sqrt.md)                  | 複素数の平方根を求める。                  |
| [`tan`](tan.md)                    | 複素数の正接を求める。                    |
| [`tanh`](tanh.md)                  | 複素数の双曲線正接を求める。              |
| [`cosh`](/reference/cmath/cosh.md) | 実数の双曲線余弦を求める。                |
