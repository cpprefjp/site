# コンストラクタ
* random[meta header]
* std[meta namespace]
* uniform_real_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit uniform_real_distribution(RealType a = 0.0, RealType b = 1.0); // (1)
uniform_real_distribution() : uniform_real_distribution(0.0) {}         // (1) C++20

explicit uniform_real_distribution(RealType a, RealType b = 1.0);       // (2) C++20

explicit uniform_real_distribution(const param_type& parm);             // (3)
```

## 概要

- (1) : デフォルトコンストラクタ
    - C++17まで : 一様実数分布の下限`a`および上限`b`を受け取るコンストラクタ。
    - C++20 : 分布の範囲を`[0.0, 1.0)`として(2)に委譲。
- (2) : 一様実数分布の下限`a`および上限`b`を受け取るコンストラクタ。`a`以上`b`未満(`[a, b)`)の値が生成される
- (3) : パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスの(1)のコンストラクタと同じオーバーロードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。


## 要件
- (1), (2) : `a <= b`かつ`b - a <=` [`numeric_limits`](/reference/limits/numeric_limits.md)`<RealType>::`[`max()`](/reference/limits/numeric_limits/max.md)であること


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

  // (2) 範囲を指定する
  {
    // 0.0以上1.0未満の範囲で、値を等確率で生成する
    std::uniform_real_distribution<> dist(0.0, 1.0);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << " ";
    }
  }
  std::cout << std::endl;

  // (3) パラメータを通して範囲指定する
  {
    using dist_type = std::uniform_real_distribution<>;

    // 0.0以上1.0未満の範囲で、値を等確率で生成する
    dist_type::param_type param(0.0, 1.0);
    dist_type dist(param);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << " ";
    }
  }
}
```

### 出力例
```
0.339729 0.568455 0.156581 0.0936911 0.812806 0.82151 0.995539 0.13173 0.785655 0.807546 
0.749615 0.572052 0.75852 0.204536 0.536476 0.478522 0.473927 0.0672362 0.709408 0.18254 
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
- [C++ の std::uniform_real_distribution はあまり信用できない。](https://qiita.com/Nabetani/items/b6b5f80c77b92ff8bd9f)
    - a ≤ x < b なるx を返すはずであるが、その範囲外の値が返ってくるライブラリ実装が存在することの指摘。
