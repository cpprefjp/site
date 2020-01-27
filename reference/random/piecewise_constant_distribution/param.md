# param
* random[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
param_type param() const;           // (1)
void param(const param_type& parm); // (2)
```

## 概要
- (1) : 分布のパラメータを取得する
- (2) : 分布のパラメータを�定する


## 例
```cpp example
#include <iostream>
#include <random>
#include <array>

int main()
{
  using dist_type = std::piecewise_constant_distribution<>;

  std::array<double, 3> intervals = {0.0, 0.5, 1.0};
  std::array<double, 2> densities = {0.3, 0.5};
  dist_type dist(
    intervals.begin(),
    intervals.end(),
    densities.begin()
  );

  // (1) パラメータを取得
  {
    dist_type::param_type param = dist.param();
  }

  // (2) パラメータを�定
  {
    std::array<double, 3> intervals2 = {0.0, 1.0, 2.0};
    std::array<double, 2> densities2 = {0.2, 8.0};

    dist_type::param_type param(
      intervals2.begin(),
      intervals2.end(),
      densities2.begin()
    );
    dist.param(param);
  }
}
```
* param()[color ff0000]
* param(param)[color ff0000]
* intervals.begin()[link /reference/array/array/begin.md]
* intervals.end()[link /reference/array/array/end.md]
* densities.begin()[link /reference/array/array/begin.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照


