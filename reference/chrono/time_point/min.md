# min
* chrono[meta header]
* std::chrono[meta namespace]
* time_point[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static constexpr time_point min();
```

## 概要
最小の`time_point`を取得する


## 戻り値
```cpp
time_point(duration::min())
```
* min()[link /reference/chrono/duration/min.md]


## 例
```cpp example
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  time_point<system_clock> p = time_point<system_clock>::min();

  std::cout << p.time_since_epoch().count() << std::endl;
}
```
* min()[color ff0000]
* system_clock[link /reference/chrono/system_clock.md]
* time_since_epoch()[link time_since_epoch.md]
* count()[link /reference/chrono/duration/count.md]

### 出力例
```
-9223372036854775808
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.5.0
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
