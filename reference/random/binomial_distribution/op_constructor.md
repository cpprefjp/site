# コンストラクタ
* random[meta header]
* std[meta namespace]
* binomial_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit binomial_distribution(IntType t = 1, double p = 0.5); // (1)
binomial_distribution() : binomial_distribution(1) {}          // (1) C++20

explicit binomial_distribution(IntType t, double p = 0.5);     // (2) C++20

explicit binomial_distribution(const param_type& parm);        // (3)
```

## 概要

- (1) : デフォルトコンストラクタ
    - C++17まで : 成功確率`p`および試行回数`t`を受け取るコンストラクタ。
    - C++20 : 成功確率`p = 0.5`、試行回数`t = 1`として(2)に委譲。
- (2) : 成功確率`p`および試行回数`t`を受け取るコンストラクタ。
- (3) : パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスの(1)のコンストラクタと同じオーバーロードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。


## 要件
- (2) : `p >= 0.0 && p <= 1.0`かつ`t >= 0`であること


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

  // パラメータを個別に指定する
  {
    // 確率0.5で成功する事象を、3回試行する
    std::binomial_distribution<> dist(3, 0.5);

    // 成功回数を取得
    int result = dist(engine);
    std::cout << result << std::endl;
  }

  // パラメータを通して範囲指定する
  {
    using dist_type = std::binomial_distribution<>;

    // 確率0.5で成功する事象を、3回試行する
    dist_type::param_type param(3, 0.5);
    dist_type dist(param);

    // 成功回数を取得
    int result = dist(engine);
    std::cout << result << std::endl;
  }
}
```

### 出力例
```
1
2
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
