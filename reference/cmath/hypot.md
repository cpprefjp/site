#hypot
```cpp
namespace std {
  float hypot(float x, float y);

  double hypot(double x, double y);

  long double hypot(long double x, long double y);

  template<class Arithmetic1, class Arithmetic2>
  Promoted hypot(Arithmetic1 x, Arithmetic2 y);
}
```

##概要
算術型の平方和の平方根を求める。


##戻り値
引数 `x` と引数 `y` の平方和の平方根を返す。
引数の一方が `±∞` だった場合（もう一方が `NaN` であっても） `+∞` を返す。


##備考
![](https://github.com/cpprefjp/image/raw/master/reference/cmath/hypot/hypot.png)



##例
```cpp
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "hypot(0.0, 0.0)  = " << std::hypot(0.0, 0.0) << std::endl;
  std::cout << "hypot(1.0, 1.0)  = " << std::hypot(1.0, 1.0) << std::endl;
  std::cout << "hypot(3.0, 4.0)  = " << std::hypot(3.0, 4.0) << std::endl;
  std::cout << "hypot(+∞, NaN)  = " << std::hypot(std::numeric_limits<double>::infinity(), std::numeric_limits<double>::quiet_NaN()) << std::endl;
}
```

###出力
```
hypot(0.0, 0.0)  = 0.000000
hypot(1.0, 1.0)  = 1.414214
hypot(3.0, 4.0)  = 5.000000
hypot(+∞, NaN)  = inf
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): 2.9, 3.1
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0

####備考<
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）
- GCC 4.6.1 以上


##実装例
`sqrt` があれば、以下のように変換しても求められる。
![](https://github.com/cpprefjp/image/raw/master/reference/cmath/hypot/hypot_formula.png)

