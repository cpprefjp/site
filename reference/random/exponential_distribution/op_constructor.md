# コンストラクタ
* random[meta header]
* std[meta namespace]
* exponential_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit exponential_distribution(RealType lambda = 1.0);  // (1)
explicit exponential_distribution(const param_type& parm); // (2)
```

## 概要
- (1) : 指数分布のパラメータλ(`lambda`)を受け取るコンストラクタ。
- (2) : パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスの(1)のコンストラクタと同じオーバー�ードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。


## 要件
- (1) : `lambda > 0`であること


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // (1)
  {
    std::exponential_distribution<> dist(1.0);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << " ";
    }
  }
  std::cout << std::endl;

  // (2)
  {
    using dist_type = std::exponential_distribution<>;

    dist_type::param_type param(1.0);
    dist_type dist(param);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << " ";
    }
  }
}
```

### 出力例
```
0.142706 0.669382 2.6057 0.0438089 1.17339 0.913774 0.132838 1.13277 0.713418 0.833803 
0.290526 2.66958 1.52754 0.658299 4.5345 0.241516 0.926265 0.531413 0.614092 2.09178 
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


