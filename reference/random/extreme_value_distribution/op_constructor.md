#コンストラクタ
* random[meta header]
* std[meta namespace]
* extreme_value_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit extreme_value_distribution(RealType a = 0.0, RealType b = 1.0);
explicit extreme_value_distribution(const param_type& parm);
```

##`extreme_value_distribution`オブジェクトの構築
- `explicit extreme_value_distribution(RealType a = 0.0, RealType b = 1.0);`

極値分布の位置パラメータ`a`と尺度パラメータ`b`を受け取るコンストラクタ。

要件： `b > 0`であること。


- `explicit extreme_value_distribution(const param_type& parm);`

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
    // 位置パラメータ0.0、尺度パラメータ1.0で分布させる
    std::extreme_value_distribution<> dist(0.0, 1.0);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << std::endl;
    }
  }
  std::cout << std::endl;

  // パラメータを通して範囲指定する
  {
    typedef std::extreme_value_distribution<> dist_type;

    // 位置パラメータ0.0、尺度パラメータ1.0で分布させる
    dist_type::param_type param(0.0, 1.0);
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


