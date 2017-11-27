# operator-=
* chrono[meta header]
* std::chrono[meta namespace]
* time_point[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
time_point& operator-=(const duration& d);
```

## 概要
`time_point`の時間を戻す


## 効果
```cpp
d_ -= d
```

※ `d_`は`time_point`内部で保持している`duration`。変数名は説明用。


## 戻り値
`*this`


## 例
```cpp example
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  system_clock::time_point p = system_clock::now();

  p -= seconds(3);

  std::cout << p.time_since_epoch().count() << std::endl;
}
```
* system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]
* seconds[link /reference/chrono/seconds.md]
* time_since_epoch()[link time_since_epoch.md]
* count()[link /reference/chrono/duration/count.md]

### 出力例
```
1314362390421481
```

## バージョン
### 言語
- C++11

### 処理系
- GCC: 4.5.0
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0
