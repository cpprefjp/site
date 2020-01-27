# beta
* random[meta header]
* std[meta namespace]
* gamma_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
result_type beta() const;
```

## 概要
尺度母数(scale parameter)を取得する。


## 戻り値
構築時に�定された、尺度母数の値を返す。


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::gamma_distribution<> dist(1.0, 1.0);

  double beta = dist.beta();
  std::cout << beta << std::endl;
}
```
* beta()[color ff0000]

### 出力
```
1.0
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照


