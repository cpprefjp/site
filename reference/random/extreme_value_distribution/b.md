# b
* random[meta header]
* std[meta namespace]
* extreme_value_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
RealType b() const;
```

## 概要
尺度パラメータを取得する。


## 戻り値
構築時に設定された、尺度パラメータを返す。


## 例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::extreme_value_distribution<> dist(0.0, 1.0);

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
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


## 参照


