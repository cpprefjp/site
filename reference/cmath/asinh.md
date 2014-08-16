#asinh (C++11)
```cpp
namespace std {
  float asinh(float x);

  double asinh(double x);

  long double asinh(long double x);

  double asinh(Integral x);   // C++11
}
```
* Integral[italic]

##概要
算術型の逆双曲線正弦（アークハイパボリックサイン）を求める。


##戻り値
引数 `x` の逆双曲線正弦を返す。

`x` が `±∞` だった場合 `±∞` を返す。


##備考
![](https://raw.github.com/cpprefjp/image/master/reference/cmath/asinh/asinh.png)


##例
```cpp
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "asinh(-1.0) = " << std::asinh(-1.0) << std::endl;
  std::cout << "asinh(0.0)  = " << std::asinh(0.0) << std::endl;
  std::cout << "asinh(1.0)  = " << std::asinh(1.0) << std::endl;
}
```

###出力
```
asinh(-1.0) = -0.881374
asinh(0.0)  = 0.000000
asinh(1.0)  = 0.881374
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 2.9, 3.1
- [GCC, C++0x mode](/implementation.md#gcc): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0


####備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）
- GCC 4.6.1 以上


##実装例
マクローリン展開によって近似的に求めることができる。

![](https://raw.github.com/cpprefjp/image/master/reference/cmath/asinh/asinh_mac.png)


または対数に変換して求めることができる。

![](https://raw.github.com/cpprefjp/image/master/reference/cmath/asinh/asinh_log.png)

