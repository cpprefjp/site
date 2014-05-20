#from_time_t (C++11)
```cpp
static time_point from_time_t(time_t t) noexcept;
```
* time_point[link /reference/chrono/time_point.md]

##概要
`time_t`から`system_clock`の`time_point`に変換する。


##戻り値
パラメータtと同じ時間を指す[`time_point`](/reference/chrono/time_point.md)を返す。
`time_t`精度が[`time_point`](/reference/chrono/time_point.md)よりも高い場合は、[`time_point`](/reference/chrono/time_point.md)の精度に切り捨てられる。


##例外
投げない


##例
```cpp
#include <iostream>
#include <chrono>

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

###出力例
```
Tue Sep 27 14:21:13 2011
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1

