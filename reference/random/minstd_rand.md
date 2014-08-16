#minstd_rand (C++11)
```cpp
namespace std {
  typedef
    linear_congruential_engine<uint_fast32_t, 48271, 0, 2147483647>
  minstd_rand;
}
```
* linear_congruential_engine[link ./linear_congruential_engine.md]
* uint_fast32_t[link /reference/cstdint/uint_fast32_t.md]

##概要
パラメータ設定済みの[`linear_congruential_engine`](./linear_congruential_engine.md)。  
"最小標準"MINSTD乱数生成器。  
  
オリジナルのMINSTDパラメータは、[`std::minstd_rand0`](./minstd_rand0.md)の方で、1988年にStephen K. ParkとKeith W. Millerによって考案された。この`minstd_rand`はパラメータ改良版で、1993年にStephen K. Park、Keith W. Miller、Paul K. Stockmeyerによって推奨された。


##要件
`minstd_rand`型オブジェクトをデフォルト構築した場合、10000番目に生成される擬似乱数の値は`399268537`であること。


##乱数列の周期
2<sup>31</sup> - 2


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::minstd_rand engine(seed_gen());

  for (int i = 0; i < 10; ++i) {
    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }
}
```

###出力例
```
634377512
1067559179
1131536097
1279860489
1336107623
2022183129
1080129221
162161378
113984123
274497719
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
- [Lehmer random number generator - Wikipedia](http://en.wikipedia.org/wiki/Lehmer_random_number_generator)
- [MINSTD - Classical LSGs](http://random.mat.sbg.ac.at/results/karl/server/node4.html#SECTION00042000000000000000)
- "Random Number Generators: Good ones are hard to find", Stephen K. Park and Keith W. Miller, Communications of the ACM, Vol. 31, No. 10, October 1988, pp. 1192-1201

