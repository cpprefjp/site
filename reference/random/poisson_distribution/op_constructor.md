#コンストラクタ
* random[meta header]
* std[meta namespace]
* poisson_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit poisson_distribution(double mean = 1.0);      // (1)
explicit poisson_distribution(const param_type& parm); // (2)
```

##概要
- (1) : ポワソン分布の平均値`mean`を受け取るコンストラクタ
- (2) : パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスの(1)のコンストラクタと同じオーバーロードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。


##要件
- (1) : `mean > 0`であること


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // (1) パラメータを個別に指定する
  {
    // 平均値1.0で分布させる
    std::poisson_distribution<> dist(1.0);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << " ";
    }
  }
  std::cout << std::endl;

  // (2) パラメータを通して範囲指定する
  {
    typedef std::poisson_distribution<> dist_type;

    // 平均値1.0で分布させる
    dist_type::param_type param(1.0);
    dist_type dist(param);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << " ";
    }
  }
}
```
* std::random_device[link /reference/random/random_device.md]
* seed_gen()[link /reference/random/random_device/op_call.md]
* std::default_random_engine[link /reference/random/default_random_engine.md]

###出力例
```
3 0 0 3 1 1 1 0 0 2 
1 3 1 1 0 2 2 6 0 0 
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


