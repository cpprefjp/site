# weibull_distribution
* random[meta header]
* std[meta namespace]
* class template[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class RealType = double>
  class weibull_distribution;
}
```

## 概要
`weibull_distribution`は、確率分布の一種であるワイブル分布を表すクラスである。  
ワイブル分布は、物体の劣化、寿命、強度、破壊といったものを記述するために考案された分布法である。  
ワイブル分布は、以下の確率密度関数に基いて、浮動小数点数の値を生成する：

$$ p(x \mid a, b) = \frac{a}{b} \cdot \left( \frac{x}{b} \right)^{a-1} \cdot \exp \left( - \left( \frac{x}{b} \right)^{a} \right) $$

この数式においてaはワイブル係数(形状パラメータ : shape parameter)、bは尺度パラメータ(scale parameter)である。


テンプレートパラメータは、以下を意味する：

- `RealType` : 生成する実数の型。


## メンバ関数
### 構築・リセット

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------------------|--------------------|-------|
| [`(constructor)`](weibull_distribution/op_constructor.md)       | コンストラクタ     | C++11 |
| `~weibull_distribution() = default;`                              | デストラクタ       | C++11 |
| [`reset`](weibull_distribution/reset.md)                        | 状態をリセットする | C++11 |


### 生成

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------|----------------|-------|
| [`operator()`](weibull_distribution/op_call.md) | 乱数を生成する | C++11 |


### プ�パティ

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|----------------------------------|-------|
| [`a`](weibull_distribution/a.md)         | 形状母数を取得する   | C++11 |
| [`b`](weibull_distribution/b.md)         | 尺度母数を取得する | C++11 |
| [`param`](weibull_distribution/param.md) | 分布のパラメータを取得／�定する | C++11 |
| [`min`](weibull_distribution/min.md)     | 生成し得る値の下限を取得する   | C++11 |
| [`max`](weibull_distribution/max.md)     | 生成し得る値の上限を取得する   | C++11 |


## メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 乱数生成結果の実数型 `RealType`。 | C++11 |
| `param_type`  | 分布パラメータの型。未規定。 | C++11 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------------|----------------------|-------|
| [`operator==`](weibull_distribution/op_equal.md)     | �値比較             | C++11 |
| [`operator!=`](weibull_distribution/op_not_equal.md) | 非�値比較           | C++11 |
| [`operator<<`](weibull_distribution/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](weibull_distribution/op_istream.md)   | ストリームからの入力 | C++11 |


## 例
```cpp example
#include <random>
#include <fstream>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // 形状パラメータ1.0、尺度パラメータ1.0で分布させる
  std::weibull_distribution<> dist1(1.0, 1.0);

  // 形状パラメータ1.0、尺度パラメータ2.0で分布させる
  std::weibull_distribution<> dist2(1.0, 2.0);

  std::ofstream file("weibull_distribution.tsv");
  for (std::size_t n = 0; n < 1000; ++n) {
    // ワイブル分布で乱数を生成する
    double r1 = dist1(engine);
    double r2 = dist2(engine);

    file << r1 << "\t" << r2 << "\n";
  }
}
```
* std::weibull_distribution[color ff0000]
* std::ofstream[link /reference/fstream/basic_ofstream.md]
* dist1(engine)[link weibull_distribution/op_call.md]
* dist2(engine)[link weibull_distribution/op_call.md]

### 出力
```
```

このプ�グラムによってある時に得られた結果（[weibull_distribution.tsv](https://github.com/cpprefjp/image/raw/master/reference/random/weibull_distribution/weibull_distribution.tsv)）を図示する。 

![](https://github.com/cpprefjp/image/raw/master/reference/random/weibull_distribution/weibull_distribution.png)

この図において、破線はdist1(a = 1.0, b = 1.0)、実線はdist2(a = 1.0, b = 2.0)を意味する。


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 
- [GCC](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 

### 参考
- [ワイブル分布 - Wikipedia](https://ja.wikipedia.org/wiki/ワイブル分布)
- [ワイブル分布 = NtRand](http://www.ntrand.com/jp/weibull-distribution/)
- [疲労や破壊現象とワイブル分布](http://www.mogami-wire.co.jp/notes/weibull.html)

