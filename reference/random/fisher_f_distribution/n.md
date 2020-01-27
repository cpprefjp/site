# n
* random[meta header]
* std[meta namespace]
* fisher_f_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
result_type n() const;
```

## 概要
分布の自由度nを取得する。


## 戻り値
構築時に�定された、分布の自由度nを返す。


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::fisher_f_distribution<> dist(3.0, 4.0);

  double n = dist.n();
  std::cout << n << std::endl;
}
```
* n()[color ff0000]

### 出力
```
4
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照


