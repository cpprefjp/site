#コンストラクタ
* random[meta header]
* std[meta namespace]
* negative_binomial_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit negative_binomial_distribution(IntType k = 1, double p = 0.5);
explicit negative_binomial_distribution(const param_type& parm);
```

##`negative_binomial_distribution`オブジェクトの構築
- `explicit negative_binomial_distribution(IntType k = 1, double p = 0.5);`

成功回数`k`、および一度の事象が成功する確率`p`を受け取るコンストラクタ。

要件： `p > 0.0 && p <= 1.0`かつ`k > 0`であること。(`p == 0`だと無限ループしてしまうため)


- `explicit negative_binomial_distribution(const param_type& parm);`

パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスのコンストラクタと同じオーバーロードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。 


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
    // 確率0.5で成功する事象を、3回成功させる
    std::negative_binomial_distribution<> dist(3, 0.5);

    // 3回成功するまでに失敗した回数を取得
    int result = dist(engine);
    std::cout << result << std::endl;
  }

  // パラメータを通して範囲指定する
  {
    typedef std::negative_binomial_distribution<> dist_type;

    // 確率0.5で成功する事象を、3回成功させる
    dist_type::param_type param(3, 0.5);
    dist_type dist(param);

    // 3回成功するまでに失敗した回数を取得
    int result = dist(engine);
    std::cout << result << std::endl;
  }
}
```
* std::random_device[link /reference/random/random_device.md]
* seed_gen()[link /reference/random/random_device/op_call.md]
* std::default_random_engine[link /reference/random/default_random_engine.md]

###出力例
```
2
0
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


