#operator()
* random[meta header]
* std[meta namespace]
* bernoulli_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template <class URNG>
result_type operator()(URNG& g);                         // (1)

template <class URNG>
result_type operator()(URNG& g, const param_type& parm); // (2)
```

##概要
- (1) : コンストラクタで指定されたパラメータに基いて、乱数生成を行う
- (2) : コンストラクタで設定されたパラメータの代わりに、`param`を乱数生成のパラメータとして使用して乱数生成を行う


##戻り値
指定された確率に基いて、ランダムな値を生成して返す。  
確率[`p()`](p.md)で`true`を生成し、確率`1 -` [`p()`](p.md)で`false`を生成する。


##計算量
償却定数時間(`g()`の呼び出し回数)


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::mt19937 engine(seed_gen());

  std::cout << std::boolalpha;

  // (1)
  {
    std::bernoulli_distribution dist(0.5);

    for (int i = 0; i < 5; ++i) {
      bool result = dist(engine);
      std::cout << result << std::endl;
    }
  }

  // (2) パラメータを渡すバージョン
  std::cout << std::endl;
  {
    typedef std::bernoulli_distribution dist_type;
    dist_type dist;

    for (int i = 0; i < 5; ++i) {
      dist_type::param_type param(0.5);
      bool result = dist(engine, param);
      std::cout << result << std::endl;
    }
  }
}
```
* dist(engine)[color ff0000]
* dist(engine, param)[color ff0000]
* std::random_device[link /reference/random/random_device.md]
* seed_gen()[link /reference/random/random_device/op_call.md]
* std::mt19937[link /reference/random/mt19937.md]

###出力例
```
false
false
false
true
true

true
false
false
true
true
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


