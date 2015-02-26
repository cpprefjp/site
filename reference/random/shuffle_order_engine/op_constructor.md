#コンストラクタ (C++11)
* random[meta header]
* std[meta namespace]

```cpp
shuffle_order_engine();
explicit shuffle_order_engine(const Engine& e);
explicit shuffle_order_engine(Engine&& e);
explicit shuffle_order_engine(result_type s);
template<class Sseq> explicit shuffle_order_engine(Sseq& q);

shuffle_order_engine(const shuffle_order_engine& e) = default;
shuffle_order_engine(shuffle_order_engine&& e) = default;
```

##`shuffle_order_engine`オブジェクトの構築
- `shuffle_order_engine();`

デフォルトコンストラクタ。  
元となる乱数生成器を、デフォルト構築する(デフォルトシードで初期化)。


- `explicit shuffle_order_engine(const Engine& e);`

元となる乱数生成器のコピーを作るコンストラクタ。


- `explicit shuffle_order_engine(Engine&& e);`

元となる乱数生成器オブジェクトを受け取り、移動して保持するコンストラクタ。


- `explicit shuffle_order_engine(result_type s);`

受け取ったシードで、元となる乱数生成器を初期化するコンストラクタ。


- `template<class Sseq> explicit shuffle_order_engine(Sseq& q);`

受け取ったシードのシーケンスで、元となる乱数生成器を初期化するコンストラクタ。


- `shuffle_order_engine(const shuffle_order_engine& e) = default;`

コピーコンストラクタ。

- `shuffle_order_engine(shuffle_order_engine&& e) = default;`

ムーブコンストラクタ。可能であれば、元となる乱数生成器を移動する。  


##例
```cpp
#include <iostream>
#include <random>
#include <array>

int main()
{
  // デフォルト構築
  // 元となる乱数生成器を、デフォルトのシード値で初期化する
  {
    std::knuth_b engine;

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // 元となる乱数生成器のコピーから構築する
  {
    std::minstd_rand0 base_engine;
    std::knuth_b engine(base_engine);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // 元となる乱数生成器をムーブして構築する
  {
    std::minstd_rand0 base_engine;
    std::knuth_b engine(std::move(base_engine));

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // シード値を指定して構築
  {
    std::uint32_t seed = std::random_device()();
    std::knuth_b engine(seed);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // シードのシーケンスを指定して構築
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
* knuth_b[link /reference/random/knuth_b.md]
* minstd_rand0[link /reference/random/minstd_rand0.md]
* seed_seq[link /reference/random/seed_seq.md]
* random_device[link /reference/random/random_device.md]

###出力例
```
152607844
152607844
152607844
988019904
237561954
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


