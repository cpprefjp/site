# コンストラクタ
* random[meta header]
* std[meta namespace]
* subtract_with_carry_engine[meta class]
* function[meta id-type]
* cpp11[meta cpp]
* [mathjax enable]

```cpp
explicit subtract_with_carry_engine(result_type value = default_seed);     // (1)
template<class Sseq> explicit subtract_with_carry_engine(Sseq& q);         // (2)

subtract_with_carry_engine(const subtract_with_carry_engine& e) = default; // (3)
subtract_with_carry_engine(subtract_with_carry_engine&& e) = default;      // (4)
```

## 概要
- (1) : シード値を受け取って状態シーケンスを構築する
    - シード値が指定されない場合はデフォルトのシード値 (`subtract_with_carry_engine::default_seed`) で構築される
    - [`linear_congruential_engine`](../linear_congruential_engine.md) を $n = \lceil 32 / \mathtt{w} \rceil$ 回 (`w` は `subtract_with_carry_engine::word_size`) 呼び出して内部状態を初期化する
- (2) : シードのシーケンスを受け取って状態シーケンスを構築する
- (3) : コピーコンストラクタ。状態シーケンスをコピーする
- (4) : ムーブコンストラクタ。可能であれば状態シーケンスを移動する


## 計算量
- (1) : �確に $n \times \mathtt{r}$ 回 (`r` は `subtract_with_carry_engine::long_lag`) [`linear_congruential_engine` を呼ぶ](../linear_congruential_engine/op_call.md)


## 例
```cpp example
#include <iostream>
#include <random>
#include <array>
#include <cstdint>

int main()
{
  // (1) デフォルト構築
  // デフォルトのシード値(default_seed静的データメンバ)から構築する
  {
    std::ranlux24_base engine;

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // (1) シード値を指定して構築
  {
    std::uint32_t seed = std::random_device()();
    std::ranlux24_base engine(seed);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // (2) シードのシーケンスを指定して構築
  {
    // シードのシーケンスを作る
    std::random_device seed_gen;
    std::array<std::uint32_t, 100> seeds;

    for (std::uint32_t& x : seeds) {
      x = seed_gen();
    }

    std::seed_seq seq(seeds.begin(), seeds.end());

    // シードのシーケンスを指定してエンジンを初期化
    std::ranlux24_base engine(seq);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }
}
```
* std::ranlux24_base[link /reference/random/ranlux24_base.md]
* std::uint32_t[link /reference/cstdint/uint32_t.md]
* std::seed_seq[link /reference/random/seed_seq.md]
* seeds.begin()[link /reference/array/array/begin.md]
* seeds.end()[link /reference/array/array/end.md]

### 出力例
```
15039276
7573519
3112173
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015, 2017


## 参照


