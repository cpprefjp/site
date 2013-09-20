#min(C++11)
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
* uint64_t[link /reference/random/uint64_t.md]

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


