#p (C++11)
* random[meta header]
* std[meta namespace]

```cpp
double p() const;
```

##概要
確率`p`を取得する。


##戻り値
構築時に設定された、一度の事象が成功する確率`p`を返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::negative_binomial_distribution<> dist(3, 0.5);

  double p = dist.p();
  std::cout << p << std::endl;
}
```

###出力
```
0.5
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


