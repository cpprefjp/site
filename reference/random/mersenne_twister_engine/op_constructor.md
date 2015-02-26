#コンストラクタ (C++11)
* random[meta header]
* std[meta namespace]
* mersenne_twister_engine[meta class]

```cpp
explicit mersenne_twister_engine(result_type value = default_seed);
template<class Sseq> explicit mersenne_twister_engine(Sseq& q);

mersenne_twister_engine(const mersenne_twister_engine& e) = default;
mersenne_twister_engine(mersenne_twister_engine&& e) = default;
```

##`mersenne_twister_engine`オブジェクトの構築
- `explicit mersenne_twister_engine(result_type value = default_seed);`

シード値を受け取って状態シーケンスを構築する。  
※ シード値には、初期状態の予測不可能性を高めるために、UNIX時間(エポックからの経過時間)や、非決定的な乱数を指定するのがよい。  
  
計算量：O(n)


- `template<class Sseq> explicit mersenne_twister_engine(Sseq& q);`

シードのシーケンスを受け取って状態シーケンスを構築する。


- `mersenne_twister_engine(const mersenne_twister_engine& e) = default;`

コピーコンストラクタ。状態シーケンスをコピーする。

計算量：O(n)

- `mersenne_twister_engine(mersenne_twister_engine&& e) = default;`

ムーブコンストラクタ。  
状態シーケンスの要素数はコンパイル時に決定されるため、多くの場合状態シーケンスはスタック上(配列)に作られる。そのため、ムーブが効果的に動作することは期待できない。


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
    std::mt19937 engine;

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // シード値を指定して構築
  {
    std::uint32_t seed = std::random_device()();
    std::mt19937 engine(seed);

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
    std::mt19937 engine(seq);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }
}
```


###出力例
```
3499211612
4275542254
2960779330
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


