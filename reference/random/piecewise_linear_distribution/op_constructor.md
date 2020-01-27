# コンストラクタ
* random[meta header]
* std[meta namespace]
* piecewise_linear_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
piecewise_linear_distribution();                                // (1)

template <class InputIteratorB, class InputIteratorW>
piecewise_linear_distribution(InputIteratorB firstB,
                              InputIteratorB lastB,
                              InputIteratorW firstW);           // (2)

template <class UnaryOperation>
piecewise_linear_distribution(std::initializer_list<RealType> bl,
                              UnaryOperation fw);               // (3)

template <class UnaryOperation>
piecewise_linear_distribution(std::size_t nw,
                              RealType xmin,
                              RealType xmax,
                              UnaryOperation fw);               // (4)

explicit piecewise_linear_distribution(const param_type& parm); // (5)
```

## 概要
- (1) : デフォルトコンストラクタ。区間数列を`{0.0, 1.0}`、重み数列を`{1.0, 1.0}`として構築し、`[0.0, 1.0)`の一様分布とする。
- (2) : 区間数列の範囲`[firstB, lastB)`および重み数列の範囲の先�`firstW`を受け取るコンストラクタ。これら数列によって、区間ごとの値を、線形に変化する確率によって生成する分布オブジェクトを構築する。
    - 範囲`[firstB, lastB)`の要素数が`1`以下の場合、区間数列を`{0.0, 1.0}`、重み数列を`{1.0, 1.0}`として構築し、`[0.0, 1.0)`の一様分布とする。
- (3) : 区間数列`bl`および重み付けを計算する関数オブジェクト`fw`を受け取るコンストラクタ。
    - 重み付け数列は、`[bl.begin(), bl.end())`の各要素`b`に対し、式`fw(b)`で返された重みから構築する。
- (4) : 区間値の範囲を受け取るコンストラクタ。
    - `nw`は区間列の要素数、`xmin`は区間の最小値、`xmax`は区間の最大値、`fw`は区間列それぞれのインデックスに対する重み値を求めるための単項関数オブジェクトである。`UnaryOperation`関数オブジェクトは、`double`型に変換可能な区間値を受け取り、その区間に対する確率値を返す。
    - 以下の公式で確率列を構築する。δの値を`0 < δ = (xmax−xmin)/n`として、`k番目の確率 = fw(xmin + k)`。
    - `nw`が1以下だった場合、区間数列を`{0.0, 1.0}`、重み数列を`{1.0, 1.0}`として構築し、`[0.0, 1.0)`の一様分布とする。
- (5) : パラメータオブジェクトを受け取るコンストラクタ。`param_type`は、このクラスの(5)以外のコンストラクタと同じオーバー�ードを持ち、それらのコンストラクタのパラメータを保持している。このコンストラクタでは、`param`オブジェクトが持っているパラメータを、このクラスのコンストラクタに転送する。


## 要件
- (2) : `InputIteratorB`と`InputIteratorW`の要素型が、`double`型に変換可能であること
- (3) : `UnaryOperation`関数オブジェクトは、`double`に変換可能な型を返すこと


## 計算量
- (3), (4) : `fw`関数オブジェクトの呼び出し回数が、要素数`n`を超えないものとする


## 例
```cpp example
#include <iostream>
#include <random>
#include <array>

double always_one(double)
  { return 1.0; }

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // (1)
  {
    std::piecewise_linear_distribution<> dist;

    double result = dist(engine);
    std::cout << "default constructor : " << result << std::endl;
  }

  // (2)
  {
    std::array<double, 3> intervals = {0.0, 0.5, 1.0}; // 区間数列
    std::array<double, 3> densities = {0.0, 0.5, 0.0}; // 重み数列

    std::piecewise_linear_distribution<> dist(
      intervals.begin(),
      intervals.end(),
      densities.begin()
    );

    double result = dist(engine);
    std::cout << "iterator range constructor : " << result << std::endl;
  }

  // (3)
  {
    std::piecewise_linear_distribution<> dist(
      {0.0, 1.0},
      always_one
    );

    double result = dist(engine);
    std::cout << "initializer list constructor : " << result << std::endl;
  }

  // (4)
  {
    std::piecewise_linear_distribution<> dist(
      10,
      0.0,
      1.0,
      always_one
    );

    double result = dist(engine);
    std::cout << "min-max constructor : " << result << std::endl;
  }

  // (5)
  {
    using dist_type = std::piecewise_linear_distribution<>;

    std::array<double, 3> intervals = {0.0, 0.5, 1.0}; // 区間数列
    std::array<double, 3> densities = {0.0, 0.5, 0.0}; // 重み数列

    dist_type::param_type param(intervals.begin(), intervals.end(), densities.begin());
    dist_type dist(param);

    double result = dist(engine);
    std::cout << "parameter constructor : " << result << std::endl;
  }
}
```
* intervals.begin()[link /reference/array/array/begin.md]
* intervals.end()[link /reference/array/array/end.md]
* densities.begin()[link /reference/array/array/begin.md]

### 出力例
```
default constructor : 0.724384
iterator range constructor : 0.157439
initializer list constructor : 0.174376
min-max constructor : 0.411983
parameter constructor : 0.260002
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


