#operator() (C++11)
```cpp
template <class URNG>
result_type operator()(URNG& g);

template <class URNG>
result_type operator()(URNG& g, const param_type& parm);
```

##概要
確率列に基いて、乱数生成を行う。

パラメータを受け取るバージョンは、コンストラクタで設定されたパラメータの代わりに、`param`を乱数生成のパラメータとして使用する。

##戻り値
確率列に基いて、ランダムな0から始まるインデックス(`0 <= i < n`)を生成して返す。


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
    // 確率列
    // 0番目が返される確率 : 0.0
    // 1番目が返される確率 : 0.1
    // 2番目が返される確率 : 0.2
    // 3番目が返される確率 : 0.3
    std::discrete_distribution<> dist = {0.0, 0.1, 0.2, 0.3};

    for (int i = 0; i < 5; ++i) {
      int result = dist(engine);
      std::cout << result << std::endl;
    }
  }

  // パラメータを渡すバージョン
  std::cout << std::endl;
  {
    typedef std::discrete_distribution<> dist_type;
    dist_type dist;

    for (int i = 0; i < 5; ++i) {
      dist_type::param_type param = {0.0, 0.1, 0.2, 0.3};
      int result = dist(engine, param);
      std::cout << result << std::endl;
    }
  }
}
```


###出力例
```
1
3
3
2
1

2
3
2
3
3
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


