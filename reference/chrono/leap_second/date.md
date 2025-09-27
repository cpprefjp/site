# date
* chrono[meta header]
* std::chrono[meta namespace]
* leap_second[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr sys_seconds date() const noexcept; // (1) C++20
```
* sys_seconds[link /reference/chrono/sys_time.md]

## 概要
うるう秒が挿入された日時を秒単位のシステム時間として取得する。


## 戻り値
うるう秒が挿入された日時を返す。


## 例
```cpp example
#include <cassert>
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  for (const chrono::leap_second date : chrono::get_tzdb().leap_seconds) {
    chrono::sys_seconds s = date.date();
    std::cout << s << std::endl;
  }
}
```
* date()[color ff0000]
* chrono::get_tzdb()[link /reference/chrono/get_tzdb.md]
* chrono::sys_seconds[link /reference/chrono/sys_time.md]

### 出力例
```
1972-07-01 00:00:00
1973-01-01 00:00:00
1974-01-01 00:00:00
1975-01-01 00:00:00
1976-01-01 00:00:00
1977-01-01 00:00:00
1978-01-01 00:00:00
1979-01-01 00:00:00
1980-01-01 00:00:00
1981-07-01 00:00:00
1982-07-01 00:00:00
1983-07-01 00:00:00
1985-07-01 00:00:00
1988-01-01 00:00:00
1990-01-01 00:00:00
1991-01-01 00:00:00
1992-07-01 00:00:00
1993-07-01 00:00:00
1994-07-01 00:00:00
1996-01-01 00:00:00
1997-07-01 00:00:00
1999-01-01 00:00:00
2006-01-01 00:00:00
2009-01-01 00:00:00
2012-07-01 00:00:00
2015-07-01 00:00:00
2017-01-01 00:00:00
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
