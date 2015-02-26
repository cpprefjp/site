#m (C++11)
* random[meta header]
* std[meta namespace]
* fisher_f_distribution[meta class]

```cpp
result_type m() const;
```

##概要
自由度mを取得する。


##戻り値
構築時に設定された、自由度mを返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::fisher_f_distribution<> dist(3.0, 4.0);

  double m = dist.m();
  std::cout << m << std::endl;
}
```

###出力
```
3
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


