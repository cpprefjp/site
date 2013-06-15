#cbrt
```cpp
namespace std {
  float cbrt(float x);

  double cbrt(double x);

  long double cbrt(long double x);

  template<class Integral>
  double cbrt(Integral x);
}
```

##概要
算術型の立方根を求める。


##戻り値
引数 `x` の立方根を返す。

`x` が `±∞` だった場合 `±∞` を返す。


##備考
![](https://github.com/cpprefjp/image/raw/master/reference/cmath/cbrt/cbrt.png)


##例
```cpp
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "cbrt(0.0)  = " << std::cbrt(0.0) << std::endl;
  std::cout << "cbrt(1.0)  = " << std::cbrt(1.0) << std::endl;
  std::cout << "cbrt(2.0)  = " << std::cbrt(2.0) << std::endl;
  std::cout << "cbrt(8.0)  = " << std::cbrt(8.0) << std::endl;
  std::cout << "cbrt(+∞)  = " << std::cbrt(std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "cbrt(-1.0) = " << std::cbrt(-1.0) << std::endl;
}
```

###出力
```
cbrt(0.0)  = 0.000000
cbrt(1.0)  = 1.000000
cbrt(2.0)  = 1.259921
cbrt(8.0)  = 2.000000
cbrt(+∞)  = inf
cbrt(-1.0) = -1.000000
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md):  2.9, 3.1
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0

####備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）
- GCC 4.6.1 以上


