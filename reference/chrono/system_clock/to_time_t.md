# to_time_t
* chrono[meta header]
* std::chrono[meta namespace]
* system_clock[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static time_t to_time_t(const time_point& t) noexcept;
```
* time_point[link /reference/chrono/time_point.md]
* time_t[link /reference/ctime/time_t.md]

## 概要
`system_clock`の`time_point`から[`time_t`](/reference/ctime/time_t.md)型に変換する。


## 戻り値
パラメータ`t`と同じ時間を指す[`time_t`](/reference/ctime/time_t.md)を返す。

[`time_point`](/reference/chrono/time_point.md)の分解能が[`time_t`](/reference/ctime/time_t.md)よりも高い場合は、[`time_t`](/reference/ctime/time_t.md)の分解能に切り捨てられる。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <chrono>
#include <ctime>

using namespace std::chrono;

int main()
{
  system_clock::time_point p = system_clock::now();

  std::time_t t = system_clock::to_time_t(p);
  std::cout << std::ctime(&t) << std::endl;
}
```
* system_clock::to_time_t(p)[color ff0000]
* now()[link now.md]
* std::time_t[link /reference/ctime/time_t.md]
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
