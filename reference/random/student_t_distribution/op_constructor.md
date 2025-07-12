# コンストラクタ
* random[meta header]
* std[meta namespace]
* student_t_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit student_t_distribution(RealType n = 1.0);        // (1)
student_t_distribution() : student_t_distribution(1.0) {} // (1) C++20

explicit student_t_distribution(RealType n);              // (2) C++20

explicit student_t_distribution(const param_type& parm);  // (3)
```

## 概要

- (1) : デフォルトコンストラクタ
    - C++17まで : ステューデントのt分布の自由度`n`を受け取るコンストラクタ。
    - C++20 : ステューデントのt分布の自由度`n = 1.0`として(2)に委譲。
- (2) : ステューデントのt分布の自由度`n`を受け取るコンストラクタ
- (3) : パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスのコンストラクタと同じオーバーロードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。


## 要件
- (2) : `n > 0`であること


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // (2) パラメータを個別に指定する
  {
    // 自由度1で分布させる
    std::student_t_distribution<> dist(1.0);

    for (int i = 0; i < 10; ++i) {
      double result = dist(engine);
      std::cout << result << std::endl;
    }
  }
  std::cout << std::endl;

  // (3) パラメータを指定する
  {
    using dist_type = std::student_t_distribution<>;

    // 自由度1で分布させる
    dist_type::param_type param(1.0);
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
0.0707396
1.54773
1.24956
-2.22074
0.834927
-1.61695
-5.72032
0.199524
-0.527183
7.03992

-8.34859
-1.23023
0.340032
-0.0635901
-0.132068
-1.22828
-1.21199
1.98038
-4.77059
-1.40051
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
