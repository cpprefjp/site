#min
* chrono[meta header]
* std::chrono[meta namespace]
* time_point[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static constexpr time_point min();
```

##概要
最小の`time_point`を取得する


##戻り値
```cpp
time_point(duration::min())
```
* min()[link /reference/chrono/duration/min.md]


##例
```cpp
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  time_point<system_clock> p = time_point<system_clock>::min();

  std::cout << p.time_since_epoch().count() << std::endl;
}
```
* min[color ff0000]

###出力例
```
-9223372036854775808
```

##バージョン
###言語
- C++11

###処理系
- GCC: 4.5.0
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0
