#asinh (C++11)
```cpp
namespace std {
  template <class T>
  complex<T> asinh(const complex<T>& x);
}
```

##概要
複素数`x`の双曲線逆正弦（アークハイパボリックサイン、arc hyperbolic sine）を求める。


##戻り値
複素数の双曲線逆正弦を計算して返す。


##備考
- 規格には、本関数に関する具体的な規定・説明は無い。  
なお、C99 の規格にある本関数と同等の関数群（`complex.h` ヘッダの `casinh`、`casinhf`、`casinhl`の 3 つ。それぞれ C++ の `asinh<double>`、`asinh<float>`、`asinh<long double>` に相当）では、以下の規定がある：
	- 本関数は実軸の区間`[-i, +i]`の外側を分岐截断とすること、および戻り値は虚軸を無限の区間、実軸を`[-π/2, +π/2]`の区間とすること。
	- `asinh(conj(x)) = cobj(asinh(x))`で、また、`asinh`は奇関数（つまり、`asinh(-x) = -asinh(x)`）。
	- `asinh(complex(+0, +0))`は`complex(+0, +0)`を返す。
	- 有限の実部`x`について、`asinh(complex(x, +∞))`は`complex(+∞, π/2)`を返す。
	- 有限の実部`x`について、`asinh(complex(x, NaN))`は`complex(NaN, NaN)`を返すとともに、`feraiseexcept(FE_INVALID)`を呼び出す可能性がある。
	- 有限の虚部`y`について、`asinh(complex(+∞, y))`は`complex(+∞, +0)`を返す。
	- `asinh(complex(+∞, +∞))`は`complex(+∞, π/4)`を返す。
	- `asinh(complex(+∞, NaN))`は`complex(+∞, NaN)`を返す。
	- `asinh(complex(NaN, +0))`は`complex(NaN, +0)`を返す。
	- 有限の非ゼロな虚部`y`について、`asinh(complex(NaN, y))`は`complex(NaN, NaN)`を返すとともに、`feraiseexcept(FE_INVALID)`を呼び出す可能性がある。
	- `asinh(complex(NaN, +∞))`は`complex(±∞, NaN)`を返す(結果値の実部の符号は未規定)。
	- `asinh(complex(NaN, NaN))`は`complex(NaN, NaN)`を返す。

##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);

  std::complex<double> result = std::asinh(c);
  std::cout << "asinh( " << c << " ) = " << result << std::endl;
}
```
* asinh[color ff0000]
* iostream[link /reference/iostream.md]
* complex[link /reference/complex.md]

###出力
```
asinh( (1,2) ) = (1.46935,1.06344)
```


##バージョン
###言語
- C++11

###処理系
- [Clang, C++1y mode](/implementation#clang.md): 3.0
- [GCC, C++1y mode](/implementation#gcc.md): 4.3.6
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??

