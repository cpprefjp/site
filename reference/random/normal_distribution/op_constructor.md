#コンストラクタ (C++11)
* random[meta header]
* std[meta namespace]
* normal_distribution[meta class]

```cpp
explicit normal_distribution(RealType mean = 0.0, RealType stddev = 1.0);
explicit normal_distribution(const param_type& parm);
```

##`normal_distribution`オブジェクトの構築
- `explicit normal_distribution(RealType mean = 0.0, RealType stddev = 1.0);`

値を生成する範囲として平均値`mean`および標準偏差`stddev`を受け取るコンストラクタ。 

要件： `stddev > 0`であること。


- `explicit uniform_real_distribution(const param_type& parm);`

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
    std::normal_distribution<> dist(0.0, 1.0);

    for (int i = 0; i < 10; ++i) {
      double result = dist(engine);
      std::cout << result << std::endl;
    }
  }
  std::cout << std::endl;

  // パラメータを通して範囲指定する
  {
    typedef std::normal_distribution<> dist_type;

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
-0.793657
0.574593
0.789962
-1.15676
-1.67754
0.642965
-0.889756
0.374841
1.65863
0.372529

1.90097
-0.330375
2.00916
0.367814
-1.74987
-2.2329
-1.75056
0.954589
1.1547
0.532431
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


