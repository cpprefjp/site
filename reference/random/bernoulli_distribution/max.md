#max (C++11)
* random[meta header]
* std[meta namespace]
* bernoulli_distribution[meta class]
* function[meta id-type]

```cpp
result_type max() const;
```

##概要
生成する範囲の最大値を取得する。


##戻り値
`true`を返す。


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::bernoulli_distribution dist(0.5);

  bool max_value = dist.max();
  std::cout << std::boolalpha << max_value << std::endl;
}
```

###出力
```
true
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


