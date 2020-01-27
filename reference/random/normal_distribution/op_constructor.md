# コンストラクタ
* random[meta header]
* std[meta namespace]
* normal_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit normal_distribution(RealType mean = 0.0, RealType stddev = 1.0); // (1)
explicit normal_distribution(const param_type& parm);                     // (2)
```

## 概要
- (1) : �規分布の平均値`mean`および標準偏差`stddev`を受け取るコンストラクタ
- (2) : パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスの(1)のコンストラクタと同じオーバー�ードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。 


## 要件
- (1) : `stddev > 0`であること


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // (1) パラメータを個別に指定する
  {
    // 平均0.0、標準偏差1.0で分布させる
    std::normal_distribution<> dist(0.0, 1.0);

    for (int i = 0; i < 10; ++i) {
      double result = dist(engine);
      std::cout << result << std::endl;
    }
  }
  std::cout << std::endl;

  // (2) パラメータを通して範囲指定する
  {
    using dist_type = std::normal_distribution<>;

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

### 出力例
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

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照


