# コンストラクタ
* random[meta header]
* std[meta namespace]
* geometric_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit geometric_distribution(double p = 0.5);          // (1)
geometric_distribution() : geometric_distribution(0.5) {} // (1) C++20

explicit geometric_distribution(double p);                // (2) C++20

explicit geometric_distribution(const param_type& parm);  // (3)
```

## 概要

- (1) : デフォルトコンストラクタ
    - C++17まで : 一度の事象が成功する確率`p`を受け取るコンストラクタ。
    - C++20 : 一度の事象が成功する確率`p = 0.5`として(2)に委譲。
- (2) : 一度の事象が成功する確率`p`を受け取るコンストラクタ。
- (3) : パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスの(1)のコンストラクタと同じオーバーロードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。


## 要件
- (2) : `p > 0.0 && p < 1.0`であること。(`p == 0`だと無限ループになってしまうため)


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
    // 確率0.5で成功する事象を、成功するまで試行する
    std::geometric_distribution<> dist(0.5);

    // 成功するまでに失敗した回数を取得
    int result = dist(engine);
    std::cout << result << std::endl;
  }

  // (3) パラメータを通して範囲指定する
  {
    using dist_type = std::geometric_distribution<>;

    // 確率0.5で成功する事象を、成功するまで試行する
    dist_type::param_type param(0.5);
    dist_type dist(param);

    // 成功するまでに失敗した回数を取得
    int result = dist(engine);
    std::cout << result << std::endl;
  }
}
```

### 出力例
```
2
1
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