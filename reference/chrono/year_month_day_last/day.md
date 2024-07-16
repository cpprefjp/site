# day
* chrono[meta header]
* std::chrono[meta namespace]
* year_month_day_last[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr chrono::day day() const noexcept; // (1) C++20
```
* chrono::day[link /reference/chrono/day.md]

## 概要
日要素を求める。


## 戻り値
[`ok()`](ok.md)が`true`である場合、`*this`に設定された年と月の組で表現できる最終日を返す。そうでなければ、未規定の値を返す。


## 備考
- この値は要求に応じて計算されるだろう


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  chrono::year_month_day_last date = 2020y/2/chrono::last;
  chrono::day d = date.day();
  assert(d == 29d);
}
```
* date.day()[color ff0000]
* chrono::day[link /reference/chrono/day.md]
* 2020y[link /reference/chrono/year/op_y.md]
* 29d[link /reference/chrono/day/op_d.md]
* chrono::last[link /reference/chrono/last_spec.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [LWG Issue 3231. `year_month_day_last::day` specification does not cover `!ok()` values](https://wg21.cmeerw.net/lwg/issue3231)
