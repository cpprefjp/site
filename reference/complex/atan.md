#atan (C++11)
* complex[meta header]
* std[meta namespace]
* complex[meta class]

```cpp
namespace std {
  template <class T>
  complex<T> atan(const complex<T>& x);
}
```

##概要
複素数値の逆正接（アークタンジェント：arc tangent）を得る。


##戻り値
引数 `x` の逆正接。本関数の値域は、虚軸方向は全域で、実軸方向は `[-π/2, +π/2]` の区間である。


##備考
- 本関数は虚軸の区間 `[-`*i*`, +`*i*`]` の外側を分岐截断とする（*i* は虚数単位）。
- 本関数は、C99 の規格にある `catan`（より正確には `complex.h` ヘッダの `catan`、`catanf`、`catanl` の 3 つ。それぞれ C++ の `atan<double>`、`atan<float>`、`atan<long double>` に相当）と同等である。  
	C99 では、処理系が ISO IEC 60559（IEEE 754 と同一）に準拠している場合、`catan(x) = -`*i* `catanh(`*i* `x)` と規定されている（*i* は虚数単位）。
- 処理系が ISO IEC 60559 に準拠しているかどうかは、C99 の場合はマクロ `__STDC_IEC_559_COMPLEX__` が `1` に定義されている事で判別可能であるが、C++ の規格書には該当する記載を見つける事ができなかった。
- 逆正接の算出については、一部の算術型、および、[`valarray`](/reference/valarray.md) クラステンプレートに対しても、他のヘッダで定義されている。

	| 引数の型                                  | 関数                                           | ヘッダ                               | 備考       |
	|-------------------------------------------|------------------------------------------------|--------------------------------------|------------|
	| `float`                                   | [`atan`](/reference/cmath/atan.md)             | [`cmath`](/reference/cmath.md)       |            |
	| `double`                                  | [`atan`](/reference/cmath/atan.md)             | [`cmath`](/reference/cmath.md)       |            |
	| `long double`                             | [`atan`](/reference/cmath/atan.md)             | [`cmath`](/reference/cmath.md)       |            |
	| 任意の整数型                              | [`atan`](/reference/cmath/atan.md)             | [`cmath`](/reference/cmath.md)       | C++11 から |
	| [`valarray<T>`](/reference/valarray.md) | [`atan`](/reference/valarray/valarray/atan.md) | [`valarray`](/reference/valarray.md) |            |


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);

  std::complex<double> result = std::atan(c);
  std::cout << "atan( " << c << " ) = " << result << std::endl;
}
```
* atan[color ff0000]
* iostream[link /reference/iostream.md]
* complex[link /reference/complex.md]

###出力
```
atan( (1,2) ) = (1.33897,0.402359)
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


##参照
|                                    |                                           |
|------------------------------------|-------------------------------------------|
| [`acos`](acos.md)                  | 複素数の逆余弦を求める。                  |
| [`asin`](asin.md)                  | 複素数の逆正弦を求める。                  |
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
| [`atan`](/reference/cmath/atan.md) | 実数の逆正接を求める。                    |
