# operator>
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr bool
    operator>(const leap_second& x,
              const leap_second& y) noexcept;        // (1) C++20 (operator<=>により使用可能)

  template <class Duration>
  constexpr bool
    operator>(const leap_second& x,
              const sys_time<Duration>& y) noexcept; // (2) C++20

  template <class Duration>
  constexpr bool
    operator>(const sys_time<Duration>& x,
              const leap_second& y) noexcept;        // (3) C++20
}
```
* sys_time[link /reference/chrono/sys_time.md]

## 概要
左辺が右辺より大きいかの比較を行う。

- (1) : `leap_second`オブジェクト同士において、左辺より右辺が小さいかの比較を行う
- (2) : `leap_second`オブジェクトと[`sys_time`](/reference/chrono/sys_time.md)オブジェクトにおいて、左辺より右辺が大きいかの比較を行う
- (3) : [`sys_time`](/reference/chrono/sys_time.md)オブジェクトと`leap_second`オブジェクトにおいて、左辺より右辺が大きいかの比較を行う


## 戻り値
```cpp
return y < x;
```


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  // 2000年1月1日よりあとにうるう秒が挿入された日を列挙する
  for (const chrono::leap_second& date : chrono::get_tzdb().leap_seconds) {
    if (date > chrono::sys_days{2000y/1/1})
      std::cout << date.date() << std::endl;
  }
}
```
* chrono::get_tzdb()[link /reference/chrono/get_tzdb.md]
* chrono::sys_days[link /reference/chrono/sys_time.md]
* 2000y[link /reference/chrono/year/op_y.md]
* date()[link date.md]

### 出力例
```
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
