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
指定された成功確率と試行回数に基いて、成功した回数(`0`以上`t`以下)を返す。


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
    // 確率0.5で成功する事象を3回施行する
    std::binomial_distribution<> dist(3, 0.5);

    // 成功回数を取得
    int result = dist(engine);
    std::cout << result << std::endl;
  }

  // パラメータを渡すバージョン
  {
    typedef std::binomial_distribution<> dist_type;
    dist_type dist;

    // 確率0.5で成功する事象を3回施行する
    dist_type::param_type param(3, 0.5);

    // 成功回数を取得
    int result = dist(engine, param);
    std::cout << result << std::endl;
  }
}
```


###出力例
```
3
1
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


