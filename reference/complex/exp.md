#exp
```cpp
namespace std {
  template<class T>
  complex<T> exp(const complex<T>& x);
}
```

##概要
自然対数の底 e（ネイピア数）の複素数値による累乗を得る。exp は exponent（指数）、あるいは、exponential function（指数関数）の略。


##戻り値
自然対数の底 e（ネイピア数）の引数 `x` による累乗。


##備考
- 規格には、上記の戻り値に記載されている以上の規定・説明は無い。  
なお、C99 の規格にある本関数と同等の関数群（`complex.h` ヘッダの `cexp`、`cexpf`、`cexpl`の 3 つ。それぞれ C++ の `exp<double>`、`exp<float>`、`exp<long double>` に相当）では、
処理系が ISO IEC 60559（IEEE 754 と同一）に準拠している場合、以下のように規定されている。
	- `exp(`[`conj`](conj.md)`(x)) = `[`conj`](conj.md)`(exp(x))`。
	- `exp(complex(±0, +0))` は `complex(+1, +0)` を返す。
	- 有限の `x` に対して、`exp(complex(x, +∞))` は `complex(NaN, NaN)` を返し、無効演算の浮動小数点例外（`FE_INVALID`）を引き起こす。
	- 有限の `x` に対して、`exp(complex(x, NaN))` は `complex(NaN, NaN)` を返し、無効演算の浮動小数点例外（`FE_INVALID`）を引き起こす可能性がある。
	- `exp(complex(+∞, +0))` は `complex(+∞, +0)` を返す。
	- 有限の `y` に対して、`exp(complex(-∞, y))` は `+0 * complex(`[`cos`](/reference/cmath/cos.md)`(y), `[`sin`](/reference/cmath/sin.md)`(y))` を返す。
	- 有限で非零の `y` に対して、`exp(complex(+∞, y))` は `+∞ * complex(`[`cos`](/reference/cmath/cos.md)`(y), `[`sin`](/reference/cmath/sin.md)`(y))` を返す。
	- `exp(complex(-∞, +∞))` は `complex(±0, ±0)` を返す（結果の実部、および、虚部の符号は未規定）。
	- `exp(complex(+∞, +∞))` は `complex(±∞, NaN)` を返し（結果の実部の符号は未規定）、無効演算の浮動小数点例外（`FE_INVALID`）を引き起こす。
	- `exp(complex(-∞, NaN))` は `complex(±0, ±0)` を返す（結果の実部、および、虚部の符号は未規定）。
	- `exp(complex(+∞, NaN))` は `complex(±∞, NaN)` を返す（結果の実部の符号は未規定）。
	- `exp(complex(NaN, +0))` は `complex(NaN, +0)` を返す。
	- あらゆる非零の `y` に対して、`exp(complex(NaN, y))` は `complex(NaN, NaN)` を返し、無効演算の浮動小数点例外（`FE_INVALID`）を引き起こす可能性がある。
	- `exp(complex(NaN, NaN))` は `complex(NaN, NaN)` を返す。
- 処理系が ISO IEC 60559 に準拠しているかどうかは、C99 の場合はマクロ `__STDC_IEC_559_COMPLEX__` が `1` に定義されている事で判別可能であるが、
C++ の規格書には該当する記載を見つける事ができなかった。


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<float> c(1.0, 2.0);
  std::cout << "exp( " << c << " ) = " << std::exp(c) << std::endl;
}
```
* exp[color ff0000]
* iostream[link /reference/iostream.md]
* complex[link /reference/complex.md]

###出力
```
exp( (1,2) ) = (-1.1312,2.47173)
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
- [Wandbox](http://melpon.org/wandbox/) で確認した限りでは、GCC の C++11 モードは上記の備考に記載した C99 の ISO IEC 60559 準拠要件にある無効演算の浮動小数点例外も引き起こしたが、Clang は C++11 モードでも無効演算の浮動小数点例外を引き起こさないことがあるようである。
- GCC は `exp` の計算に通常 glibc の複素数ライブラリを使用する。このため、使用している glibc のバージョンが 2.19 より前の場合には `exp(complex(NaN, +0))` に対して `complex(NaN, NaN)` を返す。これは glibc のバグで 2.19 以降は直っている。


##参照
|                                    |                                           |
|------------------------------------|-------------------------------------------|
| [`acos`](acos.md)                  | 複素数の逆余弦を求める。                  |
| [`asin`](asin.md)                  | 複素数の逆正弦を求める。                  |
| [`atan`](atan.md)                  | 複素数の逆正接を求める。                  |
| [`acosh`](acosh.md)                | 複素数の双曲線逆余弦を求める。            |
| [`asinh`](asinh.md)                | 複素数の双曲線逆正弦を求める。            |
| [`atanh`](atanh.md)                | 複素数の双曲線逆正接を求める。            |
| [`cos`](cos.md)                    | 複素数の余弦を求める。                    |
| [`cosh`](cosh.md)                  | 複素数の双曲線余弦を求める。              |
| [`log`](log.md)                    | 複素数の自然対数を求める。                |
| [`log10`](log10.md)                | 複素数の常用対数を求める。                |
| [`pow`](pow.md)                    | 複素数の累乗を求める。                    |
| [`sin`](sin.md)                    | 複素数の正弦を求める。                    |
| [`sinh`](sinh.md)                  | 複素数の双曲線正弦を求める。              |
| [`sqrt`](sqrt.md)                  | 複素数の平方根を求める。                  |
| [`tan`](tan.md)                    | 複素数の正接を求める。                    |
| [`tanh`](tanh.md)                  | 複素数の双曲線正接を求める。              |
| [`exp`](/reference/cmath/exp.md)   | 自然対数の底 e の累乗（実数）を求める。   |
