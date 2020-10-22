# operator-
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr year_month_day_last
    operator-(const year_month_day_last& ymdl,
              const months& dm) noexcept;      // (1) C++20
  constexpr year_month_day_last
    operator-(const year_month_day_last& ymdl,
              const years& dy) noexcept;       // (2) C++20
}
```

## 概要
`year_month_day_last`の減算を行う。

- (1) : `year_month_day_last`から月の時間間隔を減算する
- (2) : `year_month_day_last`から年の時間間隔を減算する


## 戻り値
- (1) : `return ymdl + (-dm);`
- (2) : `return ymdl + (-dy);`


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
  assert(chrono::year_month_day{2020y/3/chrono::last - chrono::months{1}} == 2020y/2/29);
  assert(chrono::year_month_day{2021y/2/chrono::last - chrono::years{1}} == 2020y/2/29);
}
```
* 2020y[link /reference/chrono/year/op_y.md]
* 2021y[link /reference/chrono/year/op_y.md]
* chrono::last[link /reference/chrono/last_spec.md]
* chrono::year_month_day[link /reference/chrono/year_month_day.md]

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
