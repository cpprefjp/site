# コンストラクタ
* random[meta header]
* std[meta namespace]
* discrete_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
discrete_distribution();                                          // (1)

template <class InputIterator>
discrete_distribution(InputIterator firstW, InputIterator lastW); // (2)

discrete_distribution(initializer_list<double> wl);               // (3)

template <class UnaryOperation>
discrete_distribution(size_t nw,
                      double xmin,
                      double xmax, UnaryOperation fw);            // (4)

explicit discrete_distribution(const param_type& parm);           // (5)
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
- (1) : デフォルトコンストラクタ。確率列の要素数を1、0番目の確率を1で初期化する。
    - このコンストラクタで構築された場合、乱数生成は常に0を返す。
- (2) : 確率列の範囲を受け取るコンストラクタ。受け取った範囲を、乱数生成のパラメータとして保持する。
    - `firstW == lastW`の場合(要素数0の場合)、確率列の要素数1、0番目の確率を1で初期化し、乱数生成が常に0を返すようになる。
- (3) : 確率列の初期化�リストを受け取るコンストラクタ。受け取ったリストの範囲を、乱数生成のパラメータとして保持する。
    - `discrete_distribution(wl.begin(), wl.end())` と同じ効果を持つ。
- (4) : 確率値の範囲を受け取るコンストラクタ。
    - `nw`は確率列の要素数、`xmin`は最小確率、`xmax`は最大確率、`fw`は確率列それぞれのインデックスに対する確率値を求めるための単項関数オブジェクトである。`UnaryOperation`関数オブジェクトは、`double`型に変換可能な確率値を受け取り、新たな確率値を返す。
    - 以下の公式で確率列を構築する。δの値を`0 < δ = (xmax−xmin)/n`として、`k番目の確率 = fw(xmin + k・δ + δ/2)`。
    - `nw`が0だった場合、確率列の要素数を1、0番目の確率を1で初期化する。
- (5) : パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスの(5)以外のコンストラクタと同じオーバー�ードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。


## 要件
- (2) : `InputIterator`の要素型が、double型に変換可能であること。


## 計算量
- (4) : `fw`関数オブジェクトの呼び出しが、要素数nを超えないものとする。


## 例
```cpp example
#include <iostream>
#include <random>
#include <vector>

int main()
{
  std::random_device seed_gen;
  std::mt19937 engine(seed_gen());

  // (1)
  {
    std::discrete_distribution<> dist;

    int result = dist(engine);
    std::cout << "default constructor : " << result << std::endl;
  }

  // (2)
  {
    std::vector<double> probabilities = {0.1, 0.2, 0.3};
    std::discrete_distribution<> dist(
      probabilities.begin(),
      probabilities.end()
    );

    int result = dist(engine);
    std::cout << "iterator range constructor : " << result << std::endl;
  }

  // (3)
  {
    std::discrete_distribution<> dist = {0.1, 0.2, 0.3};

    int result = dist(engine);
    std::cout << "initializer list constructor : " << result << std::endl;
  }

  // (4)
  {
    std::discrete_distribution<> dist(10, 0.1, 1.0, [](double prob) {
      std::cout << "  probability : " << prob << std::endl;
      return prob;
    });

    int result = dist(engine);
    std::cout << "min-max constructor : " << result << std::endl;
  }

  // (5)
  {
    using dist_type = std::discrete_distribution<>;

    // 初期化�リストで確率列を作成
    dist_type::param_type param = {0.1, 0.2, 0.3};
    dist_type dist(param);

    int result = dist(engine);
    std::cout << "parameter constructor : " << result << std::endl;
  }
}
```
* probabilities.begin()[link /reference/vector/vector/begin.md]
* probabilities.end()[link /reference/vector/vector/end.md]

### 出力例
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

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照


