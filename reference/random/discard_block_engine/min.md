#min (C++11)
* random[meta header]

```cpp
static constexpr result_type min() { return Engine::min(); }
```

##概要
生成する値の最小値を取得する。


##戻り値
元となる乱数生成器の最小値を返す。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::uint32_t min_value = std::ranlux24::min();
  std::cout << min_value << std::endl;
}
```
* ranlux24[link /reference/random/ranlux24.md]

###出力
```
0
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


