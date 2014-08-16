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
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


