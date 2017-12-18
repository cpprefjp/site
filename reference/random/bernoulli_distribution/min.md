# min
* random[meta header]
* std[meta namespace]
* bernoulli_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
result_type min() const;
```

## 概要
生成し得る値の下限を取得する。


## 戻り値
`false`を返す。


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::bernoulli_distribution dist(0.5);

  bool min_value = dist.min();
  std::cout << std::boolalpha << min_value << std::endl;
}
```
* min()[color ff0000]

### 出力
```
false
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照


