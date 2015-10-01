#atan2
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float atan2(float y, float x);

  double atan2(double y, double x);

  long double atan2(long double y, long double x);

  Promoted atan2(Arithmetic1 y, Arithmetic2 x);   // C++11
}
```
* Promoted[italic]
* Arithmetic1[italic]
* Arithmetic2[italic]

##概要
算術型の逆正接（アークタンジェント）を対辺と隣辺から求める。


##戻り値
`y / x` の逆正接を `[-π; π]` の範囲で返す。

象限は引数の符号から適切に求められる。


##備考
$$ f(y, x) = \tan^{-1} \frac{y}{x} $$

引数の順番に注意されたし。


##例
```cpp
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "atan2(0.0, 1.0)   = " << std::atan2(0.0, 1.0) << std::endl;
  std::cout << "atan2(1.0, 1.0)   = " << std::atan2(1.0, 1.0) << std::endl;
  std::cout << "atan2(1.0, 0.0)   = " << std::atan2(1.0, 0.0) << std::endl;
  std::cout << "atan2(1.0, -1.0)  = " << std::atan2(1.0, -1.0) << std::endl;
  std::cout << "atan2(0.0, -1.0)  = " << std::atan2(0.0, -1.0) << std::endl;
  std::cout << "atan2(-1.0, -1.0) = " << std::atan2(-1.0, -1.0) << std::endl;
  std::cout << "atan2(-1.0, 0.0)  = " << std::atan2(-1.0, 0.0) << std::endl;
  std::cout << "atan2(-1.0, 1.0)  = " << std::atan2(-1.0, 1.0) << std::endl;
}
```

###出力
```
atan2(0.0, 1.0)   = 0.000000
atan2(1.0, 1.0)   = 0.785398
atan2(1.0, 0.0)   = 1.570796
atan2(1.0, -1.0)  = 2.356194
atan2(0.0, -1.0)  = 3.141593
atan2(-1.0, -1.0) = -2.356194
atan2(-1.0, 0.0)  = -1.570796
atan2(-1.0, 1.0)  = -0.785398
```

##バージョン
###言語
- C++03
- C++11

###処理系
- [Clang](/implementation.md#clang): 1.9, 2.9, 3.1
- [GCC](/implementation.md#gcc): 3.4.6, 4.2.4, 4.3.5, 4.4.5, 4.5.1, 4.5.2, 4.6.1, 4.7.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0
- [ICC](/implementation.md#icc): 10.1, 11.0, 11.1, 12.0
- [Visual C++](/implementation.md#visual_cpp) 7.1, 8.0, 9.0, 10.0

####備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


##実装例
`[-π/2; π/2]` の範囲を返す `atan` があれば、引数の符号に応じて以下のように変換することで求められる。

$$
\tan^{-1} \frac{y}{x} =
\begin{cases}
\displaystyle \tan^{-1} \frac{y}{x}       & \quad \mathrm{for} \; 0 \le x \\[2ex]
\displaystyle \tan^{-1} \frac{y}{x} + \pi & \quad \mathrm{for} \; x < 0, \; 0 \le y \\[2ex]
\displaystyle \tan^{-1} \frac{y}{x} - \pi & \quad \mathrm{for} \; x < 0, \; y < 0
\end{cases}
$$
