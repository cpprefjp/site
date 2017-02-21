#コンストラクタ
* random[meta header]
* std[meta namespace]
* cauchy_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit cauchy_distribution(RealType a = 0.0, RealType b = 1.0);
explicit cauchy_distribution(const param_type& parm);
```

##`cauchy_distribution`オブジェクトの構築
- `explicit cauchy_distribution(RealType a = 0.0, RealType b = 1.0);`

コーシー分布の位置母数`a`および尺度母数`b`を受け取るコンストラクタ。

要件： `b > 0`であること。


- `explicit cauchy_distribution(const param_type& parm);`

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
    // 位置母数0.0、尺度母数1.0で分布させる
    std::cauchy_distribution<> dist(0.0, 1.0);

    for (int i = 0; i < 10; ++i) {
      double result = dist(engine);
      std::cout << result << std::endl;
    }
  }
  std::cout << std::endl;

  // パラメータを通して範囲指定する
  {
    typedef std::cauchy_distribution<> dist_type;

    // 位置母数0.0、尺度母数1.0で分布させる
    dist_type::param_type param(0.0, 1.0);
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
-8.68106
-1.45595
2.20777
0.447975
8.15704
0.564086
19.9933
1.95861
-0.20131
-0.00596668

0.174368
-0.775221
-0.508034
3.46587
-10.5451
24.0844
1.07661
0.786653
3.71786
1.59971
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


