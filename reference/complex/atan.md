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
虚軸(imaginary axis)は無限の区間、実軸(real axis)は`[-π/2, +π/2]`の区間を値域として、複素数の逆正接を計算して返す。

この関数は、区間`[-i, +i]`の外側に、虚軸に沿って分岐切断線(branch cut)をもつ。


##備考
この関数の挙動は、C言語標準ライブラリの`catan()`関数と同じである。


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c(1.0, 2.0);

  std::complex<double> result = std::atan(c);
  std::cout << result << std::endl;
}
```
* atan[color ff0000]
* iostream[link /reference/iostream.md]
* complex[link /reference/complex.md]

###出力
```
(1.33897,0.402359)
```


##バージョン
###言語
- C++11

###処理系
- [Clang, C++1y mode](/implementation#clang.md): 3.0
- [GCC, C++1y mode](/implementation#gcc.md): 4.3.6
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??

