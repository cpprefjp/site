# operator()
* random[meta header]
* std[meta namespace]
* discrete_distribution[meta class]
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
確率列に基いて、ランダムな0から始まるインデックス(`0 <= i < n`)を生成して返す。


## 計算量
償却定数時間(`g()`の呼び出し回数)


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::mt19937 engine(seed_gen());

  // (1)
  {
    // 確率列
    // 0番目が返される確率 : 0.0
    // 1番目が返される確率 : 0.1
    // 2番目が返される確率 : 0.2
    // 3番目が返される確率 : 0.3
    std::discrete_distribution<> dist = {0.0, 0.1, 0.2, 0.3};

    for (int i = 0; i < 5; ++i) {
      int result = dist(engine);
      std::cout << result << std::endl;
    }
  }

  // (2) パラメータを渡すバージョン
  std::cout << std::endl;
  {
    using dist_type = std::discrete_distribution<>;
    dist_type dist;

    for (int i = 0; i < 5; ++i) {
      dist_type::param_type param = {0.0, 0.1, 0.2, 0.3};
      int result = dist(engine, param);
      std::cout << result << std::endl;
    }
  }
}
```
* dist(engine)[color ff0000]
* dist(engine, param)[color ff0000]

### 出力例
```
1
3
3
2
1

2
3
2
3
3
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
