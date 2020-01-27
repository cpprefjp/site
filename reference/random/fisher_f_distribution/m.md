# m
* random[meta header]
* std[meta namespace]
* fisher_f_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
result_type m() const;
```

## 概要
分布の自由度mを取得する。


## 戻り値
構築時に�定された、分布の自由度mを返す。


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::fisher_f_distribution<> dist(3.0, 4.0);

  double m = dist.m();
  std::cout << m << std::endl;
}
```
* m()[color ff0000]

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


