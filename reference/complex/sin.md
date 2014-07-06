#sin
```cpp
namespace std {
  template <class T>
  complex<T> sin(const complex<T>& x);
}
```

##概要
複素数値の正弦（サイン：sine）を得る。


##戻り値
引数 `x` の正弦。


##備考
- 規格には、上記の戻り値に記載されている以上の規定・説明は無い。  
	なお、C99 の規格にある本関数と同等の関数群（`complex.h` ヘッダの `csin`、`csinf`、`csinl` の 3 つ。それぞれ C++ の `sin<double>`、`sin<float>`、`sin<long double>` に相当）では、処理系が ISO IEC 60559（IEEE 754 と同一）に準拠している場合、`sin(x) = -`*i* [`sinh`](sinh.md)`(`*i* `x)` であると規定されている（*i* は虚数単位）。
- 処理系が ISO IEC 60559 に準拠しているかどうかは、C99 の場合はマクロ `__STDC_IEC_559_COMPLEX__` が `1` に定義されている事で判別可能であるが、C++ の規格書には該当する記載を見つける事ができなかった。
- 正弦の算出については、一部の算術型、および、[`valarray`](/reference/valarray.md) クラステンプレートに対しても、他のヘッダで定義されている。

	| 引数の型                                  | 関数                                         | ヘッダ                               | 備考       |
	|-------------------------------------------|----------------------------------------------|--------------------------------------|------------|
	| `float`                                   | [`sin`](/reference/cmath/sin.md)             | [`cmath`](/reference/cmath.md)       |            |
	| `double`                                  | [`sin`](/reference/cmath/sin.md)             | [`cmath`](/reference/cmath.md)       |            |
	| `long double`                             | [`sin`](/reference/cmath/sin.md)             | [`cmath`](/reference/cmath.md)       |            |
	| 任意の整数型                              | [`sin`](/reference/cmath/sin.md)             | [`cmath`](/reference/cmath.md)       | C++11 から |
	| [`valarray`](/reference/valarray.md)`<T>` | [`sin`](/reference/valarray/valarray/sin.md) | [`valarray`](/reference/valarray.md) |            |


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);

  std::complex<double> result = std::sin(c);
  std::cout << "sin( " << c << " ) = " << result << std::endl;
}
```
* sin[color ff0000]
* iostream[link /reference/iostream.md]
* complex[link /reference/complex.md]

###出力
```
sin( (1,2) ) = (3.16578,1.9596)
```


##バージョン
###言語
- C++98

###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


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
| [`cosh`](cosh.md)                  | 複素数の双曲線余弦を求める。              |
| [`exp`](exp.md)                    | 自然対数の底 e の累乗（複素数）を求める。 |
| [`log`](log.md)                    | 複素数の自然対数を求める。                |
| [`log10`](log10.md)                | 複素数の常用対数を求める。                |
| [`pow`](pow.md)                    | 複素数の累乗を求める。                    |
| [`sinh`](sinh.md)                  | 複素数の双曲線正弦を求める。              |
| [`sqrt`](sqrt.md)                  | 複素数の平方根を求める。                  |
| [`tan`](tan.md)                    | 複素数の正接を求める。                    |
| [`tanh`](tanh.md)                  | 複素数の双曲線正接を求める。              |
| [`sin`](/reference/cmath/sin.md)   | 実数の正弦を求める。                      |
