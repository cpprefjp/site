#min
* random[meta header]
* std[meta namespace]
* piecewise_constant_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
result_type min() const;
```

##概要
値の範囲の最小値を取得する。


##戻り値
生成する値の範囲の最小値を返す。


##例
```cpp
#include <iostream>
#include <random>
#include <array>

int main()
{
  std::array<double, 3> intervals = {0.0, 0.5, 1.0};
  std::array<double, 2> densities = {0.3, 0.5};

  std::piecewise_constant_distribution<> dist(
    intervals.begin(),
    intervals.end(),
    densities.begin()
  );

  double min_value = dist.min();
  std::cout << min_value << std::endl;
}
```

###出力
```
0
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


