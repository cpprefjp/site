# コンストラクタ
* random[meta header]
* std[meta namespace]
* linear_congruential_engine[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit linear_congruential_engine(result_type s = default_seed);         // (1)
template<class Sseq> explicit linear_congruential_engine(Sseq& q);         // (2)

linear_congruential_engine(const linear_congruential_engine& e) = default; // (3)
linear_congruential_engine(linear_congruential_engine&& e) = default;      // (4)
```

## `linear_congruential_engine`オブジェクトの構築
- (1) : シード値を受け取って状態シーケンスを構築する
    - シード値が指定されない場合は、固定のシード値でデフォルト構築される
    - ※ シード値には、初期状態の予測不可能性を高めるために、UNIX時間(エポックからの経過時間)や、非決定的な乱数を指定するのがよい
- (2) : シードのシーケンスを受け取って状態シーケンスを構築する
- (3) : コピーコンストラクタ。状態シーケンスをコピーする
- (4) : ムーブコンストラクタ。可能であれば状態シーケンスを移動する


## 計算量
- (1) : O(n)
- (3) : O(n)


## 例
```cpp
#include <iostream>
#include <random>
#include <array>

int main()
{
  // (1) デフォルト構築
  // デフォルトのシード値(default_seed静的データメンバ)から構築する
  {
    std::minstd_rand engine;

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // (1) シード値を指定して構築
  {
    std::uint32_t seed = std::random_device()();
    std::minstd_rand engine(seed);

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
    std::minstd_rand engine(seq);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }
}
```
* std::minstd_rand[link /reference/random/minstd_rand.md]
* std::uint32_t[link /reference/cstdint/uint32_t.md]
* std::random_device[link /reference/random/random_device.md]
* seeds.begin()[link /reference/array/begin.md]
* seeds.end()[link /reference/array/end.md]

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
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


## 参照


