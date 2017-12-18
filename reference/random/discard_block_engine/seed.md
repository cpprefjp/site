# seed
* random[meta header]
* std[meta namespace]
* discard_block_engine[meta class]
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
*this = discard_block_engine(arg);
```
* discard_block_engine[link op_constructor.md]

と同じ効果を持つ。

指定されたシード値もしくはシードのシーケンスで、エンジンの再初期化を行う。


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
    std::ranlux24 engine;

    engine.seed();

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // (2) シード値を指定して再初期化
  {
    std::ranlux24 engine;

    std::uint32_t seed = std::random_device()();
    engine.seed(seed);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // (3) シードのシーケンスを指定して再初期化
  {
    std::ranlux24 engine;

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
* std::ranlux24[link /reference/random/ranlux24.md]
* std::seed_seq[link /reference/random/seed_seq.md]
* std::random_device[link /reference/random/random_device.md]
* seeds.begin()[link /reference/array/begin.md]
* seeds.end()[link /reference/array/end.md]
* std::uint32_t[link /reference/cstdint/uint32_t.md]

### 出力
```
15039276
9516009
2488183
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


