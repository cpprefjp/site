# operator==
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr bool operator==(const leap_second& x,
                            const leap_second& y) noexcept;        // (1) C++20

  template <class Duration>
  constexpr bool operator==(const leap_second& x,
                            const sys_time<Duration>& y) noexcept; // (2) C++20
}
```
* sys_time[link /reference/chrono/sys_time.md]

## 概要
等値比較を行う。

- (1) : `leap_second`オブジェクト同士の等値比較を行う
- (2) : `leap_second`オブジェクトと[`sys_time`](/reference/chrono/sys_time.md)オブジェクトの等値比較を行う


## 戻り値
- (1) :
    ```cpp
    return x.date() == y.date();
    ```
    * date()[link date.md]

- (2) :
    ```cpp
    return x.date() == y;
    ```
    * x.date()[link date.md]


## 例外
投げない


## 備考
- この演算子により、`operator!=`が使用可能になる


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

// うるう秒が挿入された日かを判定
bool is_leap_second_day(chrono::year_month_day ymd) {
  chrono::sys_days days = ymd;
  for (const chrono::leap_second& x : chrono::get_tzdb().leap_seconds) {
    if (x == days) {
      return true;
    }
  }
  return false;
}

int main()
{
  if (is_leap_second_day(1972y/7/1)) {
    std::cout << "1972/7/1 is a leap second day" << std::endl;
  }
}
```
* x == days[color ff0000]
* chrono::year_month_day[link /reference/chrono/year_month_day.md]
* chrono::sys_days[link /reference/chrono/sys_time.md]
* chrono::get_tzdb()[link /reference/chrono/get_tzdb.md]
* 1972y[link /reference/chrono/year/op_y.md]

### 出力
```
1972/7/1 is a leap second day
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
