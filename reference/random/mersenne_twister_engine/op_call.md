# operator()
* random[meta header]
* std[meta namespace]
* mersenne_twister_engine[meta class]
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
  std::mt19937 engine;

  for (int i = 0; i < 10; ++i) {
    // 乱数生成
    std::uint32_t result = engine();

    std::cout << result << std::endl;
  }
}
```
* engine()[color ff0000]

### 出力例
```
3499211612
581869302
3890346734
3586334585
545404204
4161255391
3922919429
949333985
2715962298
1323567403
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照


