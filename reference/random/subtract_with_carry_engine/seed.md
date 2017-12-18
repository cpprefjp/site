# seed
* random[meta header]
* std[meta namespace]
* subtract_with_carry_engine[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void seed(result_type value = default_seed); // (1)
template<class Sseq> void seed(Sseq& q);     // (2)
```

## 概要
- (1) : シード値を受け取って再初期化する
- (2) : シードのシーケンスを受け取って再初期化する


## 効果
パラメータ`value`および`q`を`arg`とした場合、

```cpp
*this = subtract_with_carry_engine(arg);
```
* subtract_with_carry_engine[link op_constructor.md]

と同じ効果を持つ。


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <random>
#include <array>

int main()
{
  // (1) デフォルトのシード値から再初期化
  {
    std::ranlux24_base engine;

    engine.seed();

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // (1) シード値を指定して再初期化
  {
    std::ranlux24_base engine;

    std::uint32_t seed = std::random_device()();
    engine.seed(seed);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // (2) シードのシーケンスを指定して再初期化
  {
    std::ranlux24_base engine;

    // シードのシーケンスを作る
    std::random_device seed_gen;
    std::array<std::uint32_t, 100> seeds;

    for (std::uint32_t& x : seeds) {
      x = seed_gen();
    }

    std::seed_seq seq(seeds.begin(), seeds.end());

    // シードのシーケンスを指定してエンジンを再初期化
    engine.seed(seq);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }
}
```
* seed()[color ff0000]
* seed(seed)[color ff0000]
* seed(seq)[color ff0000]
* std::ranlux24_base[link /reference/random/ranlux24_base.md]
* std::seed_seq[link /reference/random/seed_seq.md]
* std::random_device[link /reference/random/random_device.md]
* seed_gen()[link /reference/random/random_device/op_call.md]
* std::uint32_t[link /reference/cstdint/uint32_t.md]
* seeds.begin()[link /reference/array/begin.md]
* seeds.end()[link /reference/array/end.md]

### 出力例
```
15039276
13643873
1408763
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015, 2017


## 参照


