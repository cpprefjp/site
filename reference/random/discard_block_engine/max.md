#max (C++11)
```cpp
static constexpr result_type max() { return Engine::max(); }
```

##概要
生成する値の最大値を取得する。


##戻り値
元となる乱数生成器の最大値を返す。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::uint32_t max_value = std::ranlux24::max();
  std::cout << max_value << std::endl;
}
```
* ranlux24[link /reference/random/ranlux24.md]

###出力
```
16777215
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


