# min
* random[meta header]
* std[meta namespace]
* subtract_with_carry_engine[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static constexpr result_type min() { return 0; }
```

## 概要
生成し得る値の最小値を取得する。


## 戻り値
値の最小値である`0`を返す。


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <random>
#include <cstdint>

int main()
{
  std::uint32_t min_value = std::ranlux24_base::min();
  std::cout << min_value << std::endl;
}
```
* min()[color ff0000]
* std::ranlux24_base[link /reference/random/ranlux24_base.md]

### 出力
```
0
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified], 2017 [mark verified]


## 参照


