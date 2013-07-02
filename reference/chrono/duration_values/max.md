#max(C++11)
```cpp
static constexpr Rep max()
```

##概要
`Rep`の最大値を取得する。


##戻り値
[`numeric_limits`](/reference/limits/numeric_limits.md)`<Rep>::`[`max`](/reference/limits/numeric_limits/max.md)`()`
※戻り値は0より大きくなければならない。


##例
```cpp
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  std::cout << duration_values<seconds::rep>::max() << std::endl;
  std::cout << duration_values<duration<int, std::nano>::rep>::max() << std::endl;
  std::cout << duration_values<duration<double, std::nano>::rep>::max() << std::endl;
}
```
* max[color ff0000]


###出力例
```
9223372036854775807
2147483647
1.79769e+308
```


##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1

