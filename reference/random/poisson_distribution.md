# poisson_distribution
* random[meta header]
* std[meta namespace]
* class template[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class IntType = int>
  class poisson_distribution;
}
```

## 概要
`poisson_distribution`は、離散確率分布の一種であるポワソン分布を表すクラスである。  
以下の確率密度関数に基いて、ランダムな整数を生成する：

$$ p(x \mid \mu) = \frac{e^{-\mu} \mu^x}{x!} $$


この数式においてμ(mu)は、平均値(mean)である。


ポワソン分布は、まれにしか起こらない事象が何回起こるかを求めるために使用できる確率分布である。以下のような用途に使用できる：

- ある交差点で1時間に起きる事故の件数
- 国道1キロメートル当たりのレストランの数
- この原稿を書いている間に変換間違えをする数


テンプレートパラメータは、以下を意味する：

- `IntType` : 生成する整数型。


## メンバ関数
### 構築・リセット

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------------------|--------------------|-------|
| [`(constructor)`](poisson_distribution/op_constructor.md)       | コンストラクタ     | C++11 |
| `~poisson_distribution() = default;`                              | デストラクタ       | C++11 |
| [`reset`](poisson_distribution/reset.md)                        | 状態をリセットする | C++11 |


### 生成

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------|----------------|-------|
| [`operator()`](poisson_distribution/op_call.md) | 乱数を生成する | C++11 |


### プロパティ

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|----------------------------------|-------|
| [`mean`](poisson_distribution/mean.md)   | 分布の平均値を取得する           | C++11 |
| [`param`](poisson_distribution/param.md) | 分布のパラメータを取得／設定する | C++11 |
| [`min`](poisson_distribution/min.md)     | 生成し得る値の下限を取得する   | C++11 |
| [`max`](poisson_distribution/max.md)     | 生成し得る値の上限を取得する   | C++11 |


## メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 乱数生成結果の整数型 `IntType`。 | C++11 |
| `param_type`  | 分布パラメータの型。未規定。 | C++11 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------------|----------------------|-------|
| [`operator==`](poisson_distribution/op_equal.md)     | 等値比較             | C++11 |
| [`operator!=`](poisson_distribution/op_not_equal.md) | 非等値比較           | C++11 |
| [`operator<<`](poisson_distribution/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](poisson_distribution/op_istream.md)   | ストリームからの入力 | C++11 |


## 例
### 基本的な使い方
```cpp example
#include <random>
#include <fstream>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // 平均値4.0で分布させる
  std::poisson_distribution<> dist(4.0);

  std::ofstream file("poisson_distribution.tsv");
  for (std::size_t n = 0; n < 1000; ++n) {
    // ポワソン分布で乱数を生成する
    int result = dist(engine);
    file << result << "\t\n";
  }
}
```
* std::poisson_distribution[color ff0000]
* std::ofstream[link /reference/fstream/basic_ofstream.md]
* dist(engine)[link poisson_distribution/op_call.md]

#### 出力
```
```

このプログラムによってある時に得られた結果（[poisson_distribution.tsv](https://raw.githubusercontent.com/cpprefjp/image/master/reference/random/poisson_distribution/poisson_distribution.tsv)）を図示する。 

![](https://raw.githubusercontent.com/cpprefjp/image/master/reference/random/poisson_distribution/poisson_distribution.png)


### 地震が1ヶ月に平均1回起こるとして1年間をシミュレート
```cpp example
#include <iostream>
#include <random>

int main() {
  // 平均的に1ヶ月に1回の地震が起こるとする
  double average_quakes = 1.0;

  std::random_device seed_gen;
  std::default_random_engine engine{seed_gen()};
  std::poisson_distribution<int> dist{average_quakes};

  // 1年間 (12ヶ月) の地震の回数をシミュレート
  for (int month = 1; month <= 12; ++month) {
    int quakes = dist(engine);
    std::cout << "Month " << month << ": " << quakes << " earthquake(s)\n";
  }
}
```
* std::poisson_distribution[color ff0000]
* dist(engine)[link poisson_distribution/op_call.md]

#### 出力例
```
Month 1: 1 earthquake(s)
Month 2: 2 earthquake(s)
Month 3: 2 earthquake(s)
Month 4: 0 earthquake(s)
Month 5: 0 earthquake(s)
Month 6: 1 earthquake(s)
Month 7: 1 earthquake(s)
Month 8: 1 earthquake(s)
Month 9: 2 earthquake(s)
Month 10: 2 earthquake(s)
Month 11: 2 earthquake(s)
Month 12: 1 earthquake(s)
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 7 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.2 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 

### 参考
- [ポワソン分布 - Wikipedia](https://ja.wikipedia.org/wiki/ポアソン分布)
- [ポアソン分布 - 統計・データ解析](https://okumuralab.org/~okumura/stat/poisson.html)
- [ポアソン分布 - NtRand](http://www.ntrand.com/jp/poisson-distribution/)
- [［データ分析］ポアソン分布 ～ 100年に1人の天才は何人現れる？：やさしい確率分布 - ＠IT](https://atmarkit.itmedia.co.jp/ait/articles/2407/11/news002.html)
