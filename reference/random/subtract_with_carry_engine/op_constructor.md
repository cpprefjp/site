# コンストラクタ
* random[meta header]
* std[meta namespace]
* subtract_with_carry_engine[meta class]
* function[meta id-type]
* cpp11[meta cpp]
* [mathjax enable]

```cpp
explicit subtract_with_carry_engine(result_type value = default_seed);     // (1)
subtract_with_carry_engine() : subtract_with_carry_engine(default_seed) {} // (1) C++20
subtract_with_carry_engine() : subtract_with_carry_engine(0u) {}           // (1) C++26

explicit subtract_with_carry_engine(result_type value);                    // (2) C++20

template<class Sseq>
explicit subtract_with_carry_engine(Sseq& q);         // (3)

subtract_with_carry_engine(const subtract_with_carry_engine& e) = default; // (4)
subtract_with_carry_engine(subtract_with_carry_engine&& e) = default;      // (5)
```

## 概要
- (1) : デフォルトコンストラクタ
    - C++17まで：シード値が指定されない場合はデフォルトのシード値 (`subtract_with_carry_engine::default_seed`) で構築される
        - [`linear_congruential_engine`](../linear_congruential_engine.md) を $n = \lceil \mathtt{w} / 32 \rceil$ 回 (`w` は `subtract_with_carry_engine::word_size`) 呼び出して内部状態を初期化する
    - C++20から : デフォルトのシード値 (`subtract_with_carry_engine::default_seed`) で(2)に委譲
    - C++26から : シード値を`0u`として(2)に委譲
- (2) : シード値を受け取って状態シーケンスを構築する
    - `value == 0`なら、デフォルトのシード値 (`subtract_with_carry_engine::default_seed`) が使用される
    - [`linear_congruential_engine`](../linear_congruential_engine.md) を $n = \lceil \mathtt{w} / 32 \rceil$ 回 (`w` は `subtract_with_carry_engine::word_size`) 呼び出して内部状態を初期化する
- (3) : シードのシーケンスを受け取って状態シーケンスを構築する
- (4) : コピーコンストラクタ。状態シーケンスをコピーする
- (5) : ムーブコンストラクタ。可能であれば状態シーケンスを移動する


## 計算量
- (1), (2) : 正確に $n \times \mathtt{r}$ 回 (`r` は `subtract_with_carry_engine::long_lag`) [`linear_congruential_engine` を呼ぶ](../linear_congruential_engine/op_call.md)


## 例
```cpp example
#include <iostream>
#include <random>
#include <array>
#include <cstdint>

int main()
{
  // (1) デフォルト構築
  // デフォルトのシード値(default_seed静的メンバ変数)から構築する
  {
    std::ranlux24_base engine;

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // (2) シード値を指定して構築
  {
    std::uint32_t seed = std::random_device()();
    std::ranlux24_base engine(seed);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // (3) シードのシーケンスを指定して構築
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
- [GCC](/implementation.md#gcc): 4.7.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified], 2017 [mark verified]


## 参照

- [P0935R0 Eradicating unnecessarily explicit default constructors from the standard library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0935r0.html)
- [LWG Issue 1436. Random number engine constructor concerns](https://cplusplus.github.io/LWG/issue1436)
    - C++11で、シードシーケンスをとるコンストラクタが、`Sseq`がシードシーケンスとして適格でない型である場合にオーバーロード解決に参加しないよう規定された。適格でないと判定する型の範囲は未規定だが、少なくとも`result_type`へ暗黙変換可能な型はシードシーケンスとみなさない。整数のシードを渡したときに、こちらが選ばれてしまわないようにするため
- [LWG Issue 3809. Is `std::subtract_with_carry_engine<uint16_t>` supposed to work?](https://cplusplus.github.io/LWG/issue3809)
- [LWG Issue 4014. LWG 3809 changes behavior of some existing `std::subtract_with_carry_engine` code](https://cplusplus.github.io/LWG/issue4014)
    - C++26で、内部状態の初期化に用いる線形合同法エンジンの呼び出し回数が $\lceil 32 / \mathtt{w} \rceil$ から $\lceil \mathtt{w} / 32 \rceil$ に修正された（LWG 3809が既存コードの生成列を変えてしまった問題の修正）
