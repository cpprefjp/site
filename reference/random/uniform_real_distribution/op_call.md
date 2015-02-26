#operator() (C++11)
* random[meta header]

```cpp
template <class URNG>
result_type operator()(URNG& g);

template <class URNG>
result_type operator()(URNG& g, const param_type& parm);
```

##概要
指定された値の範囲に基いて、乱数生成を行う。

パラメータを受け取るバージョンは、コンストラクタで設定されたパラメータの代わりに、`param`を乱数生成のパラメータとして使用する。


##戻り値
指定された値の範囲に基いて、等確率でランダムな値を生成して返す。  
値の範囲は `a <= i < b` である。つまり、範囲の最小値を含み、最大値を含まない。


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

  {
    std::uniform_real_distribution<> dist(0.0, 1.0);

    for (int i = 0; i < 5; ++i) {
      double result = dist(engine);
      std::cout << result << std::endl;
    }
  }

  // パラメータを渡すバージョン
  std::cout << std::endl;
  {
    typedef std::uniform_real_distribution<> dist_type;
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
0.254291
0.567725
0.240681
0.164293
0.227867

0.576028
0.549507
0.901166
0.716245
0.272544
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


