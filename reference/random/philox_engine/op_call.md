# operator()
* random[meta header]
* std[meta namespace]
* philox_engine[meta class]
* function[meta id-type]
* cpp26[meta cpp]

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
  std::philox4x32 engine;

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
3587538684
1324224816
3068087177
2030706281
1694797232
3200855668
284762628
612470539
492986243
2306264815
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 19 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
