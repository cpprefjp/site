# コンストラクタ
* random[meta header]
* std[meta namespace]
* linear_congruential_engine[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit linear_congruential_engine(result_type s = default_seed);         // (1)
linear_congruential_engine() : linear_congruential_engine(default_seed) {} // (1) C++20

explicit linear_congruential_engine(result_type s);                        // (2) C++20

template<class Sseq>
explicit linear_congruential_engine(Sseq& q);         // (3)

linear_congruential_engine(const linear_congruential_engine& e) = default; // (4)
linear_congruential_engine(linear_congruential_engine&& e) = default;      // (5)
```

## 概要
- (1) : デフォルトコンストラクタ
    - C++17まで : シード値が指定されない場合はデフォルトのシード値 (`linear_congruential_engine::default_seed`) で構築される
    - C++20 : デフォルトのシード値 (`linear_congruential_engine::default_seed`) で(2)に委譲
- (2) : シード値を受け取って状態シーケンスを構築する
- (3) : シードのシーケンスを受け取って状態シーケンスを構築する
- (4) : コピーコンストラクタ。状態シーケンスをコピーする
- (5) : ムーブコンストラクタ。可能であれば状態シーケンスを移動する


## 計算量
- (1), (2) : O(1)


## 例
```cpp example
#include <iostream>
#include <random>
#include <array>

int main()
{
  // (1) デフォルト構築
  // デフォルトのシード値(default_seed静的メンバ変数)から構築する
  {
    std::minstd_rand engine;

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // (2) シード値を指定して構築
  {
    std::uint32_t seed = std::random_device()();
    std::minstd_rand engine(seed);

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
    std::minstd_rand engine(seq);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }
}
```
* std::minstd_rand[link /reference/random/minstd_rand.md]
* seeds.begin()[link /reference/array/array/begin.md]
* seeds.end()[link /reference/array/array/end.md]

### 出力例
```
48271
1780321255
393384924
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

- [P0935R0 Eradicating unnecessarily explicit default constructors from the standard library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0935r0.html)
