# operator[]
* chrono[meta header]
* std::chrono[meta namespace]
* weekday[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr weekday_indexed
  operator[](unsigned int index) const noexcept; // (1) C++20

constexpr weekday_last
  operator[](last_spec) const noexcept;          // (2) C++20
```
* weekday_indexed[link /reference/chrono/weekday_indexed.md]
* weekday_last[link /reference/chrono/weekday_last.md]
* last_spec[link /reference/chrono/last_spec.md]

## 概要
月のN回目の指定した曜日を取得する。

- (1) : 月のN回目の指定した曜日を取得する
- (2) : 月の最後の指定した曜日を取得する


## 戻り値
- (1) : `{*this, index}`
- (2) : [`weekday_last`](/reference/chrono/weekday_last.md)`{*this}`


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  {
    // 2019年11月の3回目の日曜日が何日か
    year_month_weekday base_date = 2019y/November/Sunday[3];
    year_month_day date{sys_days{base_date}}; // 年/月/日に変換
    std::cout << static_cast<unsigned int>(date.day()) << std::endl; // 日を取得
  }
  {
    // 2019年11月の最後の日曜日が何日か
    year_month_weekday_last base_date = 2019y/November/Sunday[last];
    year_month_day date{sys_days{base_date}};
    std::cout << static_cast<unsigned int>(date.day()) << std::endl;
  }
}
```
* Sunday[link /reference/chrono/weekday_constants.md]
* November[link /reference/chrono/month_constants.md]
* last[link /reference/chrono/last_spec.md]
* year_month_weekday[link /reference/chrono/year_month_weekday.md]
* year_month_weekday_last[link /reference/chrono/year_month_weekday_last.md]
* year_month_day[link /reference/chrono/year_month_day.md]
* date.day()[link /reference/chrono/year_month_day/day.md]

### 出力
```
17
24
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
