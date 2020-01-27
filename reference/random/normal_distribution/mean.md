# mean
* random[meta header]
* std[meta namespace]
* normal_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
result_type mean() const;
```

## 概要
分布の平均値を取得する。


## 戻り値
構築時に�定された、分布の平均値を返す。


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::normal_distribution<> dist(0.0, 1.0);

  double mean = dist.mean();
  std::cout << mean << std::endl;
}
```
* mean()[color ff0000]

### 出力
```
0
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


