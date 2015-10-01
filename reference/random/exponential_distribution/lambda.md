#lambda
* random[meta header]
* std[meta namespace]
* exponential_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
result_type lambda() const;
```

##概要
指数分布のパラメータλを取得する。


##戻り値
構築時に設定された、`lambda`の値を返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::exponential_distribution<> dist(1.0);

  double lambda = dist.lambda();
  std::cout << lambda << std::endl;
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
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


