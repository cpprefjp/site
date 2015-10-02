#seconds
* chrono[meta header]
* std::chrono[meta namespace]
* typedef[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  typedef duration<最低でも35ビットを持つ符号付き整数型> seconds;
}}
```
* duration[link /reference/chrono/duration.md]

##概要
秒単位を表現する`duration`の別名

##例
```cpp
#include <iostream>
#include <chrono>

int main()
{
  std::chrono::seconds ns1(30);
  std::chrono::seconds ns2(20);

  std::chrono::seconds result = ns1 + ns2;

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
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0
