#probabilities (C++11)
```cpp
vector<double> probabilities() const;
```

##概要
確率列を取得する。


##戻り値
保持している確率列を返す。


##例
```cpp
#include <iostream>
#include <vector>
#include <random>

int main()
{
  std::discrete_distribution<> dist = {0.0, 0.1, 0.2, 0.3};

  std::vector<double> prob = dist.probabilities();
  for (double x : prob) {
    std::cout << x << std::endl;
  }
}
```


###出力
```
0
0.166667
0.333333
0.5
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


