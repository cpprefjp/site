# b
* random[meta header]
* std[meta namespace]
* weibull_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
RealType b() const;
```

## 概要
尺度パラメータを取得する。


## 戻り値
構築時に�定された、尺度パラメータを返す。


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::weibull_distribution<> dist(1.0, 1.0);

  double b = dist.b();
  std::cout << b << std::endl;
}
```
* b()[color ff0000]

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


