#now
```cpp
static time_point now() noexcept;
```
* time_point[link /reference/chrono/time_point.md]

##概要
<b>現在日時を取得する</b>
<b></b>

##戻り値
現在日時を指す[time_point](/reference/chrono/time_point.md)。

##例外
投げない

##例
```cpp
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  high_resolution_clock::time_point p = high_resolution_clock::now();

  seconds d = duration_cast<seconds>(p.time_since_epoch());
  std::cout << d.count() << std::endl;
}
```
* high_resolution_clock::now()[color ff0000]

###出力
```cpp
1317184255
```

##バージョン

###言語

- C++11

###<span style='font-size:13px;font-weight:normal'><h3>処理系

- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
</span></h3>

