# min
* chrono[meta header]
* std::chrono[meta namespace]
* duration_values[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static constexpr Rep min();          // C++11
static constexpr Rep min() noexcept; // C++20
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
* std::nano[link /reference/ratio/si_prefix.md]

### 出力例
```
-9223372036854775808
-2147483648
-1.79769e+308
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified], 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 参照
- [P0972R0 `<chrono>` `zero()`, `min()`, and `max()` should be `noexcept`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0972r0.pdf)
