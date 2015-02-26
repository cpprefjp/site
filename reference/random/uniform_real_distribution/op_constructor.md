#コンストラクタ (C++11)
* random[meta header]
* std[meta namespace]
* uniform_real_distribution[meta class]

```cpp
explicit uniform_real_distribution(RealType a = 0.0, RealType b = 1.0);
explicit uniform_real_distribution(const param_type& parm);
```

##`uniform_real_distribution`オブジェクトの構築
- `explicit uniform_real_distribution(RealType a = 0.0, RealType b = 1.0);`

値を生成する範囲として最小値`a`および最大値`b`を受け取るコンストラクタ。 
`a`以上`b`未満(`[a, b)`)の値が生成される。 

要件： `a <= b`かつ`b - a <= `[`numeric_limits`](/reference/limits/numeric_limits.md)`<RealType>::`[`max()`](/reference/limits/numeric_limits/max.md)であること。


- `explicit uniform_real_distribution(const param_type& parm);`

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
    // 0.0以上1.0未満の範囲で、値を等確率で生成する
    std::uniform_real_distribution<> dist(0.0, 1.0);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << " ";
    }
  }
  std::cout << std::endl;

  // パラメータを通して範囲指定する
  {
    typedef std::uniform_real_distribution<> dist_type;

    // 0.0以上1.0未満の範囲で、値を等確率で生成する
    dist_type::param_type param(0.0, 1.0);
    dist_type dist(param);

    for (int i = 0; i < 10; ++i) {
      std::cout << dist(engine) << " ";
    }
  }
}
```


###出力例
```
0.339729 0.568455 0.156581 0.0936911 0.812806 0.82151 0.995539 0.13173 0.785655 0.807546 
0.749615 0.572052 0.75852 0.204536 0.536476 0.478522 0.473927 0.0672362 0.709408 0.18254 
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


