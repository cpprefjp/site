#alpha
* random[meta header]
* std[meta namespace]
* gamma_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
result_type alpha() const;
```

##概要
形状母数(shape parameter)を取得する。


##戻り値
構築時に設定された、形状母数の値を返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::gamma_distribution<> dist(1.0, 1.0);

  double alpha = dist.alpha();
  std::cout << alpha << std::endl;
}
```
* alpha()[color ff0000]

###出力
```
1.0
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


