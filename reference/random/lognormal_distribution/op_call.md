#operator()
* random[meta header]
* std[meta namespace]
* lognormal_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template <class URNG>
result_type operator()(URNG& g);

template <class URNG>
result_type operator()(URNG& g, const param_type& param);
```

##概要
指定されたパラメータに基いて、乱数生成を行う。

パラメータを受け取るバージョンは、コンストラクタで設定されたパラメータの代わりに、`param`を乱数生成のパラメータとして使用する。


##戻り値
指定された平均値と標準偏差に基いて、ランダムな値を生成して返す。  


##計算量
償却定数時間(`g()`の呼び出し回数)


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  {
    std::lognormal_distribution<> dist(0.0, 1.0);

    for (int i = 0; i < 5; ++i) {
      double result = dist(engine);
      std::cout << result << std::endl;
    }
  }

  // パラメータを渡すバージョン
  std::cout << std::endl;
  {
    typedef std::lognormal_distribution<> dist_type;
    dist_type dist;

    for (int i = 0; i < 5; ++i) {
      dist_type::param_type param(0.0, 1.0);
      double result = dist(engine, param);
      std::cout << result << std::endl;
    }
  }
}
```


###出力例
```
0.357173
3.09215
1.02832
0.432941
0.866415

0.0908557
2.71912
1.82336
1.07507
2.5141
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


