#now (C++11)
* chrono[meta header]
* std::chrono[meta namespace]
* steady_clock[meta class]
* function[meta id-type]

```cpp
static time_point now() noexcept;
```
* time_point[link /reference/chrono/time_point.md]

##概要
現在日時を取得する


##戻り値
現在日時を指す[`time_point`](/reference/chrono/time_point.md)。


##例外
投げない


##例
```cpp
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  steady_clock::time_point p1 = steady_clock::now();
  steady_clock::time_point p2 = p1 + seconds(3);

  seconds diff = duration_cast<seconds>(p2 - p1);
  std::cout << diff.count() << std::endl;
}
```
* steady_clock::now()[color ff0000]


###出力
```
3
```


##バージョン
###言語
- C++11

###処理系


