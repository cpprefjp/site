#min (C++11)
* random[meta header]
* std[meta namespace]
* shuffle_order_engine[meta class]
* function[meta id-type]

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
  std::uint32_t min_value = std::knuth_b::min();
  std::cout << min_value << std::endl;
}
```
* knuth_b[link /reference/random/knuth_b.md]

###出力
```
1
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


