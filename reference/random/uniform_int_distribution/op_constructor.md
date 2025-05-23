# コンストラクタ
* random[meta header]
* std[meta namespace]
* uniform_int_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit uniform_int_distribution(IntType a = 0,
                                  IntType b = numeric_limits<IntType>::max()); // (1)
uniform_int_distribution() : uniform_int_distribution(0) {}                    // (1) C++20

explicit uniform_int_distribution(IntType a,
                                  IntType b = numeric_limits<IntType>::max()); // (2) C++20

explicit uniform_int_distribution(const param_type& parm);                     // (3)
```
* numeric_limits[link /reference/limits/numeric_limits.md]
* max()[link /reference/limits/numeric_limits/max.md]

## 概要

- (1) : デフォルトコンストラクタ。
    - C++17 : 一様整数分布の下限`a`および上限`b`を受け取るコンストラクタ。
    - C++20 : 分布の範囲を`[0, numeric_limits<IntType>::max()]`として(2)に委譲。
- (2) : 一様整数分布の下限`a`および上限`b`を受け取るコンストラクタ。`a`以上`b`以下(範囲`[a, b]`)の値が生成される
- (3) : パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスの(1)のコンストラクタと同じオーバーロードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。


## 要件
- (1), (2) : `a <= b`であること


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // (2) 範囲を指定する
  {
    // 0以上3以下の範囲で、値を等確率で生成する
    std::uniform_int_distribution<> dist(0, 3);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << " ";
    }
  }
  std::cout << std::endl;

  // (3) パラメータを通して範囲指定する
  {
    using dist_type = std::uniform_int_distribution<>;

    // 0以上3以下の範囲で、値を等確率で生成する
    dist_type::param_type param(0, 3);
    dist_type dist(param);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << " ";
    }
  }
}
```

### 出力例
```
0 2 3 3 3 0 0 1 3 2 
0 0 1 0 1 3 2 0 3 1 
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