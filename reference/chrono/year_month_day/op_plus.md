# operator+
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr year_month_day operator+(const year_month_day& ymd, const months& dm) noexcept; // (1) C++20
  constexpr year_month_day operator+(const months& dm, const year_month_day& ymd) noexcept; // (2) C++20

  constexpr year_month_day operator+(const year_month_day& ymd, const years& dy) noexcept;  // (3) C++20
  constexpr year_month_day operator+(const years& dy, const year_month_day& ymd) noexcept;  // (4) C++20
}
```

## 概要
`year_month_day`の加算を行う。

- (1) : `year_month_day`に月の時間間隔を加算する
- (2) : 月の時間間隔に`year_month_day`を加算する
- (3) : `year_month_day`に年の時間間隔を加算する
- (4) : 年の時間間隔に`year_month_day`を加算する


## 戻り値
- (1) :

```cpp
return (ymd.year() / ymd.month() + dm) / ymd.day();
```
* ymd.year()[link year.md]
* ymd.month()[link month.md]
* ymd.day()[link day.md]


- (2) :

```cpp
return ymd + dm;
```

- (3) :

```cpp
return (ymd.year() + dy) / ymd.month() / ymd.day();
```
* ymd.year()[link year.md]
* ymd.month()[link month.md]
* ymd.day()[link day.md]

- (4) :

```cpp
return ymd + dy;
```


## 例外
投げない


## 備考
- 日の値が29以上である場合、加算により年月の値によっては範囲外の日となり、[`ok()`](ok.md) `== false`になる可能性がある


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  assert(2020y/3/1 + chrono::months{1} == 2020y/4/1);
  assert(2020y/3/1 + chrono::years{1} == 2021y/3/1);
}
```

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)
