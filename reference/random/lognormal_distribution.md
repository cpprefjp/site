# lognormal_distribution
* random[meta header]
* std[meta namespace]
* class template[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class RealType = double>
  class lognormal_distribution;
}
```

## 概要
`lognormal_distribution`は、乱数を対数�規分布させるクラスである。 
対数�規分布はその名のとおり、�規分布に対数を付けたものである。以下の確率密度関数に基いて、浮動小数点数の乱数を生成する：  

$$ p(x \mid m, s) = \frac{1}{sx \sqrt{2 \pi} } \cdot \exp \left( - \frac{(\ln x - m)^2}{2s^2} \right) $$

この確率密度関数において、mは平均(mean)、sは標準偏差(standard deviation)を表す。


対数�規分布は、以下のような用途に使用できる：

- 株価
- 社員の給与アップ(スタートは同じでも、給与が上がる人数は減少していく)


テンプレートパラメータは、以下を意味する：

- `RealType` : 生成する実数の型。


## メンバ関数
### 構築・リセット

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------------------------|--------------------|-------|
| [`(constructor)`](lognormal_distribution/op_constructor.md)         | コンストラクタ     | C++11 |
| `~lognormal_distribution() = default;`                                | デストラクタ       | C++11 |
| [`reset`](lognormal_distribution/reset.md)                          | 状態をリセットする | C++11 |


### 生成

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------|----------------|-------|
| [`operator()`](lognormal_distribution/op_call.md) | 乱数を生成する | C++11 |


### プ�パティ

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|----------------------------------|-------|
| [`m`](lognormal_distribution/m.md)         | 分布の平均値を取得する   | C++11 |
| [`s`](lognormal_distribution/s.md)         | 分布の標準偏差を取得する | C++11 |
| [`param`](lognormal_distribution/param.md) | 分布のパラメータを取得／�定する | C++11 |
| [`min`](lognormal_distribution/min.md)     | 生成し得る値の下限を取得する   | C++11 |
| [`max`](lognormal_distribution/max.md)     | 生成し得る値の上限を取得する   | C++11 |


## メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 乱数生成結果の実数型 `RealType`。 | C++11 |
| `param_type`  | 分布パラメータの型。未規定。 | C++11 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------------|----------------------|-------|
| [`operator==`](lognormal_distribution/op_equal.md)     | �値比較             | C++11 |
| [`operator!=`](lognormal_distribution/op_not_equal.md) | 非�値比較           | C++11 |
| [`operator<<`](lognormal_distribution/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](lognormal_distribution/op_istream.md)   | ストリームからの入力 | C++11 |


## 例
```cpp example
#include <random>
#include <fstream>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // 平均3.141592、標準偏差1.0で分布させる
  std::lognormal_distribution<> dist(3.141592, 1.0);

  std::ofstream file("lognormal_distribution.tsv");
  for (std::size_t n = 0; n < 256; ++n) {
    // 対数�規分布で乱数を生成する
    double result = dist(engine);
    file << result << "\n";
  }
}
```
* std::lognormal_distribution[color ff0000]
* std::ofstream[link /reference/fstream/basic_ofstream.md]
* dist(engine)[link lognormal_distribution/op_call.md]

### 出力
```
```

このプ�グラムによってある時に得られた結果（[lognormal_distribution.tsv.7z](https://github.com/cpprefjp/image/raw/master/reference/random/lognormal_distribution/lognormal_distribution.tsv.7z)）を図示する。 

![](https://github.com/cpprefjp/image/raw/master/reference/random/lognormal_distribution/lognormal_distribution.png)

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 
- [GCC](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 

### 参考
- [対数�規分布 - Wikipedia](https://ja.wikipedia.org/wiki/%E5%AF%BE%E6%95%B0%E6%AD%A3%E8%A6%8F%E5%88%86%E5%B8%83)
- [対数�規分布 - NtRand](http://www.ntrand.com/jp/log-normal-distribution/)
- [対数�規分布の仕組み - 小人さんの妄想](http://d.hatena.ne.jp/rikunora/20100418/p1)
