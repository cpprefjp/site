#コンストラクタ (C++11)
* random[meta header]
* std[meta namespace]
* uniform_int_distribution[meta class]

```cpp
explicit uniform_int_distribution(IntType a = 0, IntType b = numeric_limits<IntType>::max());
explicit uniform_int_distribution(const param_type& parm);
```
* numeric_limits[link /reference/limits/numeric_limits.md]
* max[link /reference/limits/numeric_limits/max.md]

##`uniform_int_distribution`オブジェクトの構築
- `explicit uniform_int_distribution(IntType a = 0, IntType b = numeric_limits<IntType>::max());`

値を生成する範囲として最小値`a`および最大値`b`を受け取るコンストラクタ。 
`a`以上`b`以下(`[a, b]`)の値が生成される。 

要件： `a <= b`であること。


- `explicit uniform_int_distribution(const param_type& parm);`

パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスのコンストラクタと同じオーバーロードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。 


##例
```cpp
#include <iostream>
#include <random>

int main() 
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // 範囲を指定する
  {
    // 0以上3以下の範囲で、値を等確率で生成する
    std::uniform_int_distribution<> dist(0, 3);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << " ";
    }
  }
  std::cout << std::endl;

  // パラメータを通して範囲指定する
  {
    typedef std::uniform_int_distribution<> dist_type;

    // 0以上3以下の範囲で、値を等確率で生成する
    dist_type::param_type param(0, 3);
    dist_type dist(param);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << " ";
    }
  }
}
```


###出力例
```
0 2 3 3 3 0 0 1 3 2 
0 0 1 0 1 3 2 0 3 1 
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


