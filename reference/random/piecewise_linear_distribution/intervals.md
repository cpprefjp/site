#intervals (C++11)
```cpp
vector<result_type> intervals() const;
```

##概要
区間の数列を取得する。


##戻り値
保持している区間列を返す。


##例
```cpp
#include <iostream>
#include <vector>
#include <random>
#include <array>

int main()
{
  std::array<double, 3> intervals = {0.0, 0.5, 1.0};
  std::array<double, 3> densities = {0.0, 0.5, 0.0};

  std::piecewise_linear_distribution<> dist(
    intervals.begin(),
    intervals.end(),
    densities.begin()
  );

  std::vector<double> xs = dist.intervals();
  for (double x : xs) {
    std::cout << x << std::endl;
  }
}
```


###出力
```
0
0.5
1
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


