# min
* random[meta header]
* std[meta namespace]
* cauchy_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
result_type min() const;
```

## 概要
生成し得る値の下限を取得する。


## 戻り値
値の範囲の下限を返す。


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::cauchy_distribution<> dist(0.0, 1.0);

  double min_val = dist.min();
  std::cout << min_val << std::endl;
}
```
* min()[color ff0000]

### 出力例
```
-inf
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 
- [Visual C++](/implementation.md#visual_cpp): ??

### 備考
libc++(Clang)の実装では、`-`[`numeric_limits`](/reference/limits/numeric_limits.md)`::`[`infinity()`](/reference/limits/numeric_limits/infinity.md)を返す。

libstdc++(GCC)の実装では、[`numeric_limits`](/reference/limits/numeric_limits.md)`::`[`lowest()`](/reference/limits/numeric_limits/lowest.md)を返す。

いずれもこの分布が下限を持たないことを表しているが、得られる値は処理系によって異なる。
