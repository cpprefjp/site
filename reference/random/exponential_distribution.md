#exponential_distribution
* random[meta header]
* std[meta namespace]
* class template[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class RealType = double>
  class exponential_distribution;
}
```

##概要
`exponential_distribution`は、連続確率分布の一種である指数分布を表すクラスである。指数分布は、ガンマ分布([`gamma_distribution`](./gamma_distribution.md))の形状母数(scale parameter)を1.0とした特殊ケースとして定義される。  

以下の確率密度関数に基いて、浮動小数点数の値`x`を生成する：

$$ p(x| \lambda ) = \lambda e^{-\lambda x} $$

この数式におけるλ(lambda)は、ある事象が起こってから次にまた発生するまでの間隔を表す。


指数分布は、以下のような用途に使用できる：

- 銀行の窓口に顧客が到着する時間間隔
- 発作を起こしてから死亡するまでの時間間隔


テンプレートパラメータは、以下を意味する：

- `RealType` : 生成する実数の型。


##メンバ関数
###構築・リセット

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------|--------------------|-------|
| [`(constructor)`](./exponential_distribution/op_constructor.md)           | コンストラクタ     | C++11 |
| `~exponential_distribution() = default;`                                  | デストラクタ       | C++11 |
| [`reset`](./exponential_distribution/reset.md)                            | 状態をリセットする | C++11 |


###生成

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------|----------------|-------|
| [`operator()`](./exponential_distribution/op_call.md) | 乱数を生成する | C++11 |


###プロパティ

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|----------------------------------|-------|
| [`lambda`](./exponential_distribution/lambda.md) | 母数を取得する                   | C++11 |
| [`param`](./exponential_distribution/param.md) | 分布のパラメータを取得／設定する | C++11 |
| [`min`](./exponential_distribution/min.md)     | 生成する範囲の最小値を取得する   | C++11 |
| [`max`](./exponential_distribution/max.md)     | 生成する範囲の最大値を取得する   | C++11 |


##メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 乱数生成結果の実数型 `RealType`。 | C++11 |
| `param_type`  | 分布パラメータの型。未規定。 | C++11 |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------------|----------------------|-------|
| [`operator==`](./exponential_distribution/op_equal.md)     | 等値比較             | C++11 |
| [`operator!=`](./exponential_distribution/op_not_equal.md) | 非等値比較           | C++11 |
| [`operator<<`](./exponential_distribution/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](./exponential_distribution/op_istream.md)   | ストリームからの入力 | C++11 |


##例
```cpp
#include <random>
#include <fstream>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  std::exponential_distribution<> dist(1.0);

  std::ofstream file("exponential_distribution.tsv");
  for (std::size_t n = 0; n < 1000; ++n) {
    // 指数分布で乱数を生成する
    double result = dist(engine);
    file << result << "\t\n";
  }
}
```

###出力
```
```

このプログラムによってある時に得られた結果（[exponential_distribution.tsv](https://github.com/cpprefjp/image/raw/master/reference/random/exponential_distribution/exponential_distribution.tsv)）を図示する。 

![](https://github.com/cpprefjp/image/raw/master/reference/random/exponential_distribution/exponential_distribution.png)

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 

###参考
- [指数分布 - Wikipedia](http://ja.wikipedia.org/wiki/指数分布)
- [指数分布 - NtRand](http://www.ntrand.com/jp/exponential-distribution/)
- [指数分布 - 統計学自習ノート](http://aoki2.si.gunma-u.ac.jp/lecture/Bunpu/exponential.html)
- [指数分布とポアソン分布のいけない関係](http://www.slideshare.net/teramonagi/ss-11296227)

