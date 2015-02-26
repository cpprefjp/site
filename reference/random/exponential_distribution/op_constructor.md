#コンストラクタ (C++11)
* random[meta header]
* std[meta namespace]
* exponential_distribution[meta class]

```cpp
explicit exponential_distribution(RealType lambda = 1.0);
explicit exponential_distribution(const param_type& parm);
```

##`exponential_distribution`オブジェクトの構築
- `explicit exponential_distribution(RealType lambda = 1.0);`

指数分布のパラメータλ(`lambda`)を受け取るコンストラクタ。 

要件： `lambda > 0`であること。


- `explicit exponential_distribution(const param_type& parm);`

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
    std::exponential_distribution<> dist(1.0);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << " ";
    }
  }
  std::cout << std::endl;

  // パラメータを通して範囲指定する
  {
    typedef std::exponential_distribution<> dist_type;

    dist_type::param_type param(1.0);
    dist_type dist(param);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << " ";
    }
  }
}
```


###出力例
```
0.142706 0.669382 2.6057 0.0438089 1.17339 0.913774 0.132838 1.13277 0.713418 0.833803 
0.290526 2.66958 1.52754 0.658299 4.5345 0.241516 0.926265 0.531413 0.614092 2.09178 
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


