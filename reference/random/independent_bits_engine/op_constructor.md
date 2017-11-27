# コンストラクタ
* random[meta header]
* std[meta namespace]
* independent_bits_engine[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
independent_bits_engine();                                           // (1)
explicit independent_bits_engine(const Engine& e);                   // (2)
explicit independent_bits_engine(Engine&& e);                        // (3)
explicit independent_bits_engine(result_type s);                     // (4)
template<class Sseq> explicit independent_bits_engine(Sseq& q);      // (5)

independent_bits_engine(const independent_bits_engine& e) = default; // (6)
independent_bits_engine(independent_bits_engine&& e) = default;      // (7)
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
```cpp example
#include <iostream>
#include <random>
#include <cstdint>
#include <array>

int main()
{
  using engine_type = std::independent_bits_engine<std::mt19937, 64, std::uint64_t>;

  // (1) デフォルト構築
  // 元となる乱数生成器を、デフォルトのシード値で初期化する
  {
    engine_type engine;

    std::uint64_t result = engine();
    std::cout << result << std::endl;
  }

  // (2) 元となる乱数生成器のコピーから構築する
  {
    std::mt19937 base_engine;
    engine_type engine(base_engine);

    std::uint64_t result = engine();
    std::cout << result << std::endl;
  }

  // (3) 元となる乱数生成器をムーブして構築する
  {
    std::mt19937 base_engine;
    engine_type engine(std::move(base_engine));

    std::uint64_t result = engine();
    std::cout << result << std::endl;
  }

  // (4) シード値を指定して構築
  {
    std::uint32_t seed = std::random_device()();
    engine_type engine(seed);

    std::uint64_t result = engine();
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
    engine_type engine(seq);

    std::uint64_t result = engine();
    std::cout << result << std::endl;
  }
}
```
* std::mt19937[link /reference/random/mt19937.md]
* std::uint64_t[link /reference/cstdint/uint64_t.md]
* std::seed_seq[link /reference/random/seed_seq.md]
* std::random_device[link /reference/random/random_device.md]
* std::uint32_t[link /reference/cstdint/uint32_t.md]
* std::move[link /reference/utility/move.md]
* seeds.begin()[link /reference/array/begin.md]
* seeds.end()[link /reference/array/end.md]

### 出力例
```
15028999435905310454
15028999435905310454
15028999435905310454
2520499339942957212
17594030327480736798
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


