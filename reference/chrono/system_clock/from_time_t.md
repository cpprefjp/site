# from_time_t
* chrono[meta header]
* std::chrono[meta namespace]
* system_clock[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static time_point from_time_t(time_t t) noexcept;
```
* time_point[link /reference/chrono/time_point.md]
* time_t[link /reference/ctime/time_t.md]

## 概要
[`time_t`](/reference/ctime/time_t.md)から`system_clock`の`time_point`に変換する。


## 戻り値
パラメータtと同じ時間を指す[`time_point`](/reference/chrono/time_point.md)を返す。

[`time_t`](/reference/ctime/time_t.md)の分解能が[`time_point`](/reference/chrono/time_point.md)よりも高い場合は、[`time_point`](/reference/chrono/time_point.md)の分解能に切り捨てられる。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <chrono>
#include <ctime>

using std::chrono::system_clock;

int main()
{
  std::time_t t;
  std::time(&t);

  system_clock::time_point p = system_clock::from_time_t(t);

  std::time_t t2 = system_clock::to_time_t(p);
  std::cout << std::ctime(&t2) << std::endl;
}
```
* system_clock::from_time_t(t)[color ff0000]
* to_time_t[link to_time_t.md]
* std::time_t[link /reference/ctime/time_t.md]
* std::time[link /reference/ctime/time.md.nolink]
* std::ctime[link /reference/ctime/ctime.md.nolink]

### 出力例
```
Tue Sep 27 14:21:13 2011
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
