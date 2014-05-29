#acos (C++11)
```cpp
namespace std {
  template <class T>
  complex<T> acos(const complex<T>& x);
}
```

##概要
複素数`x`の逆余弦（アークコサイン、arc cosine）を求める。


##戻り値
複素数の逆余弦を計算して返す。


##備考
- 規格には、本関数に関する具体的な規定・説明は無い。  
なお、C99 の規格にある本関数と同等の関数群（`complex.h` ヘッダの `cacos`、`cacosf`、`cacosl`の 3 つ。それぞれ C++ の `acos<double>`、`acos<float>`、`acos<long double>` に相当）では、以下の規定がある：
	- 本関数は実軸の区間`[-1, +1]`の外側を分岐截断とすること、および戻り値は虚軸を無限の区間、実軸を`[0, π]`の区間とすること。
	- `acos(conj(x)) = conj(acos(x))`
	- `acos(complex(±0, 0))`は`complex(π/2, -0.0f)`を返す。
	- `acos(complex(±0, NaN))`は`complex(π/2, NaN)`を返す。
	- 有限の実部`x`について、`acos(complex(x, +∞))`は`complex(π/2, -∞)`を返す。
	- 有限で非ゼロな実部`x`について、`acos(x, NaN)`は`complex(NaN, NaN)`を返すとともに、`feraiseexcept(FE_INVALID)`を呼び出す可能性がある。
	- 有限で正の値を持つ虚部`y`について、`acos(-∞, y)`は`complex(π, -∞)`を返す。
	- 有限で正の値を持つ虚部`y`について、`acos(+∞, y)`は`complex(+0.0, -∞)`を返す。
	- `acos(-∞, +∞)`は`complex(3π/4, -∞)`を返す。
	- `acos(+∞, +∞)`は`complex(π/4, -∞)`を返す。
	- `acos(+∞, NaN)`は`complex(NaN, ±∞)`を返す(結果値の虚部の符号は未規定)。
	- `acos(+∞, NaN)`は`complex(NaN, ±∞)`を返す(結果値の虚部の符号は未規定)。
	- 有限の虚部`y`について、`acos(NaN, y)`は`complex(NaN, NaN)`を返すとともに、`feraiseexcept(FE_INVALID)`を呼び出す可能性がある。
	- `acos(NaN, ∞)`は`complex(NaN, -∞)`を返す。
	- `acos(NaN, NaN)`は`complex(NaN, NaN)`を返す。
- 逆余弦の算出については、一部の算術型、および、[`valarray`](/reference/valarray.md) クラステンプレートに対しても、他のヘッダで定義されている。  

	| 引数の型                                | 関数                                     | ヘッダ                               | 備考       |
	|-----------------------------------------|------------------------------------------|--------------------------------------|------------|
	| `float`                                 | [`acos`](/reference/cmath/acos.md)       | [`cmath`](/reference/cmath.md)       |            |
	|                                         | [`facos`](/reference/cmath/facos.md)     | [`cmath`](/reference/cmath.md)       |            |
	| `double`                                | [`acos`](/reference/cmath/acos.md)       | [`cmath`](/reference/cmath.md)       |            |
	|                                         | [`facos`](/reference/cmath/facos.md)     | [`cmath`](/reference/cmath.md)       |            |
	| `long double`                           | [`acos`](/reference/cmath/acos.md)       | [`cmath`](/reference/cmath.md)       |            |
	|                                         | [`facos`](/reference/cmath/facos.md)     | [`cmath`](/reference/cmath.md)       |            |
	| 任意の整数型                            | [`acos`](/reference/cmath/acos.md)       | [`cmath`](/reference/cmath.md)       | C++11 から |
	|                                         | [`facos`](/reference/cmath/facos.md)     | [`cmath`](/reference/cmath.md)       | C++11 から |
	| `int`                                   | [`acos`](/reference/cstdlib/acos.md)     | [`cstdlib`](/reference/cstdlib.md)   |            |
	| `long int`                              | [`lacos`](/reference/cstdlib/lacos.md)   | [`cstdlib`](/reference/cstdlib.md)   |            |
	|                                         | [`acos`](/reference/cstdlib/acos.md)     | [`cstdlib`](/reference/cstdlib.md)   |            |
	| `long long int`                         | [`llacos`](/reference/cstdlib/llacos.md) | [`cstdlib`](/reference/cstdlib.md)   | C++11 から |
	|                                         | [`acos`](/reference/cstdlib/acos.md)     | [`cstdlib`](/reference/cstdlib.md)   | C++11 から |
	| [`valarray<T>`](/reference/valarray.md) | [`acos`](/reference/valarray/acos.md)    | [`valarray`](/reference/valarray.md) |            |


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
- [Clang, C++1y mode](/implementation#clang.md): 3.0
- [GCC, C++1y mode](/implementation#gcc.md): 4.3.6
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??

