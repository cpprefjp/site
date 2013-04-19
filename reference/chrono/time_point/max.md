#max
```cpp
static constexpr time_point max();
```

##概要

<b>最大のtime_pointを取得</b>


##戻り値

<code style='color:rgb(0,0,0)'>time_point(duration::max())</code>


##例

```cpp
#include <iostream>#include <chrono>using namespace std::chrono;int main(){  time_point<system_clock> p = time_point<system_clock>::max();  std::cout << p.time_since_epoch().count() << std::endl;}
```

###出力例

```cpp
9223372036854775807
```

##バージョン


###言語


- C++11



###処理系


- GCC: 4.5.0

