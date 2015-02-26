#コンストラクタ (C++11)
* random[meta header]

```cpp
explicit subtract_with_carry_engine(result_type value = default_seed);
template<class Sseq> explicit subtract_with_carry_engine(Sseq& q);

subtract_with_carry_engine(const subtract_with_carry_engine& e) = default;
subtract_with_carry_engine(subtract_with_carry_engine&& e) = default;
```

##`subtract_with_carry_engine`オブジェクトの構築
- `explicit subtract_with_carry_engine(result_type value = default_seed);`

シード値を受け取って状態シーケンスを構築する。  
※ シード値には、初期状態の予測不可能性を高めるために、UNIX時間(エポックからの経過時間)や、非決定的な乱数を指定するのがよい。  
  
計算量：O(n)


- `template<class Sseq> explicit subtract_with_carry_engine(Sseq& q);`

シードのシーケンスを受け取って状態シーケンスを構築する。


- `subtract_with_carry_engine(const subtract_with_carry_engine& e) = default;`

コピーコンストラクタ。状態シーケンスをコピーする。

計算量：O(n)

- `subtract_with_carry_engine(subtract_with_carry_engine&& e) = default;`

ムーブコンストラクタ。可能であれば状態シーケンスを移動する。  


##例
```cpp
#include <iostream>
#include <random>
#include <array>

int main()
{
  // デフォルト構築
  // デフォルトのシード値(default_seed静的データメンバ)から構築する
  {
    std::ranlux24_base engine;

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // シード値を指定して構築
  {
    std::uint32_t seed = std::random_device()();
    std::ranlux24_base engine(seed);

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
    std::ranlux24_base engine(seq);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }
}
```
* ranlux24_base[link /reference/random/ranlux24_base.md]
* seed_seq[link /reference/random/seed_seq.md]
* random_device[link /reference/random/random_device.md]

###出力例
```
15039276
7573519
3112173
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


