#param
* random[meta header]
* std[meta namespace]
* discrete_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
param_type param() const;           // (1)
void param(const param_type& parm); // (2)
```

##概要
- (1) : 分布のパラメータを取得する
- (2) : 分布のパラメータを設定する


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  typedef std::discrete_distribution<> dist_type;

  dist_type dist = {0.1, 0.2, 0.3};

  // (1) パラメータを取得
  {
    dist_type::param_type param = dist.param();
  }

  // (2) パラメータを設定
  {
    dist_type::param_type param = {0.4, 0.5, 0.6};
    dist.param(param);
  }
}
```
* param()[color ff0000]
* param(param)[color ff0000]

###出力
```
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


