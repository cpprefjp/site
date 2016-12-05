#a
* random[meta header]
* std[meta namespace]
* uniform_real_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
result_type a() const;
```

##概要
生成し得る値の下限を取得する。


##戻り値
構築時に設定された、値の下限を返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::uniform_real_distribution<> dist(0.0, 1.0);

  double a = dist.a();
  std::cout << a << std::endl;
}
```

###出力
```
0
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


