# max
* random[meta header]
* std[meta namespace]
* random_device[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static constexpr result_type max();
```

## 概要
生成する値の最大値を取得する。


## 戻り値
[`numeric_limits`](/reference/limits/numeric_limits.md)`<result_type>::`[`max()`](/reference/limits/numeric_limits/max.md)


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  unsigned int max_value = std::random_device::max();
  std::cout << max_value << std::endl;
}
```
* max()[color ff0000]

### 出力例
```
4294967295
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015, 2017


## 参照


