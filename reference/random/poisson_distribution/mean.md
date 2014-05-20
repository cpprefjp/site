#mean (C++11)
```cpp
double mean() const;
```

##概要
平均値を取得する。


##戻り値
構築時に設定された、値の平均値を返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::poisson_distribution<> dist(1.0);

  double mean = dist.mean();
  std::cout << mean << std::endl;
}
```

###出力
```
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


