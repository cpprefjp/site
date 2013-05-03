#acosh
```cpp
namespace std {  float acosh(float x);  double acosh(double x);  long double acosh(long double x);  template<class Integral>  double acosh(Integral x);}
```

##概要

<b>算術型の逆双曲線余弦（アークハイパボリックコサイン）を求める。</b>


##戻り値

引数 x の逆双曲線余弦を [0; +∞] の範囲で返す。
x < 1 だった場合 NaN を返す。
x が +∞ だった場合 +∞ を返す。


##備考

![](https://raw.github.com/cpprefjp/image/master/reference/cmath/acosh/acosh.png)



##例

```cpp
#include <cmath>#include <iostream>int main() {  std::cout << std::fixed;  std::cout << "acosh(1.0) = " << std::acosh(1.0) << std::endl;  std::cout << "acosh(2.0) = " << std::acosh(2.0) << std::endl;  std::cout << "acosh(∞)  = " << std::acosh(INFINITY) << std::endl;}
```

###出力

```cpp
acosh(1.0) = 0.000000acosh(2.0) = 1.316958acosh(∞)  = inf
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): 2.9, 3.1
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0<h4>備考</h4>
特定の環境で constexpr 指定されている場合がある。（独自拡張）
- GCC 4.6.1 以上



##実装例

対数に変換して求めることができる。
![](https://raw.github.com/cpprefjp/image/master/reference/cmath/acosh/acosh_log.png)

