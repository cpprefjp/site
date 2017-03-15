# コンストラクタ
* random[meta header]
* std[meta namespace]
* shuffle_order_engine[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
shuffle_order_engine();                                        // (1)
explicit shuffle_order_engine(const Engine& e);                // (2)
explicit shuffle_order_engine(Engine&& e);                     // (3)
explicit shuffle_order_engine(result_type s);                  // (4)
template<class Sseq> explicit shuffle_order_engine(Sseq& q);   // (5)

shuffle_order_engine(const shuffle_order_engine& e) = default; // (6)
shuffle_order_engine(shuffle_order_engine&& e) = default;      // (7)
```

## 概要
- (1) : デフォルトコンストラクタ。元となる乱数生成器を、デフォルト構築する(デフォルトシードで初期化)
- (2) : 元となる乱数生成器のコピーを作るコンストラクタ
- (3) : 元となる乱数生成器オブジェクトを受け取り、移動して保持するコンストラクタ
- (4) : 受け取ったシードで、元となる乱数生成器を初期化するコンストラクタ
- (5) : 受け取ったシードのシーケンスで、元となる乱数生成器を初期化するコンストラクタ
- (6) : コピーコンストラクタ
- (7) : ムーブコンストラクタ。可能であれば、元となる乱数生成器を移動する


## 例
```cpp
#include <iostream>
#include <random>
#include <array>

int main()
{
  // (1) デフォルト構築
  // 元となる乱数生成器を、デフォルトのシード値で初期化する
  {
    std::knuth_b engine;

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // (2) 元となる乱数生成器のコピーから構築する
  {
    std::minstd_rand0 base_engine;
    std::knuth_b engine(base_engine);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // (3) 元となる乱数生成器をムーブして構築する
  {
    std::minstd_rand0 base_engine;
    std::knuth_b engine(std::move(base_engine));

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // (4) シード値を指定して構築
  {
    std::uint32_t seed = std::random_device()();
    std::knuth_b engine(seed);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // (5) シードのシーケンスを指定して構築
  {
    // シードのシーケンスを作る
    std::random_device seed_gen;
    std::array<std::uint32_t, 100> seeds;

    for (std::uint32_t& x : seeds) {
      x = seed_gen();
    }

    std::seed_seq seq(seeds.begin(), seeds.end());

    // シードのシーケンスを指定してエンジンを初期化
    std::knuth_b engine(seq);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }
}
```
* std::knuth_b[link /reference/random/knuth_b.md]
* std::minstd_rand0[link /reference/random/minstd_rand0.md]
* std::seed_seq[link /reference/random/seed_seq.md]
* seeds.begin()[link /reference/array/begin.md]
* seeds.end()[link /reference/array/end.md]
* std::random_device[link /reference/random/random_device.md]
* seed_gen()[link /reference/random/random_device/op_call.md]
* std::move[link /reference/utility/move.md]
* std::uint32_t[link /reference/cstdint/uint32_t.md]

### 出力例
```
152607844
152607844
152607844
988019904
237561954
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


## 参照


