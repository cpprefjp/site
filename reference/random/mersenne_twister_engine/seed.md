#seed
* random[meta header]
* std[meta namespace]
* mersenne_twister_engine[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void seed(result_type value = default_seed);
template<class Sseq> void seed(Sseq& q);
```

##概要
シードを設定する。


##効果
パラメータ`value`および`q`を`arg`とした場合、  

```cpp
*this = mersenne_twister_engine(arg);
```
* mersenne_twister_engine[link op_constructor.md]

と同じ効果を持つ。  
指定されたシード値もしくはシードのシーケンスで、エンジンの再初期化を行う。


##戻り値
なし


##例
```cpp
#include <iostream>
#include <random>
#include <array>

int main()
{
  // デフォルトのシード値から再初期化
  {
    std::mt19937 engine;

    engine.seed();

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // シード値を指定して再初期化
  {
    std::mt19937 engine;

    std::uint32_t seed = std::random_device()();
    engine.seed(seed);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // シードのシーケンスを指定して再初期化
  {
    std::mt19937 engine;

    // シードのシーケンスを作る
    std::random_device seed_gen;
    std::array<std::uint32_t, 100> seeds;

    for (std::uint32_t& x : seeds) {
      x = seed_gen();
    }

    std::seed_seq seq(seeds.begin(), seeds.end());

    // シードのシーケンスを指定してエンジンを再初期化
    engine.seed(seq);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }
}
```

###出力
```
3499211612
3035471323
3117047722
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


