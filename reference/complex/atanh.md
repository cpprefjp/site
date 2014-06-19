#atanh (C++11)
```cpp
namespace std {
  template <class T>
  complex<T> atanh(const complex<T>& x);
}
```

##概要
複素数`x`の双曲線逆正接（アークハイパボリック、arc hyperbolic tangent）を求める。


##戻り値
複素数の双曲線逆正接を計算して返す。


##備考
- 規格には、本関数に関する具体的な規定・説明は無い。  
なお、C99 の規格にある本関数と同等の関数群（`complex.h` ヘッダの `catanh`、`catanhf`、`catanhl`の 3 つ。それぞれ C++ の `atanh<double>`、`atanh<float>`、`atanh<long double>` に相当）では、以下の規定がある：
	- 本関数は実軸の区間`[-1, +1]`の外側を分岐截断とすること、および戻り値は虚軸を無限の区間、実軸を`[-π/2, +π/2]`の区間とすること。
	- `atanh(conj(x)) = cobj(atanh(x))`で、また、`atanh`は偶関数（つまり、`atanh(-x) = atanh(x)`）。
	- `atanh(complex(+0, +0))`は`complex(+0, +0)`を返す。
	- `atanh(complex(+0, NaN))`は`complex(+0, NaN)`を返す。
	- `atanh(complex(+1, +0))`は`complex(+∞, +0)`を返すとともに、`feraiseexcept(FE_DIVBYZERO)`を呼び出す可能性がある。
	- 有限で正の値を持つ実部`x`について、`atanh(complex(x, +∞))`は`complex(+0, π/2)`を返す。
	- 有限で非ゼロな値を持つ実部`x`について、`atan(complex(x, NaN))`は`complex(NaN, NaN)`を返すとともに、`feraiseexcept(FE_INVALID)`を呼び出す可能性がある。
	- 有限で正の値を持つ虚部`y`について、`atanh(complex(+∞, y))`は`complex(+0, π/2)`を返す。
	- `atanh(complex(+∞, +∞))`は`complex(+0, π/2)`を返す。
	- `atanh(complex(+∞, NaN))`は`complex(+0, NaN)`を返す。
	- 有限の虚部`y`について、`atanh(complex(NaN, y))`は`complex(NaN, NaN)`を返すとともに、`feraiseexcept(FE_INVALID)`を呼び出す可能性がある。
	- `atanh(complex(NaN, +∞))`は`complex(±0, π/2)`を返す(結果値の実部の符号は未規定)。
	- `atanh(complex(NaN, NaN))`は`complex(NaN, NaN)`を返す。

##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);

  std::complex<double> result = std::atanh(c);
  std::cout << "atanh( " << c << " ) = " << result << std::endl;
}
```
* atanh[color ff0000]
* iostream[link /reference/iostream.md]
* complex[link /reference/complex.md]

###出力
```
atanh( (1,2) ) = (0.173287,1.1781)
```


##バージョン
###言語
- C++11

###処理系
- [Clang, C++1y mode](/implementation#clang.md): 3.0
- [GCC, C++1y mode](/implementation#gcc.md): 4.3.6
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??

