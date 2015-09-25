#コンストラクタ
* random[meta header]
* std[meta namespace]
* lognormal_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit lognormal_distribution(RealType m = 0.0, RealType s = 1.0);
explicit lognormal_distribution(const param_type& param);
```

##`lognormal_distribution`オブジェクトの構築
- `explicit lognormal_distribution(RealType m = 0.0, RealType s = 1.0);`

値を生成する範囲として平均値`m`および標準偏差`s`を受け取るコンストラクタ。 

要件： `s > 0`であること。


- `explicit lognormal_distribution(const param_type& param);`

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
    // 平均0.0、標準偏差1.0で分布させる
    std::lognormal_distribution<> dist(0.0, 1.0);

    for (int i = 0; i < 10; ++i) {
      double result = dist(engine);
      std::cout << result << std::endl;
    }
  }
  std::cout << std::endl;

  // パラメータを通して範囲指定する
  {
    typedef std::lognormal_distribution<> dist_type;

    // 平均0.0、標準偏差1.0で分布させる
    dist_type::param_type param(0.0, 1.0);
    dist_type dist(param);

    for (int i = 0; i < 10; ++i) {
      double result = dist(engine);
      std::cout << result << std::endl;
    }
  }
}
```


###出力例
```
2.27834
2.27293
1.91351
0.265119
7.35677
0.847507
0.484952
1.51837
3.02288
0.377324

0.355262
0.295703
0.338084
7.01635
1.9116
0.71642
1.55948
0.563478
2.23077
1.47788
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


