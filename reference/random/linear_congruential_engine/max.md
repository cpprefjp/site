# max
* random[meta header]
* std[meta namespace]
* linear_congruential_engine[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static constexpr result_type max() { return m - 1u; }
```

## 概要
生成し得る値の最大値を取得する。


## 戻り値
パラメータ`m - 1u`を返す。


## 計算量
定数時間


## 例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::uint32_t max_value = std::minstd_rand::max();
  std::cout << max_value << std::endl;
}
```
* max()[color ff0000]
* std::minstd_rand[link /reference/random/minstd_rand.md]
* std::uint32_t[link /reference/cstdint/uint32_t.md]

### 出力
```
2147483646
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


