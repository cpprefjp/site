#hours
```cpp
namespace std {
namespace chrono {
  typedef duration<最低でも23ビットを持つ符号付き整数型, ratio<3600>> hours;
}}
```
* duration[link /reference/chrono/duration.md]

##概要
時単位を表現する`duration`の別名

##例
```cpp
#include <iostream>
#include <chrono>

int main()
{
  std::chrono::hours ns1(30);
  std::chrono::hours ns2(20);

  std::chrono::hours result = ns1 + ns2;

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
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1<li/>

