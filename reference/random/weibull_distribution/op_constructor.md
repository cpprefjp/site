#コンストラクタ (C++11)
* random[meta header]
* std[meta namespace]

```cpp
explicit weibull_distribution(RealType a = 1.0, RealType b = 1.0);
explicit weibull_distribution(const param_type& parm);
```

##`weibull_distribution`オブジェクトの構築
- `explicit weibull_distribution(RealType a = 1.0, RealType b = 1.0);`

形状パラメータ(ワイブル係数)`a`と尺度パラメータ`b`を受け取るコンストラクタ。 

要件： `a > 0`かつ`b > 0`であること。


- `explicit weibull_distribution(const param_type& parm);`

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
    // 形状パラメータ1.0、尺度パラメータ1.0で分布させる
    std::weibull_distribution<> dist(1.0, 1.0);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << std::endl;
    }
  }
  std::cout << std::endl;

  // パラメータを通して範囲指定する
  {
    typedef std::weibull_distribution<> dist_type;

    // 形状パラメータ1.0、尺度パラメータ1.0で分布させる
    dist_type::param_type param(1.0, 1.0);
    dist_type dist(param);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << std::endl;
    }
  }
}
```


###出力例
```
0.912249
0.0289652
0.0760671
1.46664
0.634032
3.00078
2.21434
1.23163
0.242967
0.942412

0.173383
0.533308
0.806522
0.197259
0.968115
0.388902
0.609052
1.28074
1.33422
0.696135
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


