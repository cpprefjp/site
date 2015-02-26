#mean (C++11)
* random[meta header]
* std[meta namespace]
* poisson_distribution[meta class]

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
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


