#atanh
```cpp
namespace std {
  float atanh(float x);

  double atanh(double x);

  long double atanh(long double x);

  template<class Integral>
  double atanh(Integral x);
}
```

##概要
算術型の逆双曲線正接（アークハイパボリックタンジェント）を求める。


##戻り値
引数 `x` の逆双曲線正接を返す。
`x` が `±1` だった場合 `±∞` を返す。
`|x| > 1` だった場合 `NaN` を返す。


##備考
![](https://raw.github.com/cpprefjp/image/master/reference/cmath/atanh/atanh.png)


##例
```cpp
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "atanh(-1.0) = " << std::atanh(-1.0) << std::endl;
  std::cout << "atanh(-0.5) = " << std::atanh(-0.5) << std::endl;
  std::cout << "atanh(0.0)  = " << std::atanh(0.0) << std::endl;
  std::cout << "atanh(0.5)  = " << std::atanh(0.5) << std::endl;
  std::cout << "atanh(1.0)  = " << std::atanh(1.0) << std::endl;
}
```

###出力
```
atanh(-1.0) = -inf
atanh(-0.5) = -0.549306
atanh(0.0)  = 0.000000
atanh(0.5)  = 0.549306
atanh(1.0)  = inf
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): 2.9, 3.1
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0

####備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）
- GCC 4.6.1 以上


##実装例
マクローリン展開によって近似的に求めることができる。
![](https://raw.github.com/cpprefjp/image/master/reference/cmath/atanh/atanh_mac.png)

または対数に変換して求めることができる。
![](https://raw.github.com/cpprefjp/image/master/reference/cmath/atanh/atanh_log.png)

