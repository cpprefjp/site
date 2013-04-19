#to_time_t
```cpp
static time_t to_time_t(const time_point& t) noexcept;
```
* time_point[link /reference/chrono/time_point.md]

##概要

<b>system_clockのtime_pointからtime_t型に変換する。</b>


##戻り値

パラメータ`t`と同じ時間を指す`time_t`を返す。

[`time_point`](/reference/chrono/time_point.md)の精度が`time_t`よりも高い場合は、`time_t`の精度に切り捨てられる。


##例外

投げない


##例

```cpp
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  system_clock::time_point p = system_clock::now();

  std::time_t t = system_clock::to_time_t(p);
  std::cout << std::ctime(&t) << std::endl;
}
```
* system_clock::to_time_t(p)[color ff0000]

###出力

```cpp
Tue Sep 27 14:21:13 2011
```

##バージョン


###言語


- C++11



###処理系

- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1<h4></h4>

