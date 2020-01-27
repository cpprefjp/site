# min
* random[meta header]
* std[meta namespace]
* normal_distribution[meta class]
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
  std::normal_distribution<> dist(0.0, 1.0);

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
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


### 備考
Boost.Randomとlibc++(Clang)の実装では、`-`[`numeric_limits`](/reference/limits/numeric_limits.md)`::`[`infinity()`](/reference/limits/numeric_limits/infinity.md)を返す。

GCC 4.8.1時点でのlibstdc++の実装では、[`numeric_limits`](/reference/limits/numeric_limits.md)`::`[`min()`](/reference/limits/numeric_limits/min.md)を返す。これはつまり`0.0`を意味するが、実際には`0.0`未満の値を生成するため、これはバグである[Bug 58098 - wrong return value of normal_distribution::min()](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=58098)。この問題は、GCC 4.8.2で修�された。


## 参照


