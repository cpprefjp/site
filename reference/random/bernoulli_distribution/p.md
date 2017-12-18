# p
* random[meta header]
* std[meta namespace]
* bernoulli_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
double p() const;
```

## 概要
確率`p`を取得する。


## 戻り値
構築時に設定された、`true`を生成する確率`p`を返す。


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::bernoulli_distribution dist(0.3);

  double p = dist.p();
  std::cout << p << std::endl;
}
```
* p()[color ff0000]

### 出力
```
0.3
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


