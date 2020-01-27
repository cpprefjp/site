# chi_squared_distribution
* random[meta header]
* std[meta namespace]
* class template[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class RealType = double>
  class chi_squared_distribution;
}
```

## 概要
`chi_squared_distribution`は、乱数をカイ二乗分布(χ二乗分布、χ²分布)させるクラスである。以下の確率密度関数に基いて、浮動小数点数の乱数を生成する。

$$ p(x \mid n) = \frac{x^{n/2 - 1} \cdot e^{-x/2}}{\Gamma (n/2) \cdot 2^{n/2}} $$

この確率密度関数において、nは自由度(degrees of freedom)を意味する。


カイ二乗分布は、以下のような用途に使用できる：

- 赤玉20個、白玉20個が混ざった箱から、20個の玉を取り出す。その際の、期待値(赤玉10個、白玉10個)からのずれの度合いを判定する。
- 異なる世代で、1ヶ月に利用する携帯電話の利用時間に差が出るか判定する。
- これらの用途を一般化すると、χ²検定(chi-square test)やフリードマン検定(Friedman test)といった科�的検定に分類される。

上記の例では、自由度は1となる(玉の種類(2) - 1)。玉の種類が3の場合は自由度2になる。


テンプレートパラメータは、以下を意味する：

- `RealType` : 生成する実数の型。


## メンバ関数
### 構築・リセット

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------------------|--------------------|-------|
| [`(constructor)`](chi_squared_distribution/op_constructor.md)           | コンストラクタ     | C++11 |
| `~chi_squared_distribution() = default;`                                  | デストラクタ       | C++11 |
| [`reset`](chi_squared_distribution/reset.md)                            | 状態をリセットする | C++11 |


### 生成

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------|----------------|-------|
| [`operator()`](chi_squared_distribution/op_call.md) | 乱数を生成する | C++11 |


### プ�パティ

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|----------------------------------|-------|
| [`n`](chi_squared_distribution/n.md)         | 分布の自由度を取得する           | C++11 |
| [`param`](chi_squared_distribution/param.md) | 分布のパラメータを取得／�定する | C++11 |
| [`min`](chi_squared_distribution/min.md)     | 生成し得る値の下限を取得する   | C++11 |
| [`max`](chi_squared_distribution/max.md)     | 生成し得る値の上限を取得する   | C++11 |


## メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 乱数生成結果の実数型 `RealType`。 | C++11 |
| `param_type`  | 分布パラメータの型。未規定。 | C++11 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------------|----------------------|-------|
| [`operator==`](chi_squared_distribution/op_equal.md)     | �値比較             | C++11 |
| [`operator!=`](chi_squared_distribution/op_not_equal.md) | 非�値比較           | C++11 |
| [`operator<<`](chi_squared_distribution/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](chi_squared_distribution/op_istream.md)   | ストリームからの入力 | C++11 |


## 例
```cpp example
#include <fstream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // 自由度1で分布させる
  std::chi_squared_distribution<> dist(1.0);

  std::ofstream file("chi_squared_distribution.tsv");
  for (size_t n = 0; n < 1024; ++n) {
    // カイ二乗分布で乱数を生成する
    double result = dist(engine);
    file << result << "\n";
  }
}
```
* std::chi_squared_distribution[color ff0000]
* std::ofstream[link /reference/fstream/basic_ofstream.md]
* dist(engine)[link chi_squared_distribution/op_call.md]

### 出力
```
```

このプ�グラムによってある時に得られた結果（[chi_squared_distribution.tsv](https://github.com/cpprefjp/image/raw/master/reference/random/chi_squared_distribution/chi_squared_distribution.tsv)）を図示する。

![](https://github.com/cpprefjp/image/raw/master/reference/random/chi_squared_distribution/chi_squared_distribution.png)

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 
- [GCC](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 

### 参考
- [カイ二乗分布 - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%AB%E3%82%A4%E4%BA%8C%E4%B9%97%E5%88%86%E5%B8%83)
- [χ2（カイ２乗）分布](http://staff.aist.go.jp/t.ihara/chi2.html)
- [カイ２乗分布とは](http://ogawas.cerp.u-toyama.ac.jp/e-stat/kai.html)

