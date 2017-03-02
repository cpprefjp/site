#コンストラクタ
* random[meta header]
* std[meta namespace]
* chi_squared_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit chi_squared_distribution(RealType n = 1);         // (1)
explicit chi_squared_distribution(const param_type& parm); // (2)
```

##概要
- (1) : カイ二乗分布の自由度`n`を受け取るコンストラクタ。
- (2) : パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスの(1)のコンストラクタと同じオーバーロードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。


##要件
- (1) : `n > 0`であること


##例
```cpp
#include <iostream>
#include <random>

int main() 
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // パラメータを個別に指定する
  {
    // 自由度1.0で分布させる
    std::chi_squared_distribution<> dist(1.0);

    for (int i = 0; i < 10; ++i) {
      double result = dist(engine);
      std::cout << result << std::endl;
    }
  }
  std::cout << std::endl;

  // パラメータを通して範囲指定する
  {
    using dist_type = std::chi_squared_distribution<>;

    // 自由度1.0で分布させる
    dist_type::param_type param(1.0);
    dist_type dist(param);

    for (int i = 0; i < 10; ++i) {
      double result = dist(engine);
      std::cout << result << std::endl;
    }
  }
}
```
* std::random_device[link /reference/random/random_device.md]
* seed_gen()[link /reference/random/random_device/op_call.md]
* std::default_random_engine[link /reference/random/default_random_engine.md]

###出力例
```
1.0849
0.309153
0.110272
1.49593
7.62756
0.927176
0.650995
2.0861
0.0401504

0.333507
0.0314703
0.00229207
0.236144
0.211284
0.00129288
0.042014
0.000154981
0.560326
2.61903
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


