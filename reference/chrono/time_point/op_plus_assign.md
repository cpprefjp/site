# operator+=
* chrono[meta header]
* std::chrono[meta namespace]
* time_point[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
time_point& operator+=(const duration& d);           // C++11
constexpr time_point& operator+=(const duration& d); // C++17
```

## 概要
`time_point`の時間を進める


## 効果
```cpp
d_ += d;
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
  p += seconds(3);

  std::cout << p.time_since_epoch().count() << std::endl;
}
```
* system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]
* time_since_epoch()[link time_since_epoch.md]
* count()[link /reference/chrono/duration/count.md]

### 出力例
```
1314361514726936
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.5.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 参照
- [P0505R0 Wording for GB 50](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0505r0.html)
