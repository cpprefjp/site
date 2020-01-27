# コンストラクタ
* random[meta header]
* std[meta namespace]
* binomial_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit binomial_distribution(IntType t = 1, double p = 0.5); // (1)
explicit binomial_distribution(const param_type& parm);        // (2)
```

## 概要
- (1) : 成功確率`p`および試行回数`t`を受け取るコンストラクタ。
- (2) : パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスの(1)のコンストラクタと同じオーバー�ードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。


## 要件
- (1) : `p >= 0.0 && p <= 1.0`かつ`t >= 0`であること


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
    // 確率0.5で成功する事象を、3回施行する
    std::binomial_distribution<> dist(3, 0.5);

    // 成功回数を取得
    int result = dist(engine);
    std::cout << result << std::endl;
  }

  // パラメータを通して範囲指定する
  {
    using dist_type = std::binomial_distribution<>;

    // 確率0.5で成功する事象を、3回施行する
    dist_type::param_type param(3, 0.5);
    dist_type dist(param);

    // 成功回数を取得
    int result = dist(engine);
    std::cout << result << std::endl;
  }
}
```

### 出力例
```
1
2
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


