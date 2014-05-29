#atan (C++11)
```cpp
namespace std {
  template <class T>
  complex<T> atan(const complex<T>& x);
}
```

##概要
複素数`x`の逆正接（アークタンジェント、arc tangent）を求める。


##戻り値
複素数の逆正接を計算して返す。


##備考
- 規格には、本関数に関する具体的な規定・説明は無い。  
なお、C99 の規格にある本関数と同等の関数群（`complex.h` ヘッダの `catan`、`catanf`、`catanl`の 3 つ。それぞれ C++ の `atan<double>`、`atan<float>`、`atan<long double>` に相当）では、以下の規定がある：
	- 本関数は実軸の区間`[-i, +i]`の外側を分岐截断とすること、および戻り値は虚軸を無限の区間、実軸を`[-π/2, +π/2]`の区間とすること。
	- `atan(x) = complex(0, -1) * atanh(x)`
- 逆正弦の算出については、一部の算術型、および、[`valarray`](/reference/valarray.md) クラステンプレートに対しても、他のヘッダで定義されている。

	| 引数の型                                | 関数                                     | ヘッダ                               | 備考       |
	|-----------------------------------------|------------------------------------------|--------------------------------------|------------|
	| `float`                                 | [`atan`](/reference/cmath/atan.md)       | [`cmath`](/reference/cmath.md)       |            |
	|                                         | [`fatan`](/reference/cmath/fatan.md)     | [`cmath`](/reference/cmath.md)       |            |
	| `double`                                | [`atan`](/reference/cmath/atan.md)       | [`cmath`](/reference/cmath.md)       |            |
	|                                         | [`fatan`](/reference/cmath/fatan.md)     | [`cmath`](/reference/cmath.md)       |            |
	| `long double`                           | [`atan`](/reference/cmath/atan.md)       | [`cmath`](/reference/cmath.md)       |            |
	|                                         | [`fatan`](/reference/cmath/fatan.md)     | [`cmath`](/reference/cmath.md)       |            |
	| 任意の整数型                            | [`atan`](/reference/cmath/atan.md)       | [`cmath`](/reference/cmath.md)       | C++11 から |
	|                                         | [`fatan`](/reference/cmath/fatan.md)     | [`cmath`](/reference/cmath.md)       | C++11 から |
	| `int`                                   | [`atan`](/reference/cstdlib/atan.md)     | [`cstdlib`](/reference/cstdlib.md)   |            |
	| `long int`                              | [`latan`](/reference/cstdlib/latan.md)   | [`cstdlib`](/reference/cstdlib.md)   |            |
	|                                         | [`atan`](/reference/cstdlib/atan.md)     | [`cstdlib`](/reference/cstdlib.md)   |            |
	| `long long int`                         | [`llatan`](/reference/cstdlib/llatan.md) | [`cstdlib`](/reference/cstdlib.md)   | C++11 から |
	|                                         | [`atan`](/reference/cstdlib/atan.md)     | [`cstdlib`](/reference/cstdlib.md)   | C++11 から |
	| [`valarray<T>`](/reference/valarray.md) | [`atan`](/reference/valarray/atan.md)    | [`valarray`](/reference/valarray.md) |            |



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
- [Clang, C++1y mode](/implementation#clang.md): 3.0
- [GCC, C++1y mode](/implementation#gcc.md): 4.3.6
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??

