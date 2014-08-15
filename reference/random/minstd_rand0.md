#minstd_rand0 (C++11)
```cpp
namespace std {
  typedef
    linear_congruential_engine<uint_fast32_t, 16807, 0, 2147483647>
  minstd_rand0;
}
```
* linear_congruential_engine[link ./linear_congruential_engine.md]
* uint_fast32_t[link /reference/cstdint/uint_fast32_t.md]

##概要
パラメータ設定済みの[`linear_congruential_engine`](./linear_congruential_engine.md)。  
"最小標準"MINSTD乱数生成器。  
  
`minstd_rand0`は、オリジナルのMINSTDパラメータであり、1988年にStephen K. ParkとKeith W. Millerによって考案された。  
1993年にStephen K. Park、Keith W. Miller、Paul K. Stockmeyerによって推奨された、パラメータ改良版である[`minstd_rand`](./minstd_rand.md)もまた定義されている。


##要件
`minstd_rand0`型オブジェクトをデフォルト構築した場合、10000番目に生成される擬似乱数の値は`1043618065`であること。


##乱数列の周期
2<sup>31</sup> - 2


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::minstd_rand0 engine(seed_gen());

  for (int i = 0; i < 10; ++i) {
    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }
}
```

###出力例
```
888393797
1928232235
123456768
468696774
416663422
2065444334
1997251430
487897753
1004970425
579049320
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
- A pseudo-random number generator for the System/360, P.A. Lewis, A.S. Goodman, J.M. Miller, IBM Systems Journal, Vol. 8, No. 2, 1969, pp. 136-146

