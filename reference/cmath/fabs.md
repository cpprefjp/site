#fabs
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float fabs(float x);

  double fabs(double x);

  long double fabs(long double x);

  double fabs(Integral x);   // C++11
}
```
* Integral[italic]

##概要
算術型の絶対値を求める。


##戻り値
引数 `x` の絶対値を返す。

`x` が `±∞` だった場合 `+∞` を返す。


##備考
$$ f(x) = | x | $$


##例
```cpp
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "fabs(1.5)  = " << std::fabs(1.5) << std::endl;
  std::cout << "fabs(-1.5) = " << std::fabs(-1.5) << std::endl;
}
```

###出力
```
fabs(1.5)  = 1.500000
fabs(-1.5) = 1.500000
```

##バージョン
###言語
- C++03
- C++11

###処理系
- [Clang](/implementation.md#clang): 1.9, 2.9, 3.1
- [GCC](/implementation.md#gcc): 3.4.6, 4.2.4, 4.3.5, 4.4.5, 4.5.1, 4.5.2, 4.6.1, 4.7.0
- [GCC, C++0x mode](/implementation.md#gcc): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0
- [ICC](/implementation.md#icc): 10.1, 11.0, 11.1, 12.0
- [Visual C++](/implementation.md#visual_cpp) 7.1, 8.0, 9.0, 10.0

####備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


##実装例
```cpp
namespace std {
  constexpr float fabs(float x) {
    return x < 0 ? -x : x;
  }

  constexpr double fabs(double x) {
    return x < 0 ? -x : x;
  }

  constexpr long double fabs(long double x) {
    return x < 0 ? -x : x;
  }

  extern void* enabler;
  template<class Integral, typename enable_if<is_integral<Integral>::value>::type*& = enabler>
  constexpr double fabs(Integral x) {
    return fabs(static_cast<double>(x));
  }
}
```
