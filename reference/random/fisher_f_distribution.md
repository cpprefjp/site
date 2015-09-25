#fisher_f_distribution
* random[meta header]
* std[meta namespace]
* class template[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class RealType = double>
  class fisher_f_distribution;
}
```

##概要
`fisher_f_distribution`は、連続確率分布の一種である、フィッシャーのF分布を生成するクラスである。以下の密度関数に基いて、浮動小数点数の乱数を生成する：  

$$ p(x|m,n) = \frac{\Gamma ((m+n)/2)}{\Gamma (m/2) \Gamma (n/2)} \cdot \big(\frac{m}{n} \big) ^{m/2} \cdot x^{(m/2)-1} \cdot \big( 1 + \frac{mx}{n} \big) ^{-(m+n)/2} $$

この密度関数におけるmとnは、自由度(degrees of freedom)を意味し、2つの独立したカイ二乗分布を除算したものを結果として生成する。


以下のような用途で使用できる：

- 2つの標本の分散比を求める。


テンプレートパラメータは、以下を意味する：

- `RealType` : 生成する実数の型。


##メンバ関数
###構築・リセット

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------------|--------------------|-------|
| [`(constructor)`](./fisher_f_distribution/op_constructor.md)        | コンストラクタ     | C++11 |
| `~fisher_f_distribution() = default;`                               | デストラクタ       | C++11 |
| [`reset`](./fisher_f_distribution/reset.md)                         | 状態をリセットする | C++11 |


###生成

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|----------------|-------|
| [`operator()`](./fisher_f_distribution/op_call.md) | 乱数を生成する | C++11 |


###プロパティ

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|----------------------------------|-------|
| [`m`](./fisher_f_distribution/m.md)         | 自由度mを取得する                | C++11 |
| [`n`](./fisher_f_distribution/n.md)         | 自由度nを取得する                | C++11 |
| [`param`](./fisher_f_distribution/param.md) | 分布のパラメータを取得／設定する | C++11 |
| [`min`](./fisher_f_distribution/min.md)     | 生成する範囲の最小値を取得する   | C++11 |
| [`max`](./fisher_f_distribution/max.md)     | 生成する範囲の最大値を取得する   | C++11 |


##メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 乱数生成結果の実数型 `RealType`。 | C++11 |
| `param_type`  | 分布パラメータの型。未規定。 | C++11 |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------|----------------------|-------|
| [`operator==`](./fisher_f_distribution/op_equal.md)     | 等値比較             | C++11 |
| [`operator!=`](./fisher_f_distribution/op_not_equal.md) | 非等値比較           | C++11 |
| [`operator<<`](./fisher_f_distribution/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](./fisher_f_distribution/op_istream.md)   | ストリームからの入力 | C++11 |


##例
```cpp
#include <fstream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // 自由度5と10で分布させる
  std::fisher_f_distribution<> dist(5, 10);
  
  std::ofstream file("fisher_f_distribution.tsv");
  for (size_t n = 0; n < 256; ++n) {
    // F分布で乱数を生成する
    double result = dist(engine);
    file << result << "\n";
  }
}
```

###出力
このプログラムによってある時に得られた結果（[fisher_f_distribution.tsv](https://github.com/cpprefjp/image/raw/master/reference/random/fisher_f_distribution/fisher_f_distribution.tsv)）を図示する。

![](https://github.com/cpprefjp/image/raw/master/reference/random/fisher_f_distribution/fisher_f_distribution.png)

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 

###参考
- [F分布 - Wikipedia](http://ja.wikipedia.org/wiki/F%E5%88%86%E5%B8%83)
- [第９回　カイ二乗分布とＦ分布](http://www.ipc.shimane-u.ac.jp/food/kobayasi/biometry9_2011.html)

