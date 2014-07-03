#cosh
```cpp
namespace std {
  float cosh(float x);

  double cosh(double x);

  long double cosh(long double x);

  double cosh(Integral x);   // C++11
}
```
* Integral[italic]

##概要
算術型の双曲線余弦（ハイパボリックコサイン）を求める。


##戻り値
引数 `x` の双曲線余弦を返す。


##備考
![](https://raw.github.com/cpprefjp/image/master/reference/cmath/cosh/cosh.png)


##例
```cpp
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "cosh(-1.0) = " << std::cosh(-1.0) << std::endl;
  std::cout << "cosh(0.0)  = " << std::cosh(0.0) << std::endl;
  std::cout << "cosh(1.0)  = " << std::cosh(1.0) << std::endl;
}
```

###出力
```
cosh(-1.0) = 1.543081
cosh(0.0)  = 1.000000
cosh(1.0)  = 1.543081
```

##バージョン
###言語
- C++03
- C++11

###処理系
- [Clang](/implementation#clang.md): 1.9, 2.9, 3.1
- [GCC](/implementation#gcc.md): 3.4.6, 4.2.4, 4.3.5, 4.4.5, 4.5.1, 4.5.2, 4.6.1, 4.7.0
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0
- [ICC](/implementation#icc.md): 10.1, 11.0, 11.1, 12.0
- [Visual C++](/implementation#visual_cpp.md) 7.1, 8.0, 9.0, 10.0

####備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）
- GCC 4.6.1 以上


##実装例
マクローリン展開によって近似的に求めることができる。

![](https://raw.github.com/cpprefjp/image/master/reference/cmath/cosh/cosh_mac.png)

