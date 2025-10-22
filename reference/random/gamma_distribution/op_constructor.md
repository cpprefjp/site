# コンストラクタ
* random[meta header]
* std[meta namespace]
* gamma_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit gamma_distribution(RealType alpha = 1.0, RealType beta = 1.0); // (1)
gamma_distribution() : gamma_distribution(1.0) {}                       // (1) C++20

explicit gamma_distribution(RealType alpha, RealType beta = 1.0);       // (2) C++20

explicit gamma_distribution(const param_type& parm);                    // (3)
```

## 概要

- (1) : デフォルトコンストラクタ
    - C++17まで : ガンマ分布の形状母数`alpha`および尺度母数`beta`を受け取るコンストラクタ。
    - C++20 : ガンマ分布の形状母数`alpha = 1.0`、尺度母数`beta = 1.0`として(2)に委譲。
- (2) : ガンマ分布の形状母数`alpha`および尺度母数`beta`を受け取るコンストラクタ。
- (3) : パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスの(1)のコンストラクタと同じオーバーロードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。


## 要件
- (2) : `a > 0`かつ`b > 0`であること


## 例
```cpp example
#include <iostream>
#include <random>
#include <cstdint>

int main()
{
  std::random_device seed_gen;
  std::uint32_t seed = seed_gen();
  std::default_random_engine engine(seed);

  // (2) パラメータを個別に指定する
  {
    // 形状母数1.0、尺度母数1.0で分布させる
    std::gamma_distribution<> dist(1.0, 1.0);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << " ";
    }
  }
  std::cout << std::endl;

  // (3) パラメータを通して範囲指定する
  {
    using dist_type = std::gamma_distribution<>;

    // 形状母数1.0、尺度母数1.0で分布させる
    dist_type::param_type param(1.0, 1.0);
    dist_type dist(param);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << " ";
    }
  }
}
```

### 出力例
```
0.365864 2.62428 2.2892 2.88907 0.159108 0.811572 0.639582 0.0461815 0.0372937 0.391902 
1.51719 0.10519 0.856907 2.47365 2.23435 1.01822 3.01892 1.10875 2.20858 3.91652 
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
