#コンストラクタ
* random[meta header]
* std[meta namespace]
* discrete_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
discrete_distribution();

template<class InputIterator>
discrete_distribution(InputIterator firstW, InputIterator lastW);

discrete_distribution(initializer_list<double> wl);

template<class UnaryOperation>
discrete_distribution(size_t nw, double xmin, double xmax, UnaryOperation fw);

explicit discrete_distribution(const param_type& parm);
```
* initializer_list[link /reference/initializer_list.md]

##discrete_distributionオブジェクトの構築
- `discrete_distribution();`

デフォルトコンストラクタ。確率列の要素数を1、0番目の確率を1で初期化する。  
このコンストラクタで構築された場合、乱数生成は常に0を返す。


- `template<class InputIterator>`<br/>`discrete_distribution(InputIterator firstW, InputIterator lastW);`

確率列の範囲を受け取るコンストラクタ。受け取った範囲を、乱数生成のパラメータとして保持する。  
`firstW == lastW`の場合(要素数0の場合)、確率列の要素数1、0番目の確率を1で初期化し、乱数生成が常に0を返すようになる。  

要件： `InputIterator`の要素型が、double型に変換可能であること。 
  
  
 
- `discrete_distribution(initializer_list<double> wl);`

確率列の初期化子リストを受け取るコンストラクタ。受け取ったリストの範囲を、乱数生成のパラメータとして保持する。  
`discrete_distribution(wl.begin(), wl.end())` と同じ効果を持つ。 
  
  
- `template<class UnaryOperation>`<br/>`discrete_distribution(size_t nw, double xmin, double xmax, UnaryOperation fw);`

確率値の範囲を受け取るコンストラクタ。  
`nw`は確率列の要素数、`xmin`は最小確率、`xmax`は最大確率、`fw`は確率列それぞれのインデックスに対する確率値を求めるための単項関数オブジェクトである。`UnaryOperation`関数オブジェクトは、`double`型に変換可能な確率値を受け取り、新たな確率値を返す。
  
以下の公式で確率列を構築する。δの値を`0 < δ = (xmax−xmin)/n`として、`k番目の確率 = fw(xmin + k・δ + δ/2)`。  
`nw`が0だった場合、確率列の要素数を1、0番目の確率を1で初期化する。

計算量：`fw`関数オブジェクトの呼び出しが、要素数nを超えないものとする。 
  
  
- `explicit discrete_distribution(const param_type& parm);`

パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスのコンストラクタと同じオーバーロードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。 

##例
```cpp
#include <iostream>
#include <random>
#include <vector>

int main()
{
  std::random_device seed_gen;
  std::mt19937 engine(seed_gen());

  // discrete_distribution();
  {
    std::discrete_distribution<> dist;

    int result = dist(engine);
    std::cout << "default constructor : " << result << std::endl;
  }

  // template<class InputIterator>
  // discrete_distribution(InputIterator firstW, InputIterator lastW);
  {
    std::vector<double> probabilities = {0.1, 0.2, 0.3};
    std::discrete_distribution<> dist(
      probabilities.begin(),
      probabilities.end()
    );

    int result = dist(engine);
    std::cout << "iterator range constructor : " << result << std::endl;
  }

  // discrete_distribution(initializer_list<double> wl);
  {
    std::discrete_distribution<> dist = {0.1, 0.2, 0.3};

    int result = dist(engine);
    std::cout << "initializer list constructor : " << result << std::endl;
  }

  // template<class UnaryOperation>
  // discrete_distribution(size_t nw, double xmin, double xmax, UnaryOperation fw);
  {
    std::discrete_distribution<> dist(10, 0.1, 1.0, [](double prob) {
      std::cout << "  probability : " << prob << std::endl;
      return prob;
    });

    int result = dist(engine);
    std::cout << "min-max constructor : " << result << std::endl;
  }

  // explicit discrete_distribution(const param_type& parm);
  {
    typedef std::discrete_distribution<> dist_type;

    // 初期化子リストで確率列を作成
    dist_type::param_type param = {0.1, 0.2, 0.3};
    dist_type dist(param);

    int result = dist(engine);
    std::cout << "parameter constructor : " << result << std::endl;
  }
}
```


###出力例
```
default constructor : 0
iterator range constructor : 1
initializer list constructor : 2
  probability : 0.145
  probability : 0.235
  probability : 0.325
  probability : 0.415
  probability : 0.505
  probability : 0.595
  probability : 0.685
  probability : 0.775
  probability : 0.865
  probability : 0.955
min-max constructor : 3
parameter constructor : 2
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


