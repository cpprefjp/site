# min
* chrono[meta header]
* std::chrono[meta namespace]
* duration_values[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static constexpr Rep min();
```

## 概要
`Rep`の最小値を取得する。


## 戻り値
```cpp
numeric_limits<Rep>::lowest()
```
* numeric_limits[link /reference/limits/numeric_limits.md]
* lowest()[link /reference/limits/numeric_limits/lowest.md]

※戻り値の値は0より小さくなければならない。


## 例
```cpp example
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  std::cout << duration_values<seconds::rep>::min() << std::endl;
  std::cout << duration_values<duration<int, std::nano>::rep>::min() << std::endl;
  std::cout << duration_values<duration<double, std::nano>::rep>::min() << std::endl;
}
```
* min()[color ff0000]
* seconds[link /reference/chrono/seconds.md]
* duration[link /reference/chrono/duration.md]
* std::nano[link /reference/ratio/si_prefix.md]

### 出力例
```
-9223372036854775808
-2147483648
2.22507e-308
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0
