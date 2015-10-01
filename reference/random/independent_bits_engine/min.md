#min
* random[meta header]
* std[meta namespace]
* independent_bits_engine[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static constexpr result_type min() { return 0; }
```

##概要
生成する値の最小値を取得する。


##戻り値
最小値である`0`を返す。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  typedef
	std::independent_bits_engine<std::mt19937, 64, std::uint64_t>
  engine_type;

  std::uint64_t min_value = engine_type::min();
  std::cout << min_value << std::endl;
}
```
* mt19937[link /reference/random/mt19937.md]
* uint64_t[link /reference/cstdint/uint64_t.md]

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
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


