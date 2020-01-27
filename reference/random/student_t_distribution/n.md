# n
* random[meta header]
* std[meta namespace]
* student_t_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
result_type n() const;
```

## 概要
分布の自由度を取得する。


## 戻り値
構築時に�定された、分布の自由度を返す。


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::student_t_distribution<> dist(1.0);

  double n = dist.n();
  std::cout << n << std::endl;
}
```
* n()[color ff0000]

### 出力
```
1
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


