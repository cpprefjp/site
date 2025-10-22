# exponential_distribution
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

## 概要
`exponential_distribution`は、連続確率分布の一種である指数分布を表すクラスである。指数分布は、ガンマ分布([`gamma_distribution`](gamma_distribution.md))の形状母数(scale parameter)を1.0とした特殊ケースとして定義される。  

以下の確率密度関数に基いて、浮動小数点数の値`x`を生成する：

$$ p(x \mid \lambda) = \lambda e^{-\lambda x} $$

この数式におけるλ(lambda)は、ある事象が起こってから次にまた発生するまでの間隔を表す。


指数分布は、以下のような用途に使用できる：

- 銀行の窓口に顧客が到着する時間間隔
- 発作を起こしてから死亡するまでの時間間隔


テンプレートパラメータは、以下を意味する：

- `RealType` : 生成する実数の型。


## メンバ関数
### 構築・リセット

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------|--------------------|-------|
| [`(constructor)`](exponential_distribution/op_constructor.md)           | コンストラクタ     | C++11 |
| `~exponential_distribution() = default;`                                  | デストラクタ       | C++11 |
| [`reset`](exponential_distribution/reset.md)                            | 状態をリセットする | C++11 |


### 生成

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------|----------------|-------|
| [`operator()`](exponential_distribution/op_call.md) | 乱数を生成する | C++11 |


### プロパティ

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|----------------------------------|-------|
| [`lambda`](exponential_distribution/lambda.md) | 母数を取得する                   | C++11 |
| [`param`](exponential_distribution/param.md) | 分布のパラメータを取得／設定する | C++11 |
| [`min`](exponential_distribution/min.md)     | 生成し得る値の下限を取得する   | C++11 |
| [`max`](exponential_distribution/max.md)     | 生成し得る値の上限を取得する   | C++11 |


## メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 乱数生成結果の実数型 `RealType`。 | C++11 |
| `param_type`  | 分布パラメータの型。未規定。 | C++11 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------------|----------------------|-------|
| [`operator==`](exponential_distribution/op_equal.md)     | 等値比較             | C++11 |
| [`operator!=`](exponential_distribution/op_not_equal.md) | 非等値比較           | C++11 |
| [`operator<<`](exponential_distribution/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](exponential_distribution/op_istream.md)   | ストリームからの入力 | C++11 |


## 例
### 基本的な使い方
```cpp example
#include <random>
#include <fstream>
#include <cstdint>

int main()
{
  std::random_device seed_gen;
  std::uint32_t seed = seed_gen();
  std::default_random_engine engine(seed);

  std::exponential_distribution<> dist(1.0);

  std::ofstream file("exponential_distribution.tsv");
  for (std::size_t n = 0; n < 1000; ++n) {
    // 指数分布で乱数を生成する
    double result = dist(engine);
    file << result << "\t\n";
  }
}
```
* std::exponential_distribution[color ff0000]
* std::ofstream[link /reference/fstream/basic_ofstream.md]
* dist(engine)[link exponential_distribution/op_call.md]

#### 出力
```
```

このプログラムによってある時に得られた結果（[exponential_distribution.tsv](https://raw.githubusercontent.com/cpprefjp/image/master/reference/random/exponential_distribution/exponential_distribution.tsv)）を図示する。 

![](https://raw.githubusercontent.com/cpprefjp/image/master/reference/random/exponential_distribution/exponential_distribution.png)

### コールセンターに電話がかかってくる時間間隔をシミュレート
```cpp example
#include <iostream>
#include <random>

int main() {
  // 平均的に1時間に30回（1回あたり2分間隔）の電話がかかってくる
  double average_calls_per_hour = 30.0;

  std::random_device seed_gen;
  std::default_random_engine engine{seed_gen()};

  // 指数分布を定義 (平均値は1/lambdaで定義されるため逆数をとる)
  std::exponential_distribution<double> dist{average_calls_per_hour / 60.0};

  // 1時間分の電話の間隔をシミュレート
  double time = 0;
  while (time < 60) {
    double wait_time = dist(engine);
    time += wait_time;
    if (time < 60) {
      std::cout << "Phone call after " << wait_time << " minute wait\n";
    }
  }
}
```
* std::exponential_distribution[color ff0000]
* dist(engine)[link exponential_distribution/op_call.md]

#### 出力例
```
Phone call after 0.118293 minute wait
Phone call after 2.67793 minute wait
Phone call after 3.46596 minute wait
Phone call after 1.58166 minute wait
Phone call after 0.704957 minute wait
Phone call after 2.09809 minute wait
Phone call after 0.168292 minute wait
Phone call after 1.05299 minute wait
Phone call after 3.4055 minute wait
Phone call after 1.06941 minute wait
Phone call after 4.99887 minute wait
Phone call after 3.4023 minute wait
Phone call after 3.37294 minute wait
Phone call after 1.69335 minute wait
Phone call after 1.21446 minute wait
Phone call after 0.765484 minute wait
Phone call after 0.590176 minute wait
Phone call after 0.0506416 minute wait
Phone call after 1.64168 minute wait
Phone call after 1.93174 minute wait
Phone call after 0.903994 minute wait
Phone call after 3.06768 minute wait
Phone call after 2.37803 minute wait
Phone call after 0.597241 minute wait
Phone call after 1.67885 minute wait
Phone call after 0.756916 minute wait
Phone call after 2.09694 minute wait
Phone call after 1.22043 minute wait
Phone call after 3.05816 minute wait
Phone call after 3.10884 minute wait
Phone call after 2.60918 minute wait
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 7.1 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.2 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 

### 参考
- [指数分布 - Wikipedia](https://ja.wikipedia.org/wiki/指数分布)
- [指数分布 - NtRand](http://www.ntrand.com/jp/exponential-distribution/)
- [指数分布 - 統計学自習ノート](http://aoki2.si.gunma-u.ac.jp/lecture/Bunpu/exponential.html)
- [指数分布とポアソン分布のいけない関係](http://www.slideshare.net/teramonagi/ss-11296227)
