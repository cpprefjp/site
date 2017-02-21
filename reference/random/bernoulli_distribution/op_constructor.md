#コンストラクタ
* random[meta header]
* std[meta namespace]
* bernoulli_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit bernoulli_distribution(double p = 0.5);
explicit bernoulli_distribution(const param_type& parm);
```

##`bernoulli_distribution`オブジェクトの構築
- `explicit bernoulli_distribution(double p = 0.5);`

確率`p`を受け取るコンストラクタ。
確率`p`で`true`が生成され、確率`1.0 - p`で`false`が生成される。


要件： `p >= 0.0 && p <= 1.0`であること。


- `explicit bernoulli_distribution(const param_type& parm);`

パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスのコンストラクタと同じオーバーロードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。


##例
```cpp
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
    typedef std::bernoulli_distribution dist_type;

    // 確率0.7でtrueを生成し、確率0.3(1.0 - 0.7)でfalseを生成する
    dist_type::param_type param(0.7);
    dist_type dist(param);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << std::endl;
    }
  }
}
```
* std::random_device[link /reference/random/random_device.md]
* seed_gen()[link /reference/random/random_device/op_call.md]
* std::default_random_engine[link /reference/random/default_random_engine.md]

###出力例
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


