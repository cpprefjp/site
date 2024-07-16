# コンストラクタ
* random[meta header]
* std[meta namespace]
* negative_binomial_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit negative_binomial_distribution(IntType k = 1, double p = 0.5); // (1)
negative_binomial_distribution() : negative_binomial_distribution(1) {} // (1) C++20

explicit negative_binomial_distribution(IntType k, double p = 0.5);     // (2) C++20

explicit negative_binomial_distribution(const param_type& parm);        // (3)
```

## 概要

- (1) : デフォルトコンストラクタ
    - C++17まで : 成功回数`k`、および一度の事象が成功する確率`p`を受け取るコンストラクタ
    - C++20 : 成功回数`k = 1`、一度の事象が成功する確率`p = 0.5`として(2)に委譲。
- (2) : 成功回数`k`、および一度の事象が成功する確率`p`を受け取るコンストラクタ
- (3) : パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスの(1)のコンストラクタと同じオーバーロードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。


## 要件
- (2) : `p > 0.0 && p <= 1.0`かつ`k > 0`であること。(`p == 0`だと無限ループしてしまうため)


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // (2) パラメータを個別に指定する
  {
    // 確率0.5で成功する事象を、3回成功させる
    std::negative_binomial_distribution<> dist(3, 0.5);

    // 3回成功するまでに失敗した回数を取得
    int result = dist(engine);
    std::cout << result << std::endl;
  }

  // (3) パラメータを通して範囲指定する
  {
    using dist_type = std::negative_binomial_distribution<>;

    // 確率0.5で成功する事象を、3回成功させる
    dist_type::param_type param(3, 0.5);
    dist_type dist(param);

    // 3回成功するまでに失敗した回数を取得
    int result = dist(engine);
    std::cout << result << std::endl;
  }
}
```

### 出力例
```
2
0
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