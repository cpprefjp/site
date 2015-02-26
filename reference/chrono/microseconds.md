#microseconds (C++11)
* chrono[meta header]
* std::chrono[meta namespace]
* typedef[meta id-type]

```cpp
namespace std {
namespace chrono {
  typedef duration<最低でも55ビットを持つ符号付き整数型, nano> nanoseconds;
}}
```
* duration[link /reference/chrono/duration.md]

##概要
マイクロ秒単位を表現する`duration`の別名


##例
```cpp
#include <iostream>
#include <chrono>

int main()
{
  std::chrono::microseconds ns1(30);
  std::chrono::microseconds ns2(20);

  std::chrono::microseconds result = ns1 + ns2;

  std::cout << result.count() << std::endl;
}
```

###出力
```
50
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1

