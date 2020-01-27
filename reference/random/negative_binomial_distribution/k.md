# k
* random[meta header]
* std[meta namespace]
* negative_binomial_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
IntType k() const;
```

## 概要
目標とする成功回数`k`を取得する。


## 戻り値
構築時に�定された、成功回数`k`を返す。


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::negative_binomial_distribution<> dist(3, 0.5);

  int k = dist.k();
  std::cout << k << std::endl;
}
```
* k()[color ff0000]

### 出力
```
3
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


