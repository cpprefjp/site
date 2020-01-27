# max
* random[meta header]
* std[meta namespace]
* uniform_real_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
result_type max() const;
```

## 概要
生成し得る値の上限を取得する。


## 戻り値
構築時に�定された、値の範囲の上限を返す。


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::uniform_real_distribution<> dist(0.0, 1.0);

  double max_value = dist.max();
  std::cout << max_value << std::endl;
}
```
* max()[color ff0000]

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


