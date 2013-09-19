#コンストラクタ(C++11)
```cpp
discard_block_engine();
explicit discard_block_engine(const Engine& e);
explicit discard_block_engine(Engine&& e);
explicit discard_block_engine(result_type s);
template<class Sseq> explicit discard_block_engine(Sseq& q);

discard_block_engine(const discard_block_engine& e) = default;
discard_block_engine(discard_block_engine&& e) = default;
```

##`discard_block_engine`オブジェクトの構築
- `discard_block_engine();`

デフォルトコンストラクタ。  
元となる乱数生成器を、デフォルト構築する(デフォルトシードで初期化)。


- `explicit discard_block_engine(const Engine& e);`

元となる乱数生成器のコピーを作るコンストラクタ。


- `explicit discard_block_engine(Engine&& e);`

元となる乱数生成器オブジェクトを受け取り、移動して保持するコンストラクタ。


- `explicit discard_block_engine(result_type s);`

受け取ったシードで、元となる乱数生成器を初期化するコンストラクタ。


- `template<class Sseq> explicit discard_block_engine(Sseq& q);`

受け取ったシードのシーケンスで、元となる乱数生成器を初期化するコンストラクタ。


- `discard_block_engine(const discard_block_engine& e) = default;`

コピーコンストラクタ。

- `discard_block_engine(discard_block_engine&& e) = default;`

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
    std::ranlux24 engine;

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // 元となる乱数生成器のコピーから構築する
  {
    std::ranlux24_base base_engine;
    std::ranlux24 engine(base_engine);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // 元となる乱数生成器をムーブして構築する
  {
    std::ranlux24_base base_engine;
    std::ranlux24 engine(std::move(base_engine));

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // シード値を指定して構築
  {
    std::uint32_t seed = std::random_device()();
    std::ranlux24 engine(seed);

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
    std::ranlux24 engine(seq);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }
}
```
* ranlux24[link /reference/random/ranlux24.md]
* ranlux24_base[link /reference/random/ranlux24_base.md]
* seed_seq[link /reference/random/seed_seq.md]
* random_device[link /reference/random/random_device.md]

###出力例
```
15039276
15039276
15039276
13551073
1657166
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


