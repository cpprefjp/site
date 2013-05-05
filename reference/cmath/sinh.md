#sinh
```cpp
namespace std {
  float sinh(float x);

  double sinh(double x);

  long double sinh(long double x);

  template<class Integral>
  double sinh(Integral x);   // C++11
}
```

##概要
算術型の双曲線正弦（ハイパボリックサイン）を求める。


##戻り値
引数 `x` の双曲線正弦を返す。


##備考
![](https://raw.github.com/cpprefjp/image/master/reference/cmath/sinh/sinh.png)


##例
```cpp
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "sinh(-1.0) = " << std::sinh(-1.0) << std::endl;
  std::cout << "sinh(0.0)  = " << std::sinh(0.0) << std::endl;
  std::cout << "sinh(1.0)  = " << std::sinh(1.0) << std::endl;
}
```

###出力
```
sinh(-1.0) = -1.175201
sinh(0.0)  = 0.000000
sinh(1.0)  = 1.175201
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
![](https://raw.github.com/cpprefjp/image/master/reference/cmath/sinh/sinh_mac.png)


