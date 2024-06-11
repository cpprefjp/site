# コンストラクタ
* random[meta header]
* std[meta namespace]
* extreme_value_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit extreme_value_distribution(RealType a = 0.0, RealType b = 1.0); // (1)
extreme_value_distribution() : extreme_value_distribution(0.0) {}        // (1) C++20

explicit extreme_value_distribution(RealType a, RealType b = 1.0);       // (2) C++20

explicit extreme_value_distribution(const param_type& parm);             // (3)
```

## 概要

- (1) : デフォルトコンストラクタ
    - C++17まで : 極値分布の位置パラメータ`a`と尺度パラメータ`b`を受け取るコンストラクタ。
    - C++20 : 極値分布の位置パラメータ`a = 0.0`、尺度パラメータ`b = 1.0`として(2)に委譲。
- (2) : 極値分布の位置パラメータ`a`と尺度パラメータ`b`を受け取るコンストラクタ。
- (3) : パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスの(1)のコンストラクタと同じオーバーロードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。


## 要件
- (2) : `b > 0`であること


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
    // 位置パラメータ0.0、尺度パラメータ1.0で分布させる
    std::extreme_value_distribution<> dist(0.0, 1.0);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << std::endl;
    }
  }
  std::cout << std::endl;

  // (3) パラメータを通して範囲指定する
  {
    using dist_type = std::extreme_value_distribution<>;

    // 位置パラメータ0.0、尺度パラメータ1.0で分布させる
    dist_type::param_type param(0.0, 1.0);
    dist_type dist(param);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << std::endl;
    }
  }
}
```

### 出力例
```
2.91432
0.322301
1.42006
1.73491
0.8288
-0.226944
4.63647
0.173902
0.967676
0.786669

1.99643
0.247697
2.00596
-0.72777
-0.427353
-0.156903
-0.885475
0.391018
-0.563767
-0.58102
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