# コンストラクタ
* random[meta header]
* std[meta namespace]
* bernoulli_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit bernoulli_distribution(double p = 0.5);          // (1)
bernoulli_distribution() : bernoulli_distribution(0.5) {} // (1) C++20

explicit bernoulli_distribution(double p);                // (2) C++20

explicit bernoulli_distribution(const param_type& parm);  // (3)
```

## 概要

- (1) : デフォルトコンストラクタ
    - C++17まで : 確率`p`を受け取るコンストラクタ。
    - C++20 : 確率`p`を`0.5`として(2)に委譲。
- (2) : 確率`p`を受け取るコンストラクタ。確率`p`で`true`が生成され、確率`1.0 - p`で`false`が生成される。
- (3) : パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスの(1)のコンストラクタと同じオーバーロードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。


## 要件
- (1)(C++17まで)、(2) : `p >= 0.0 && p <= 1.0`であること。


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  std::cout << std::boolalpha;

  // 確率を指定する
  {
    // 確率0.7でtrueを生成し、確率0.3(1.0 - 0.7)でfalseを生成する
    std::bernoulli_distribution dist(0.7);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << std::endl;
    }
  }
  std::cout << std::endl;

  // パラメータを通して範囲指定する
  {
    using dist_type = std::bernoulli_distribution;

    // 確率0.7でtrueを生成し、確率0.3(1.0 - 0.7)でfalseを生成する
    dist_type::param_type param(0.7);
    dist_type dist(param);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << std::endl;
    }
  }
}
```

### 出力例
```
true
false
true
false
true
true
false
true
true
true

true
true
true
true
false
true
true
false
true
true
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