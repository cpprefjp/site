# max
* random[meta header]
* std[meta namespace]
* philox_engine[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
static constexpr result_type max();
```

## 概要
生成し得る値の最大値を取得する。


## 戻り値
`2^w - 1`を返す。


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::uint32_t max_value = std::philox4x32::max();
  std::cout << max_value << std::endl;
}
```
* max()[color ff0000]

### 出力
```
4294967295
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 19 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
