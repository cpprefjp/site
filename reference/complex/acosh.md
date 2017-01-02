#acosh
* complex[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  complex<T> acosh(const complex<T>& x);
}
```

##概要
複素数値の逆双曲線余弦（エリアハイパボリックコサイン：area hyperbolic cosine（備考参照））を得る。


##戻り値
引数 `x` の逆双曲線余弦。本関数の値域は、実軸方向は非負の全域で、虚軸方向は `[-`*i* `π, +`*i* `π]` の区間である（*i* は虚数単位）。


##備考
- 本関数は実軸の `1` 未満の領域を分岐截断とする。
- 本関数は、C99 の規格にある `cacosh`（より正確には `complex.h` ヘッダの `cacosh`、`cacoshf`、`cacoshl` の 3 つ。それぞれ C++ の `acosh<double>`、`acosh<float>`、`acosh<long double>` に相当）と同等である。  
	C99 では、処理系が ISO IEC 60559（IEEE 754 と同一）に準拠している場合、以下のように規定されている。
	- `acosh(`[`conj`](conj.md)`(x)) = ` [`conj`](conj.md)`(acosh(x))`
	- `acosh(complex(±0, +0))` は `complex(+0, π/2)` を返す。
	- 有限の `x` について、`acosh(complex(x, +∞))` は `complex(+∞, π/2)` を返す。
	- 有限の `x` について、`acosh(complex(x, NaN))` は `complex(NaN, NaN)` を返すとともに、無効演算の浮動小数点例外（`FE_INVALID`）を引き起こす可能性がある。
	- 有限で正の符号を持つ（`+0` を含む）`y` について、`acosh(complex(-∞, y))` は `complex(+∞, π)` を返す。
	- 有限で正の符号を持つ（`+0` を含む）`y` について、`acosh(complex(+∞, y))` は `complex(+∞, +0)` を返す。
	- `acosh(complex(-∞, +∞))` は `complex(+∞, 3π/4)` を返す。
	- `acosh(complex(+∞, +∞))` は `complex(+∞, π/4)` を返す。
	- `acosh(complex(±∞, NaN))` は `complex(+∞, NaN)` を返す。
	- 有限の `y` について、`acosh(complex(NaN, y))` は `complex(NaN, NaN)` を返すとともに、無効演算の浮動小数点例外（`FE_INVALID`）を引き起こす可能性がある。
	- `acosh(complex(NaN, +∞))` は `complex(+∞, NaN)` を返す。
	- `acosh(complex(NaN, NaN))` は `complex(NaN, NaN)` を返す。
- 処理系が ISO IEC 60559 に準拠しているかどうかは、C99 の場合はマクロ `__STDC_IEC_559_COMPLEX__` が `1` に定義されている事で判別可能であるが、C++ の規格書には該当する記載を見つける事ができなかった。
- 逆双曲線余弦の算出については、一部の算術型に対しても、他のヘッダで定義されている。  

	| 引数の型                                  | 関数                                             | ヘッダ                               | 備考       |
	|-------------------------------------------|--------------------------------------------------|--------------------------------------|------------|
	| `float`                                   | [`acosh`](/reference/cmath/acosh.md)             | [`cmath`](/reference/cmath.md)       | C++11 から |
	| `double`                                  | [`acosh`](/reference/cmath/acosh.md)             | [`cmath`](/reference/cmath.md)       | C++11 から |
	| `long double`                             | [`acosh`](/reference/cmath/acosh.md)             | [`cmath`](/reference/cmath.md)       | C++11 から |
	| 任意の整数型                              | [`acosh`](/reference/cmath/acosh.md)             | [`cmath`](/reference/cmath.md)       | C++11 から |

	なお、残念ながら [`valarray`](/reference/valarray.md) クラステンプレートには逆双曲線余弦の算出は定義されていない。
	逆双曲線関数は C++11 で追加された関数であるため、その際の追加漏れかもしれない。

- 規格書では arc hyperbolic cosine となっているが、逆双曲線関数で求めるのは「弧（arc）」ではなく「面積（area）」であるため、（広く誤用されてはいるものの）適切な表現ではない。（[逆双曲線関数 - Wikipedia](https://ja.wikipedia.org/wiki/逆双曲線関数)）


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);

  std::complex<double> result = std::acosh(c);
  std::cout << "acosh( " << c << " ) = " << result << std::endl;
}
```
* acosh[color ff0000]
* iostream[link /reference/iostream.md]
* complex[link /reference/complex.md]

###出力
```
acosh( (1,2) ) = (1.52857,1.14372)
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC C++11 mode](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

###備考
- libstdc++ では（規格通りに）C++11 以降のモードでなければ本関数は使用できないが、libc++ では C++98 モードでも使用することができる。（上記の [Clang](/implementation.md#clang) が C++11 モードになっていないのはそのため）
- libstdc++ では、通常 glibc の対応する関数を呼び出すため、上記の備考に記載した C99 の ISO IEC 60559 準拠要件を満たす。  
	しかし、glibc を使用していない libstdc++、および、libc++ は、当該要件を満たしていない（満たすつもりが無い？）ようである。


##参照
|                                      |                                           |
|--------------------------------------|-------------------------------------------|
| [`acos`](acos.md)                    | 複素数の逆余弦を求める。                  |
| [`asin`](asin.md)                    | 複素数の逆正弦を求める。                  |
| [`atan`](atan.md)                    | 複素数の逆正接を求める。                  |
| [`asinh`](asinh.md)                  | 複素数の逆双曲線正弦を求める。            |
| [`atanh`](atanh.md)                  | 複素数の逆双曲線正接を求める。            |
| [`cos`](cos.md)                      | 複素数の余弦を求める。                    |
| [`cosh`](cosh.md)                    | 複素数の双曲線余弦を求める。              |
| [`exp`](exp.md)                      | 自然対数の底 e の累乗（複素数）を求める。 |
| [`log`](log.md)                      | 複素数の自然対数を求める。                |
| [`log10`](log10.md)                  | 複素数の常用対数を求める。                |
| [`pow`](pow.md)                      | 複素数の累乗を求める。                    |
| [`sin`](sin.md)                      | 複素数の正弦を求める。                    |
| [`sinh`](sinh.md)                    | 複素数の双曲線正弦を求める。              |
| [`sqrt`](sqrt.md)                    | 複素数の平方根を求める。                  |
| [`tan`](tan.md)                      | 複素数の正接を求める。                    |
| [`tanh`](tanh.md)                    | 複素数の双曲線正接を求める。              |
| [`acosh`](/reference/cmath/acosh.md) | 実数の逆双曲線余弦を求める。              |
