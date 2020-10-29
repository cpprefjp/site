# operator-
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr year_month_weekday
    operator-(const year_month_weekday& ymwd,
              const months& dm) noexcept;     // (1) C++20
  constexpr year_month_weekday
    operator-(const year_month_weekday& ymwd,
              const years& dy) noexcept;      // (2) C++20
}
```

## 概要
`year_month_weekday`の減算を行う。

- (1) : `year_month_weekday`から月の時間間隔を減算する
- (2) : `year_month_weekday`から年の時間間隔を減算する


## 戻り値
- (1) : `return ymwd + (-dm);`
- (2) : `return ymwd + (-dy);`


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  assert(2020y/4/chrono::Sunday[2] - chrono::months{1} == 2020y/3/chrono::Sunday[2]);
  assert(2021y/3/chrono::Sunday[2] - chrono::years{1} == 2020y/3/chrono::Sunday[2]);
}
```
* 2020y[link /reference/chrono/year/op_y.md]
* 2021y[link /reference/chrono/year/op_y.md]
* chrono::Sunday[link /reference/chrono/weekday_constants.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0
- [GCC](/implementation.md#gcc): 11.1
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)
