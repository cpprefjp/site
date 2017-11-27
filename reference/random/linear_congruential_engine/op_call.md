# operator()
* random[meta header]
* std[meta namespace]
* linear_congruential_engine[meta class]
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
  std::minstd_rand engine;

  for (int i = 0; i < 10; ++i) {
    // 乱数生成
    std::uint32_t result = engine();

    std::cout << result << std::endl;
  }
}
```
* engine()[color ff0000]
* std::minstd_rand[link /reference/random/minstd_rand.md]
* std::uint32_t[link /reference/cstdint/uint32_t.md]

### 出力例
```
48271
182605794
1291394886
1914720637
2078669041
407355683
1105902161
854716505
564586691
1596680831
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


