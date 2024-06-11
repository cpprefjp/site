# now
* chrono[meta header]
* std::chrono[meta namespace]
* system_clock[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static time_point now() noexcept;
```
* time_point[link /reference/chrono/time_point.md]

## 概要
現在日時を取得する


## 戻り値
現在日時を指す[`time_point`](/reference/chrono/time_point.md)。


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
* system_clock::now()[color ff0000]
* to_time_t[link to_time_t.md]
* std::time_t[link /reference/ctime/time_t.md]
* std::ctime[link /reference/ctime/ctime.md.nolink]

### 出力例
```
Fri Dec 20 16:32:56 2019
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
