#max
* random[meta header]
* std[meta namespace]
* discrete_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
result_type max() const;
```

##概要
上限を取得する。


##戻り値
最大のインデックスである「確率列の要素数 - 1」を返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::discrete_distribution<> dist = {0.1, 0.2, 0.3};

  int max_value = dist.max();
  std::cout << max_value << std::endl;
}
```

###出力
```
2
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


