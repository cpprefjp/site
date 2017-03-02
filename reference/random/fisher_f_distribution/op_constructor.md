#コンストラクタ
* random[meta header]
* std[meta namespace]
* fisher_f_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit fisher_f_distribution(RealType m = 1, RealType n = 1); // (1)
explicit fisher_f_distribution(const param_type& parm);         // (2)
```

##概要
- (1) : フィッシャーのF分布の自由度`m`と`n`を受け取るコンストラクタ。
- (2) : パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスの(1)のコンストラクタと同じオーバーロードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。


##要件
- (1) : `m > 0`かつ`n > 0`であること


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
    // 自由度3と4で分布させる
    std::fisher_f_distribution<> dist(3.0, 4.0);

    for (int i = 0; i < 10; ++i) {
      double result = dist(engine);
      std::cout << result << std::endl;
    }
  }
  std::cout << std::endl;

  // パラメータを指定する
  {
    using dist_type = std::fisher_f_distribution<>;

    // 自由度3と4で分布させる
    dist_type::param_type param(3.0, 4.0);
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
0.616942
0.262524
0.884393
4.27036
1.56633
1.3275
2.20063
19.6223
2.49439
3.50733

0.637539
4.01248
1.08531
0.176918
1.59421
2.15573
2.42154
0.417621
1.14594
0.720437
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


