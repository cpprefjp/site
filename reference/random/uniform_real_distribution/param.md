#param
* random[meta header]
* std[meta namespace]
* uniform_real_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
param_type param() const;
void param(const param_type& parm);
```

##概要
分布のパラメータを設定／取得する。

- `param_type param() const;`

分布のパラメータを返す。

- `void param(const param_type& param);`

分布のパラメータを設定する。

##例
```cpp
#include <iostream>
#include <random>

int main()
{
  typedef std::uniform_real_distribution<> dist_type;

  dist_type dist(0.0, 1.0);

  // パラメータを取得
  {
    dist_type::param_type param = dist.param();
  }

  // パラメータを設定
  {
    dist_type::param_type param(0.0, 1.0);
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


