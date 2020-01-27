# operator()
* random[meta header]
* std[meta namespace]
* student_t_distribution[meta class]
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
指定されたパラメータに基いて、ランダムな値を生成して返す。


## 計算量
償却定数時間(`g()`の呼び出し回数)


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // (1)
  {
    std::student_t_distribution<> dist(1.0);

    for (int i = 0; i < 5; ++i) {
      double result = dist(engine);
      std::cout << result << std::endl;
    }
  }

  // (2) パラメータを渡すバージョン
  std::cout << std::endl;
  {
    using dist_type = std::student_t_distribution<>;
    dist_type dist;

    for (int i = 0; i < 5; ++i) {
      dist_type::param_type param(1.0);
      double result = dist(engine, param);
      std::cout << result << std::endl;
    }
  }
}
```
* dist(engine)[color ff0000]
* dist(engine, param)[color ff0000]

### 出力例
```
-0.392587
0.504807
0.00680619
-522.819
-46.2201

-2.07723
-0.305813
-1.41927
-0.430027
1.64272
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
