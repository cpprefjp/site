#コンストラクタ
* random[meta header]
* std[meta namespace]
* geometric_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit geometric_distribution(double p = 0.5);
explicit geometric_distribution(const param_type& parm);
```

##`geometric_distribution`オブジェクトの構築
- `explicit geometric_distribution(double p = 0.5);`

一度の事象が成功する確率`p`を受け取るコンストラクタ。 

要件： `p > 0.0 && p < 1.0`であること。(`p == 0`だと無限ループになってしまうため)


- `explicit geometric_distribution(const param_type& parm);`

パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスのコンストラクタと同じオーバーロードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。 


##例
```cpp
#include <iostream>
#include <random>

int main() 
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // パラメータを個別に指定する
  {
    // 確率0.5で成功する事象を、成功するまで施行する
    std::geometric_distribution<> dist(0.5);

    // 成功するまでに失敗した回数を取得
    int result = dist(engine);
    std::cout << result << std::endl;
  }

  // パラメータを通して範囲指定する
  {
    typedef std::geometric_distribution<> dist_type;

    // 確率0.5で成功する事象を、成功するまで施行する
    dist_type::param_type param(0.5);
    dist_type dist(param);

    // 成功するまでに失敗した回数を取得
    int result = dist(engine);
    std::cout << result << std::endl;
  }
}
```


###出力例
```
2
1
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


