# seed
* random[meta header]
* std[meta namespace]
* independent_bits_engine[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void seed();                             // (1)
void seed(result_type s);                // (2)
template<class Sseq> void seed(Sseq& q); // (3)
```

## 概要
- (1) : 元となる乱数生成器のデフォルトのシード値で再初帰化する
- (2) : シード値を受け取って再初期化する
- (3) : シードのシーケンスを受け取って再初期化する


## 効果
各オーバーロードが持つパラメータを`arg`とした場合、

```cpp
*this = independent_bits_engine(arg);
```
* independent_bits_engine[link op_constructor.md]

と同じ効果を持つ。


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <random>
#include <cstdint>
#include <array>

int main()
{
  using engine_type = std::independent_bits_engine<std::mt19937, 64, std::uint64_t>;

  // (1) デフォルトのシード値から再初期化
  {
    engine_type engine;

    engine.seed();

    std::uint64_t result = engine();
    std::cout << result << std::endl;
  }

  // (2) シード値を指定して再初期化
  {
    engine_type engine;

    std::uint32_t seed = std::random_device()();
    engine.seed(seed);

    std::uint64_t result = engine();
    std::cout << result << std::endl;
  }

  // (3) シードのシーケンスを指定して再初期化
  {
    engine_type engine;

    // シードのシーケンスを作る
    std::random_device seed_gen;
    std::array<std::uint32_t, 100> seeds;

    for (std::uint32_t& x : seeds) {
      x = seed_gen();
    }

    std::seed_seq seq(seeds.begin(), seeds.end());

    // シードのシーケンスを指定してエンジンを再初期化
    engine.seed(seq);

    std::uint64_t result = engine();
    std::cout << result << std::endl;
  }
}
```
* seed()
* seed(seed)
* seed(seq)
* std::mt19937[link /reference/random/mt19937.md]
* std::uint64_t[link /reference/cstdint/uint64_t.md]
* std::seed_seq[link /reference/random/seed_seq.md]
* std::random_device[link /reference/random/random_device.md]
* std::uint32_t[link /reference/cstdint/uint32_t.md]
* seeds.begin()[link /reference/array/begin.md]
* seeds.end()[link /reference/array/end.md]

### 出力
```
15028999435905310454
7971144115323737315
6194890488462973628
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照


