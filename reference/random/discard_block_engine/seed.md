#seed (C++11)
```cpp
void seed();
void seed(result_type s);
template<class Sseq> void seed(Sseq& q);
```

##概要
シードを設定する。


##効果
各オーバーロードが持つパラメータを`arg`とした場合、  

```cpp
*this = discard_block_engine(arg);
```
* discard_block_engine[link ./discard_block_engine.md]

と同じ効果を持つ。  
指定されたシード値もしくはシードのシーケンスで、エンジンの再初期化を行う。  
パラメータなしのバージョンは、元となる乱数生成器のデフォルトシードで再初期化を行う。


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
    std::ranlux24 engine;

    engine.seed();

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // シード値を指定して再初期化
  {
    std::ranlux24 engine;

    std::uint32_t seed = std::random_device()();
    engine.seed(seed);

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // シードのシーケンスを指定して再初期化
  {
    std::ranlux24 engine;

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
* ranlux24[link /reference/random/ranlux24.md]
* seed_seq[link /reference/random/seed_seq.md]
* random_device[link /reference/random/random_device.md]

###出力
```
15039276
9516009
2488183
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


