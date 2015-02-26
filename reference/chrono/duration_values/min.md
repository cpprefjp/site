#min (C++11)
* chrono[meta header]
* std::chrono[meta namespace]

```cpp
static constexpr Rep min();
```

##概要
`Rep`の最小値を取得する。


##戻り値
[`numeric_limits`](/reference/limits/numeric_limits.md)`<Rep>::`[`lowest`](/reference/limits/numeric_limits/lowest.md)`()`
※戻り値の値は0より小さくなければならない。


##例
```cpp
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  std::cout << duration_values<seconds::rep>::min() << std::endl;
  std::cout << duration_values<duration<int, std::nano>::rep>::min() << std::endl;
  std::cout << duration_values<duration<double, std::nano>::rep>::min() << std::endl;
}
```
* min[color ff0000]


###出力例
```
-9223372036854775808
-2147483648
2.22507e-308
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1

