#acos (C++11)
* complex[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class T>
  complex<T> acos(const complex<T>& x);
}
```

##概要
複素数値の逆余弦（アークコサイン：arc cosine）を得る。


##戻り値
引数 `x` の逆余弦。本関数の値域は、虚軸方向は全域で、実軸方向は `[0, π]` の区間である。


##備考
- 本関数は実軸の区間 `[-1, +1]` の外側を分岐截断とする。
- 本関数は、C99 の規格にある `cacos`（より正確には `complex.h` ヘッダの `cacos`、`cacosf`、`cacosl` の 3 つ。それぞれ C++ の `acos<double>`、`acos<float>`、`acos<long double>` に相当）と同等である。  
	C99 では、処理系が ISO IEC 60559（IEEE 754 と同一）に準拠している場合、以下のように規定されている。
	- `acos(`[`conj`](conj.md)`(x)) = ` [`conj`](conj.md)`(acos(x))`
	- `acos(complex(±0, +0))` は `complex(π/2, -0)` を返す。
	- `acos(complex(±0, NaN))` は `complex(π/2, NaN)` を返す。
	- 有限の `x` について、`acos(complex(x, +∞))` は `complex(π/2, -∞)` を返す。
	- 有限で非ゼロの `x` について、`acos(x, NaN)` は `complex(NaN, NaN)` を返すとともに、無効演算の浮動小数点例外（`FE_INVALID`）を引き起こす可能性がある。
	- 有限で正の符号を持つ（`+0` を含む）`y` について、`acos(-∞, y)` は `complex(π, -∞)` を返す。
	- 有限で正の符号を持つ（`+0` を含む）`y` について、`acos(+∞, y)` は `complex(+0, -∞)` を返す。
	- `acos(-∞, +∞)` は `complex(3π/4, -∞)` を返す。
	- `acos(+∞, +∞)` は `complex(π/4, -∞)` を返す。
	- `acos(±∞, NaN)` は `complex(NaN, ±∞)` を返す（結果の虚部の符号は未規定）。
	- 有限の `y` について、`acos(NaN, y)` は `complex(NaN, NaN)` を返すとともに、無効演算の浮動小数点例外（`FE_INVALID`）を引き起こす可能性がある。
	- `acos(NaN, +∞)` は `complex(NaN, -∞)` を返す。
	- `acos(NaN, NaN)` は `complex(NaN, NaN)` を返す。
- 処理系が ISO IEC 60559 に準拠しているかどうかは、C99 の場合はマクロ `__STDC_IEC_559_COMPLEX__` が `1` に定義されている事で判別可能であるが、C++ の規格書には該当する記載を見つける事ができなかった。
- 逆余弦の算出については、一部の算術型、および、[`valarray`](/reference/valarray.md) クラステンプレートに対しても、他のヘッダで定義されている。  

	| 引数の型                                  | 関数                                           | ヘッダ                               | 備考       |
	|-------------------------------------------|------------------------------------------------|--------------------------------------|------------|
	| `float`                                   | [`acos`](/reference/cmath/acos.md)             | [`cmath`](/reference/cmath.md)       |            |
	| `double`                                  | [`acos`](/reference/cmath/acos.md)             | [`cmath`](/reference/cmath.md)       |            |
	| `long double`                             | [`acos`](/reference/cmath/acos.md)             | [`cmath`](/reference/cmath.md)       |            |
	| 任意の整数型                              | [`acos`](/reference/cmath/acos.md)             | [`cmath`](/reference/cmath.md)       | C++11 から |
	| [`valarray`](/reference/valarray.md)`<T>` | [`acos`](/reference/valarray/valarray/acos.md) | [`valarray`](/reference/valarray.md) |            |


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);

  std::complex<double> result = std::acos(c);
  std::cout << "acos( " << c << " ) = " << result << std::endl;
}
```
* acos[color ff0000]
* iostream[link /reference/iostream.md]
* complex[link /reference/complex.md]

###出力
```
acos( (1,2) ) = (1.14372,-1.52857)
```


##実装例
```cpp
-2.0i * log(sqrt((1.0 + c) / 2.0) + 1.0i * sqrt((1.0 - c) / 2.0));
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
|                                    |                                           |
|------------------------------------|-------------------------------------------|
| [`asin`](asin.md)                  | 複素数の逆正弦を求める。                  |
| [`atan`](atan.md)                  | 複素数の逆正接を求める。                  |
| [`acosh`](acosh.md)                | 複素数の逆双曲線余弦を求める。            |
| [`asinh`](asinh.md)                | 複素数の逆双曲線正弦を求める。            |
| [`atanh`](atanh.md)                | 複素数の逆双曲線正接を求める。            |
| [`cos`](cos.md)                    | 複素数の余弦を求める。                    |
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
| [`acos`](/reference/cmath/acos.md) | 実数の逆余弦を求める。                    |
