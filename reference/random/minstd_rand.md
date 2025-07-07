# minstd_rand
* random[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  using minstd_rand = linear_congruential_engine<uint_fast32_t, 48271, 0, 2147483647>;
}
```
* linear_congruential_engine[link linear_congruential_engine.md]
* uint_fast32_t[link /reference/cstdint/uint_fast32_t.md]

## 概要
最小標準MINSTD乱数生成器。  

これは線形合同法に、より良いパラメータを設定したものである。

オリジナルのMINSTDパラメータは、[`std::minstd_rand0`](minstd_rand0.md)の方で、1988年にStephen K. ParkとKeith W. Millerによって考案された。この`minstd_rand`はパラメータ改良版で、1993年にStephen K. Park、Keith W. Miller、Paul K. Stockmeyerによって推奨された。


## 備考
C言語標準ライブラリの`rand()`関数は、実装によっては問題のある[線形合同法](linear_congruential_engine.md)のパラメータが設定されていた。たとえば、実装によっては以下のような問題が発生していた。

- 生成される値の最下位ビットは、`0`と`1`が交互に生成されていた。これにより、生成される値は偶数と奇数が交互になっていた。
- 生成される値の最大値が非常に小さく、`RAND_MAX`の値が`32767`となっていた。

MINSTDでは、このような問題は発生しない。

ただし、「[Visual Studioのrand()を使うと危ない場合](http://web.archive.org/web/20121114001645/http://www32.ocn.ne.jp/~yss/rand.html)」という記事で指摘されているように、次元が増えていくと標準偏差から離れていき、乱雑さが低くなっていくことに注意。2次元座標や3次元座標を乱数から作るような状況で問題になりえる。


## 要件
`minstd_rand`型オブジェクトをデフォルト構築した場合、10000番目に生成される擬似乱数の値は`399268537`であること。


## 乱数列の周期
2<sup>31</sup> - 2


## サイズ
```cpp
sizeof(uint_fast32_t)
```
* uint_fast32_t[link /reference/cstdint/uint_fast32_t.md]


## パフォーマンス
整数に対して、乗算、加算、剰余算を一回ずつ行う


## 次元
次に生成される乱数は現在の乱数に相関関係があるため、2次元以上では一様分布しない。

このトレードオフは、各出力の間(現在の状態と次の状態)の相関関係が、無視できるほどしかないということを意味する。たとえばN次元のランダムなベクトルを生成する場合、各次元の値に相関関係がほぼない状態にできる。`minstd_rand`の場合は1次元のみであるため、2次元以上のランダムな値を生成することには不向きである。


## シード、および生成される値の型
[`uint_fast32_t`](/reference/cstdint/uint_fast32_t.md)


## 予測可能性
生成された値がひとつわかれば、次の値を予測できる。

生成された値をX<sub>n</sub>として、[`linear_congruential_engine`](linear_congruential_engine.md)の計算式に当てはめればよい。


## 例
```cpp example
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
* std::minstd_rand[color ff0000]
* engine()[link linear_congruential_engine/op_call.md]

### 出力例
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

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [Lehmer random number generator - Wikipedia](https://en.wikipedia.org/wiki/Lehmer_random_number_generator)
- [MINSTD - Classical LSGs](https://web.archive.org/web/20181030204012/http://random.mat.sbg.ac.at/results/karl/server/node4.html#SECTION00042000000000000000)
- "Random Number Generators: Good ones are hard to find", Stephen K. Park and Keith W. Miller, Communications of the ACM, Vol. 31, No. 10, October 1988, pp. 1192-1201

