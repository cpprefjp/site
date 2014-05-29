#asin (C++11)
```cpp
namespace std {
  template <class T>
  complex<T> asin(const complex<T>& x);
}
```

##概要
複素数`x`の逆正弦（アークサイン、arc sine）を求める。


##戻り値
複素数の逆正弦を計算して返す。


##備考
- 規格には、本関数に関する具体的な規定・説明は無い。  
なお、C99 の規格にある本関数と同等の関数群（`complex.h` ヘッダの `casin`、`casinf`、`casinl`の 3 つ。それぞれ C++ の `asin<double>`、`asin<float>`、`asin<long double>` に相当）では、以下の規定がある：
	- 本関数は実軸の区間`[-1, +1]`の外側を分岐截断とすること、および戻り値は虚軸を無限の区間、実軸を`[-π/2, +π/2]`の区間とすること。
	- `asin(x) = complex(0, -1) * asinh(x)`
- 逆正弦の算出については、一部の算術型、および、[`valarray`](/reference/valarray.md) クラステンプレートに対しても、他のヘッダで定義されている。

	| 引数の型                                | 関数                                     | ヘッダ                               | 備考       |
	|-----------------------------------------|------------------------------------------|--------------------------------------|------------|
	| `float`                                 | [`asin`](/reference/cmath/asin.md)       | [`cmath`](/reference/cmath.md)       |            |
	|                                         | [`fasin`](/reference/cmath/fasin.md)     | [`cmath`](/reference/cmath.md)       |            |
	| `double`                                | [`asin`](/reference/cmath/asin.md)       | [`cmath`](/reference/cmath.md)       |            |
	|                                         | [`fasin`](/reference/cmath/fasin.md)     | [`cmath`](/reference/cmath.md)       |            |
	| `long double`                           | [`asin`](/reference/cmath/asin.md)       | [`cmath`](/reference/cmath.md)       |            |
	|                                         | [`fasin`](/reference/cmath/fasin.md)     | [`cmath`](/reference/cmath.md)       |            |
	| 任意の整数型                            | [`asin`](/reference/cmath/asin.md)       | [`cmath`](/reference/cmath.md)       | C++11 から |
	|                                         | [`fasin`](/reference/cmath/fasin.md)     | [`cmath`](/reference/cmath.md)       | C++11 から |
	| `int`                                   | [`asin`](/reference/cstdlib/asin.md)     | [`cstdlib`](/reference/cstdlib.md)   |            |
	| `long int`                              | [`lasin`](/reference/cstdlib/lasin.md)   | [`cstdlib`](/reference/cstdlib.md)   |            |
	|                                         | [`asin`](/reference/cstdlib/asin.md)     | [`cstdlib`](/reference/cstdlib.md)   |            |
	| `long long int`                         | [`llasin`](/reference/cstdlib/llasin.md) | [`cstdlib`](/reference/cstdlib.md)   | C++11 から |
	|                                         | [`asin`](/reference/cstdlib/asin.md)     | [`cstdlib`](/reference/cstdlib.md)   | C++11 から |
	| [`valarray<T>`](/reference/valarray.md) | [`asin`](/reference/valarray/asin.md)    | [`valarray`](/reference/valarray.md) |            |


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);

  std::complex<double> result = std::asin(c);
  std::cout << "asin( " << c << " ) = " << result << std::endl;
}
```
* asin[color ff0000]
* iostream[link /reference/iostream.md]
* complex[link /reference/complex.md]

###出力
```
asin( (1,2) ) = (0.427079,1.52857)
```


##バージョン
###言語
- C++11

###処理系
- [Clang, C++1y mode](/implementation#clang.md): 3.0
- [GCC, C++1y mode](/implementation#gcc.md): 4.3.6
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??

