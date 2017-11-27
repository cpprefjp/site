# operator()
* random[meta header]
* std[meta namespace]
* discard_block_engine[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
result_type operator()();
```

## 概要
乱数生成を行う。


## 効果
ランダムな値を生成し、内部状態を進める。


## 戻り値
ランダムな値を生成して返す。  
値の範囲は`[`[`min()`](min.md), [`max()`](max.md)`]`である。つまり、最小値と最大値両方を含む。


## 計算量
償却定数時間


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::ranlux24 engine;

  for (int i = 0; i < 10; ++i) {
    // 乱数生成
    std::uint32_t result = engine();

    std::cout << result << std::endl;
  }
}
```
* engine()[color ff0000]
* std::ranlux24[link /reference/random/ranlux24.md]
* std::uint32_t[link /reference/cstdint/uint32_t.md]

### 出力例
```
15039276
16323925
14283486
7150092
68089
8584138
4918023
11368221
8644539
8342712
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


