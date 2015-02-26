#tanh
* complex[meta header]
* std[meta namespace]
* complex[meta class]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  complex<T> tanh(const complex<T>& x);
}
```

##概要
複素数値の双曲線正接（ハイパボリックタンジェント：hyperbolic tangent）を得る。


##戻り値
引数 `x` の双曲線正接。


##備考
- 規格には、上記の戻り値に記載されている以上の規定・説明は無い。  
	なお、C99 の規格にある本関数と同等の関数群（`complex.h` ヘッダの `ctan`、`ctanf`、`ctanl` の 3 つ。それぞれ C++ の `tan<double>`、`tan<float>`、`tan<long double>` に相当）では、処理系が ISO IEC 60559（IEEE 754 と同一）に準拠している場合、以下のように規定されている。
	- `tanh(`[`conj`](conj.md)`(x)) = `[`conj`](conj.md)`(tanh(x))` で、また、`tanh` は奇関数（つまり、`tanh(-x) = -tanh(x)`）。
	- `tanh(complex(+0, +0))` は `complex(+0, +0)` を返す。
	- 有限の `x` に対して、`tanh(complex(x, +∞))` は `complex(NaN, NaN)` を返し、無効演算の浮動小数点例外（`FE_INVALID`）を引き起こす。
	- 有限の `x` に対して、`tanh(complex(x, NaN))` は `complex(NaN, NaN)` を返し、無効演算の浮動小数点例外（`FE_INVALID`）を引き起こす可能性がある。
	- 有限で正の符号を持つ（`+0` を含む）`y` に対して、`tanh(complex(+∞, y))` は `complex(1, +0 * `[`sin`](/reference/cmath/sin.md)`(2 * y))` を返す。
	- `tanh(complex(+∞, +∞))` は `complex(1, ±0)` を返す（結果の虚部の符号は未規定）。
	- `tanh(complex(+∞, NaN))` は `complex(1, ±0)` を返す（結果の虚部の符号は未規定）。
	- `tanh(complex(NaN, +0))` は `complex(NaN, +0)` を返す。
	- あらゆる非ゼロの `y` に対して、`tanh(complex(NaN, y))` は `complex(NaN, NaN)` を返し、無効演算の浮動小数点例外（`FE_INVALID`）を引き起こす可能性がある。
	- `tanh(complex(NaN, NaN))` は `complex(NaN, NaN)` を返す。
- 処理系が ISO IEC 60559 に準拠しているかどうかは、C99 の場合はマクロ `__STDC_IEC_559_COMPLEX__` が `1` に定義されている事で判別可能であるが、C++ の規格書には該当する記載を見つける事ができなかった。
- 双曲線正接の算出については、一部の算術型、および、[`valarray`](/reference/valarray.md) クラステンプレートに対しても、他のヘッダで定義されている。

	| 引数の型                                  | 関数                                           | ヘッダ                               | 備考       |
	|-------------------------------------------|------------------------------------------------|--------------------------------------|------------|
	| `float`                                   | [`tanh`](/reference/cmath/tanh.md)             | [`cmath`](/reference/cmath.md)       |            |
	| `double`                                  | [`tanh`](/reference/cmath/tanh.md)             | [`cmath`](/reference/cmath.md)       |            |
	| `long double`                             | [`tanh`](/reference/cmath/tanh.md)             | [`cmath`](/reference/cmath.md)       |            |
	| 任意の整数型                              | [`tanh`](/reference/cmath/tanh.md)             | [`cmath`](/reference/cmath.md)       | C++11 から |
	| [`valarray<T>`](/reference/valarray.md) | [`tanh`](/reference/valarray/valarray/tanh.md) | [`valarray`](/reference/valarray.md) |            |


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);

  std::complex<double> result = std::atanh(c);
  std::cout << "tanh( " << c << " ) = " << result << std::endl;
}
```
* tanh[color ff0000]
* iostream[link /reference/iostream.md]
* complex[link /reference/complex.md]

###出力
```
tanh( (1,2) ) = (1.16674,-0.243458)
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
- libstdc++ では、通常 glibc の対応する関数を呼び出すため、上記の備考に記載した C99 の ISO IEC 60559 準拠要件を満たす（ただし、次項参照）。  
	しかし、glibc を使用していない libstdc++、および、libc++ は、当該要件を満たしていない（満たすつもりが無い？）ようである。
- glibc 2.19 時点では、有限で正の符号を持つ `y` に対する `tanh(complex(+∞, y))` の虚部の符号が上記の備考に記載した C99 の ISO IEC 60559 準拠要件を満たしていない。


##参照
|                                    |                                |
|------------------------------------|--------------------------------|
| [`acos`](acos.md)                  | 複素数の逆余弦を求める。       |
| [`asin`](asin.md)                  | 複素数の逆正弦を求める。       |
| [`atan`](atan.md)                  | 複素数の逆正接を求める。       |
| [`acosh`](acosh.md)                | 複素数の双曲線逆余弦を求める。 |
| [`asinh`](asinh.md)                | 複素数の双曲線逆正弦を求める。 |
| [`atanh`](atanh.md)                | 複素数の双曲線逆正接を求める。 |
| [`cos`](cos.md)                    | 複素数の余弦を求める。         |
| [`cosh`](cosh.md)                  | 複素数の双曲線余弦を求める。   |
| [`exp`](exp.md)                    | 複素数の指数関数を求める。     |
| [`log`](log.md)                    | 複素数の自然対数を求める。     |
| [`log10`](log10.md)                | 複素数の常用対数を求める。     |
| [`pow`](pow.md)                    | 複素数の累乗を求める。         |
| [`sin`](sin.md)                    | 複素数の正弦を求める。         |
| [`sinh`](sinh.md)                  | 複素数の双曲線正弦を求める。   |
| [`sqrt`](sqrt.md)                  | 複素数の平方根を求める。       |
| [`tan`](tan.md)                    | 複素数の正接を求める。         |
| [`tanh`](/reference/cmath/tanh.md) | 実数の双曲線正接を求める。     |
