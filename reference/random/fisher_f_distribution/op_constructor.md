# コンストラクタ
* random[meta header]
* std[meta namespace]
* fisher_f_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit fisher_f_distribution(RealType m = 1.0, RealType n = 1.0); // (1)
fisher_f_distribution() : fisher_f_distribution(1.0) {}             // (1) C++20

explicit fisher_f_distribution(RealType m, RealType n = 1.0);       // (2) C++20

explicit fisher_f_distribution(const param_type& parm);             // (3)
```

## 概要

- (1) : デフォルトコンストラクタ
    - C++17まで : フィッシャーのF分布の自由度`m`と`n`を受け取るコンストラクタ。
    - C++20 : フィッシャーのF分布の自由度`m = 1.0`と`n = 1.0`として(2)に委譲。
- (2) : フィッシャーのF分布の自由度`m`と`n`を受け取るコンストラクタ。
- (3) : パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスの(1)のコンストラクタと同じオーバーロードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。


## 要件
- (2) : `m > 0`かつ`n > 0`であること


## 例
```cpp example
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

### 出力例
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

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照

- [P0935R0 Eradicating unnecessarily explicit default constructors from the standard library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0935r0.html)