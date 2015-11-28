#minstd_rand0
* random[meta header]
* std[meta namespace]
* typedef[meta id-type]
* cpp11[meta cpp]

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
最小標準MINSTD乱数生成器。

これは線形合同法に、より良いパラメータを設定したものである。
 
`minstd_rand0`は、オリジナルのMINSTDパラメータであり、1988年にStephen K. ParkとKeith W. Millerによって考案された。

1993年にStephen K. Park、Keith W. Miller、Paul K. Stockmeyerによって推奨された、パラメータ改良版である[`minstd_rand`](minstd_rand.md)もまた定義されている。


##備考
C言語標準ライブラリの`rand()`関数は、実装によっては問題のある[線形合同法](linear_congruential_engine.md)のパラメータが設定されていた。たとえば、実装によっては以下のような問題が発生していた。

- 生成される値の最下位ビットは、`0`と`1`が交互に生成されていた。これにより、生成される値は偶数と奇数が交互になっていた。
- 生成される値の最大値が非常に小さく、`RAND_MAX`の値が`32767`となっていた。

MINSTDでは、このような問題は発生しない。

ただし、「[Visual Studioのrand()を使うと危ない場合](http://www32.ocn.ne.jp/~yss/rand.html)」という記事で指摘されているように、次元が増えていくと標準偏差から離れていき、乱雑さが低くなっていくことに注意。2次元座標や3次元座標を乱数から作るような状況で問題になりえる。


##要件
`minstd_rand0`型オブジェクトをデフォルト構築した場合、10000番目に生成される擬似乱数の値は`1043618065`であること。


##乱数列の周期
2<sup>31</sup> - 2


##サイズ
```cpp
sizeof(uint_fast32_t)
```
* uint_fast32_t[link /reference/cstdint/uint_fast32_t.md]


##次元
次に生成される乱数は現在の乱数に相関関係があるため、2次元以上では一様分布しない。

このトレードオフは、各出力の間(現在の状態と次の状態)の相関関係が、無視できるほどしかないということを意味する。たとえばN次元のランダムなベクトルを生成する場合、各次元の値に相関関係がほぼない状態にできる。`minstd_rand0`の場合は1次元のみであるため、2次元以上のランダムな値を生成することには不向きである。


##シード、および生成される値の型
[`uint_fast32_t`](/reference/cstdint/uint_fast32_t.md)


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
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
- [Lehmer random number generator - Wikipedia](http://en.wikipedia.org/wiki/Lehmer_random_number_generator)
- [Stephen K. Park and Keith W. Miller (1988). "Random Number Generators: Good Ones Are Hard To Find". Communications of the ACM 31 (10): 1192–1201. doi:10.1145/63039.63042.](http://www.firstpr.com.au/dsp/rand31/p1192-park.pdf)
- [MINSTD - Classical LSGs](http://random.mat.sbg.ac.at/results/karl/server/node4.html#SECTION00042000000000000000)
- A pseudo-random number generator for the System/360, P.A. Lewis, A.S. Goodman, J.M. Miller, IBM Systems Journal, Vol. 8, No. 2, 1969, pp. 136-146

