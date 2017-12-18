# operator()
* random[meta header]
* std[meta namespace]
* independent_bits_engine[meta class]
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
#include <cstdint>

int main()
{
  std::independent_bits_engine<std::mt19937, 64, std::uint64_t> engine;

  for (int i = 0; i < 10; ++i) {
    // 乱数生成
    std::uint64_t result = engine();

    std::cout << result << std::endl;
  }
}
```
* engine()[color ff0000]
* std::mt19937[link /reference/random/mt19937.md]
* std::uint64_t[link /reference/cstdint/uint64_t.md]

### 出力例
```
152607844
823378840
578354438
2035308228
1004016855
280090412
101929267
1784484492
944975825
1190959745
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


