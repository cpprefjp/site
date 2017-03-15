# operator()
* random[meta header]
* std[meta namespace]
* exponential_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template <class URNG>
result_type operator()(URNG& g);                         // (1)

template <class URNG>
result_type operator()(URNG& g, const param_type& parm); // (2)
```

## 概要
- (1) : コンストラクタで指定されたパラメータに基いて、乱数生成を行う
- (2) : コンストラクタで設定されたパラメータの代わりに、`param`を乱数生成のパラメータとして使用して乱数生成を行う


## 戻り値
指定されたパラメータに基いて、指数分布したランダムな値を生成して返す。


## 計算量
償却定数時間(`g()`の呼び出し回数)


## 例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // (1)
  {
    std::exponential_distribution<> dist(1.0);

    for (int i = 0; i < 5; ++i) {
      double result = dist(engine);
      std::cout << result << std::endl;
    }
  }

  // (2) パラメータを渡すバージョン
  std::cout << std::endl;
  {
    using dist_type = std::exponential_distribution<>;
    dist_type dist;

    for (int i = 0; i < 5; ++i) {
      dist_type::param_type param(1.0);
      double result = dist(engine, param);
      std::cout << result << std::endl;
    }
  }
}
```
* dist(engine)[color ff0000]
* dist(engine, param)[color ff0000]
* std::random_device[link /reference/random/random_device.md]
* seed_gen()[link /reference/random/random_device/op_call.md]
* std::default_random_engine[link /reference/random/default_random_engine.md]

### 出力例
```
0.458079
0.979826
0.357951
0.836081
0.140822

0.209323
0.793473
0.00215867
0.182833
0.979625
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


## 参照


