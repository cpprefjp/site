#operator() (C++11)
* random[meta header]
* std[meta namespace]

```cpp
template <class URNG>
result_type operator()(URNG& g);

template <class URNG>
result_type operator()(URNG& g, const param_type& parm);
```

##概要
区間列と重み列に基いて、乱数生成を行う。

パラメータを受け取るバージョンは、コンストラクタで設定されたパラメータの代わりに、`param`を乱数生成のパラメータとして使用する。


##戻り値
区間列と重み列に基いて、ランダムな実数値を生成して返す。


##計算量
償却定数時間(`g()`の呼び出し回数)


##例
```cpp
#include <iostream>
#include <random>
#include <array>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // [0.0, 5.0)の値は、出現確率が0.0から0.5まで線形に上昇する。
  // [5.0, 10.0)の値は、出現確率が0.5から0.1まで線形に減少する。
  std::array<double, 3> intervals = {0.0, 5.0, 10.0};
  std::array<double, 3> densities = {0.0, 0.5,  0.1};

  {
    std::piecewise_linear_distribution<> dist(
      intervals.begin(),
      intervals.end(),
      densities.begin()
    );

    for (int i = 0; i < 5; ++i) {
      double result = dist(engine);
      std::cout << result << std::endl;
    }
  }

  // パラメータを渡すバージョン
  std::cout << std::endl;
  {
    typedef std::piecewise_linear_distribution<> dist_type;
    dist_type dist;

    for (int i = 0; i < 5; ++i) {
      dist_type::param_type param(
        intervals.begin(),
        intervals.end(),
        densities.begin()
      );

      double result = dist(engine, param);
      std::cout << result << std::endl;
    }
  }
}
```


###出力例
```
7.45002
5.98528
7.25169
5.60786
4.08141

8.6389
5.07127
1.86764
9.35429
2.78565
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


