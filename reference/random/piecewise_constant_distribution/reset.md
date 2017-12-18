# reset
* random[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void reset();
```

## 概要
状態をリセットする。  
この関数を呼び出すことで、後続の乱数生成が、前回の乱数生成によって変更されうる状態に依存せずに行うことができる。

## 効果
内部の状態をリセットする。


## 戻り値
なし


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <random>
#include <array>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  std::array<double, 3> intervals = {0.0, 0.5, 1.0};
  std::array<double, 2> densities = {0.3, 0.5};

  std::piecewise_constant_distribution<> dist(
    intervals.begin(),
    intervals.end(),
    densities.begin()
  );

  for (int i = 0; i < 5; ++i) {
    dist.reset(); // 前回生成までの状態をリセット
    std::cout << dist(engine) << std::endl;
  }
}
```
* reset()[color ff0000]
* std::random_device[link /reference/random/random_device.md]
* seed_gen()[link /reference/random/random_device/op_call.md]
* std::default_random_engine[link /reference/random/default_random_engine.md]
* intervals.begin()[link /reference/array/begin.md]
* intervals.end()[link /reference/array/end.md]
* densities.begin()[link /reference/array/begin.md]

### 出力例
```
0.482153
0.465311
0.259349
0.813001
0.699004
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


