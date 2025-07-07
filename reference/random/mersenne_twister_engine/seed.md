# seed
* random[meta header]
* std[meta namespace]
* mersenne_twister_engine[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void seed(result_type value = default_seed); // (1)
template<class Sseq> void seed(Sseq& q);     // (2)
```

## 概要
- (1) : シード値を指定して再初期化する
- (2) : シードのシーケンスを指定して再初期化する


## 効果
パラメータ`value`および`q`を`arg`とした場合、

```cpp
*this = mersenne_twister_engine(arg);
```
* mersenne_twister_engine[link op_constructor.md]

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
    std::mt19937 engine;

    engine.seed();

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // (1) シード値を指定して再初期化
  {
    std::mt19937 engine;

    std::uint32_t seed = std::random_device()();
    engine.seed(seed);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // (2) シードのシーケンスを指定して再初期化
  {
    std::mt19937 engine;

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
* engine()[link op_call.md]
* std::seed_seq[link /reference/random/seed_seq.md]
* seeds.begin()[link /reference/array/array/begin.md]
* seeds.end()[link /reference/array/array/end.md]

### 出力例
```
3499211612
3035471323
3117047722
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


