#acosh (C++11)
```cpp
namespace std {
  template <class T>
  complex<T> acosh(const complex<T>& x);
}
```

##概要
複素数`x`の逆双曲線余弦（アークハイパボリックコサイン、arc hyperbolic cosine）を求める。


##戻り値
複素数の逆双曲線余弦を計算して返す。


##備考
- 規格には、本関数に関する具体的な規定・説明は無い。  
なお、C99 の規格にある本関数と同等の関数群（`complex.h` ヘッダの `cacosh`、`cacoshf`、`cacoshl`の 3 つ。それぞれ C++ の `acosh<double>`、`acosh<float>`、`acosh<long double>` に相当）では、以下の規定がある：
	- 本関数は実軸の区間`[-1, +1]`の外側を分岐截断とすること、および戻り値は虚軸を無限の区間、実軸を`[0, π]`の区間とすること。
	- `acosh(conj(x)) = conj(acosh(x))`
	- `acosh(complex(±0, +0))`は`complex(+0, π/2)`を返す。
	- 有限の実部`x`について、`acosh(complex(x, +∞))`は`complex(+∞, π/2)`を返す。
	- 有限の実部`x`について、`acosh(complex(x, NaN))`は`complex(NaN, NaN)`を返すとともに、`feraiseexcept(FE_INVALID)`を呼び出す可能性がある。
	- 有限で正の値を持つ虚部`y`について、`acosh(-∞, y)`は`complex(+∞, π)`を返す。
	- 有限で正の値を持つ虚部`y`について、`acosh(+∞, y)`は`complex(+∞, +0)`を返す。
	- `acosh(complex(-∞, +∞))`は`complex(+∞, 3π/4)`を返す。
	- `acosh(complex(+∞, +∞))`は`complex(+∞, π/4)`を返す。
	- `acosh(complex(±∞, NaN))`は`complex(+∞, NaN)`を返す。
	- 有限の虚部`y`について、`acosh(complex(NaN, y))`は`complex(NaN, NaN)`を返すとともに、`feraiseexcept(FE_INVALID)`を呼び出す可能性がある。
	- `acosh(complex(NaN, +∞))`は`complex(+∞, NaN)`を返す。
	- `acosh(complex(NaN, NaN))`は`complex(NaN, NaN)`を返す。


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
- [Clang, C++1y mode](/implementation#clang.md): 3.0
- [GCC, C++1y mode](/implementation#gcc.md): 4.3.6
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??

