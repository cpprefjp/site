#コンストラクタ (C++11)
```cpp
explicit chi_squared_distribution(RealType n = 1);
explicit chi_squared_distribution(const param_type& parm);
```

##`chi_squared_distribution`オブジェクトの構築
- `explicit chi_squared_distribution(RealType n = 1);`

自由度`n`を受け取るコンストラクタ。 

要件： `n > 0`であること。


- `explicit chi_squared_distribution(const param_type& parm);`

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
    // 自由度1.0で分布させる
    std::chi_squared_distribution<> dist(1.0);

    for (int i = 0; i < 10; ++i) {
      double result = dist(engine);
      std::cout << result << std::endl;
    }
  }
  std::cout << std::endl;

  // パラメータを通して範囲指定する
  {
    typedef std::chi_squared_distribution<> dist_type;

    // 自由度1.0で分布させる
    dist_type::param_type param(1.0);
    dist_type dist(param);

    for (int i = 0; i < 10; ++i) {
      double result = dist(engine);
      std::cout << result << std::endl;
    }
  }
}
```


###出力例
```
1.0849
0.309153
0.110272
1.49593
7.62756
0.927176
0.650995
2.0861
0.0401504

0.333507
0.0314703
0.00229207
0.236144
0.211284
0.00129288
0.042014
0.000154981
0.560326
2.61903
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


