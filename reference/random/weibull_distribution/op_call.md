#operator()(C++11)
```cpp
template <class URNG>
result_type operator()(URNG& g);

template <class URNG>
result_type operator()(URNG& g, const param_type& parm);
```

##概要
指定されたパラメータに基いて、乱数生成を行う。

パラメータを受け取るバージョンは、コンストラクタで設定されたパラメータの代わりに、`param`を乱数生成のパラメータとして使用する。


##戻り値
指定されたパラメータに基いて、分布したランダムな値を生成して返す。  


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
    std::weibull_distribution<> dist(1.0, 1.0);

    for (int i = 0; i < 5; ++i) {
      double result = dist(engine);
      std::cout << result << std::endl;
    }
  }

  // パラメータを渡すバージョン
  std::cout << std::endl;
  {
    typedef std::weibull_distribution<> dist_type;
    dist_type dist;

    for (int i = 0; i < 5; ++i) {
      dist_type::param_type param(1.0, 1.0);
      double result = dist(engine, param);
      std::cout << result << std::endl;
    }
  }
}
```


###出力例
```
4.54084
0.437302
0.564798
0.316922
2.35899

0.762778
0.7511
2.63546
0.288603
0.265658
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


