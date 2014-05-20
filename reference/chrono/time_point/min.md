#min (C++11)
```cpp
static constexpr time_point min();
```

##概要
最小のtime_pointを取得する


##戻り値
`time_point(duration::min())`


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

