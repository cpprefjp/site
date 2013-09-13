#seed(C++11)
```cpp
void seed(result_type value = default_seed);
template<class Sseq> void seed(Sseq& q);
```

##概要
シードを設定する。


##効果
パラメータ`value`および`q`を`arg`とした場合、  

```cpp
*this = linear_congruential_engine(arg);
```
* linear_congruential_engine[link ./linear_congruential_engine.md]

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
    std::minstd_rand engine;

    engine.seed();

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // シード値を指定して再初期化
  {
    std::minstd_rand engine;

    std::uint32_t seed = std::random_device()();
    engine.seed(seed);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // シードのシーケンスを指定して再初期化
  {
    std::minstd_rand engine;

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
48271
215673198
339747215
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


