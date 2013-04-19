#operator+=
```cpp
time_point& operator+=(const duration& d);
```

##概要

<b>time_pointの時間を進める</b>




##効果

d_ += d;※ d_はtime_point内部で保持しているduration。変数名は説明用。




##戻り値

*this


##例

```cpp
#include <iostream>#include <chrono>using namespace std::chrono;int main(){  system_clock::time_point p = system_clock::now();  p += seconds(3);  std::cout << p.time_since_epoch().count() << std::endl;}
```

###出力例

```cpp
1314361514726936
```

##バージョン


###言語


- C++11



###処理系


- GCC: 4.5.0

