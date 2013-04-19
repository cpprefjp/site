#min
```cpp
static constexpr time_point min();
```

##概要

<b>最小のtime_pointを取得する</b>


##戻り値

<code style='color:rgb(0,0,0)'>time_point(duration::min())</code>


##例

```cpp
#include <iostream>#include <chrono>using namespace std::chrono;int main(){  time_point<system_clock> p = time_point<system_clock>::min();  std::cout << p.time_since_epoch().count() << std::endl;}
```

###出力例

```cpp
-9223372036854775808
```

##バージョン


###言語


- C++11



###処理系


- GCC: 4.5.0

