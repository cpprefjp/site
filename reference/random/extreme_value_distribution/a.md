# a
* random[meta header]
* std[meta namespace]
* extreme_value_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
RealType a() const;
```

## 概要
位置パラメータを取得する。


## 戻り値
構築時に設定された、位置パラメータを返す。


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::extreme_value_distribution<> dist(0.0, 1.0);

  double a = dist.a();
  std::cout << a << std::endl;
}
```
* a()[color ff0000]

### 出力
```
0
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


