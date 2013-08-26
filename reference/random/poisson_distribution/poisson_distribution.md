#コンストラクタ(C++11)
```cpp
explicit poisson_distribution(double mean = 1.0);
explicit poisson_distribution(const param_type& parm);
```

##`poisson_distribution`オブジェクトの構築
- `explicit poisson_distribution(double mean = 1.0);`

平均値`mean`を受け取るコンストラクタ。 

要件： `mean > 0`であること。


- `explicit poisson_distribution(const param_type& parm);`

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
    // 平均値1.0で分布させる
    std::poisson_distribution<> dist(1.0);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << " ";
    }
  }
  std::cout << std::endl;

  // パラメータを通して範囲指定する
  {
    typedef std::poisson_distribution<> dist_type;

    // 平均値1.0で分布させる
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
3 0 0 3 1 1 1 0 0 2 
1 3 1 1 0 2 2 6 0 0 
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


