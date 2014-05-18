#min (C++11)
```cpp
static constexpr result_type min();
```

##概要
生成する値の最小値を取得する。


##戻り値
[`numeric_limits`](/reference/limits/numeric_limits.md)`<result_type>::`[`min()`](/reference/limits/numeric_limits/min.md)


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  unsigned int min_value = std::random_device::min();
  std::cout << min_value << std::endl;
}
```

###出力
```
0
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


