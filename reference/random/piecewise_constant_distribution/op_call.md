# operator()
* random[meta header]
* std[meta namespace]
* piecewise_constant_distribution[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class URBG>
result_type operator()(URBG& g);                         // (1)

template <class URBG>
result_type operator()(URBG& g, const param_type& parm); // (2)
```

## 概要
- (1) : コンストラクタで指定されたパラメータに基いて、乱数生成を行う
- (2) : コンストラクタで�定されたパラメータの代わりに、`param`を乱数生成のパラメータとして使用して乱数生成を行う


## 戻り値
区間列と重み列に基いて、ランダムな実数値を生成して返す。


## 計算量
償却定数時間(`g()`の呼び出し回数)


## 例
```cpp example
#include <iostream>
#include <random>
#include <array>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // [0.0, 0.5)の値は、確率0.3で出現する。
  // [0.5, 1.0)の値は、確率0.5で出現する。
  std::array<double, 3> intervals = {0.0, 0.5, 1.0};
  std::array<double, 2> densities = {0.3, 0.5};

  // (1)
  {
    std::piecewise_constant_distribution<> dist(
      intervals.begin(),
      intervals.end(),
      densities.begin()
    );

    for (int i = 0; i < 5; ++i) {
      double result = dist(engine);
      std::cout << result << std::endl;
    }
  }

  // (2) パラメータを渡すバージョン
  std::cout << std::endl;
  {
    using dist_type = std::piecewise_constant_distribution<>;
    dist_type dist;

    for (int i = 0; i < 5; ++i) {
      dist_type::param_type param(
        intervals.begin(),
        intervals.end(),
        densities.begin()
      );

      double result = dist(engine, param);
      std::cout << result << std::endl;
    }
  }
}
```
* dist(engine)[color ff0000]
* dist(engine, param)[color ff0000]
* intervals.begin()[link /reference/array/array/begin.md]
* intervals.end()[link /reference/array/array/end.md]
* densities.begin()[link /reference/array/array/begin.md]


### 出力例
```
0.567734
0.516554
0.74211
0.569653
0.808534

0.271355
0.202127
0.596908
0.425977
0.435703
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
- [P0346R1 A `<random>` Nomenclature Tweak](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0346r1.pdf)
    - URNGをURBGに変更
