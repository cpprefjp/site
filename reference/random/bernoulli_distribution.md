#bernoulli_distribution (C++11)
```cpp
namespace std {
  class bernoulli_distribution;
}
```

##概要
`bernoulli_distribution`は、`true`と`false`という2つの値を確率分布させるクラスである。  
このクラスは、ベルヌーイ分布(Bernoulli distribution)の実装である。

コンストラクタで設定された確率`p`で`true`が生成され、確率`1.0 - p`で`false`が生成される。


ベルヌーイ分布は、以下のような用途に使用できる：

- コイントス。コインの表が出るか裏が出るか
- 成功か失敗か


##メンバ関数
###構築・リセット

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------------------------|--------------------|-------|
| [(constructor)](./bernoulli_distribution//op_constructor.md)         | コンストラクタ     | C++11 |
| `~bernoulli_distribution() = default;`                                | デストラクタ       | C++11 |
| [`reset`](./bernoulli_distribution/reset.md)                          | 状態をリセットする | C++11 |


###生成

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------|----------------|-------|
| [`operator()`](./bernoulli_distribution/op_call.md) | 乱数を生成する | C++11 |


###プロパティ

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|----------------------------------|-------|
| [`p`](./bernoulli_distribution/p.md)         | 確率を取得する                   | C++11 |
| [`param`](./bernoulli_distribution/param.md) | 分布のパラメータを取得／設定する | C++11 |
| [`min`](./bernoulli_distribution/min.md)     | 生成する範囲の最小値を取得する   | C++11 |
| [`max`](./bernoulli_distribution/max.md)     | 生成する範囲の最大値を取得する   | C++11 |


##メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|------------------------------|-------|
| `result_type` | 乱数生成結果の型 `bool`。    | C++11 |
| `param_type`  | 分布パラメータの型。未規定。 | C++11 |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------------|----------------------|-------|
| [`operator==`](./bernoulli_distribution/op_equal.md)     | 等値比較             | C++11 |
| [`operator!=`](./bernoulli_distribution/op_not_equal.md) | 非等値比較           | C++11 |
| [`operator<<`](./bernoulli_distribution/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](./bernoulli_distribution/op_istream.md)   | ストリームからの入力 | C++11 |


##例
```cpp
#include <random>
#include <fstream>

int main() 
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // 確率0.7でtrueを生成し、確率0.3(1.0 - 0.7)でfalseを生成する
  std::bernoulli_distribution dist(0.7);

  std::ofstream result_file("bernoulli_distribution.tsv");
  for (size_t n = 0; n < 1000; ++n) {
    // 乱数を生成する
    bool result = dist(engine);

    result_file << result << "\t\n";
  }
}
```

###出力
```
```

このプログラムによってある時に得られた結果（[bernoulli_distribution.tsv](https://github.com/cpprefjp/image/blob/master/reference/random/bernoulli_distribution/bernoulli_distribution.tsv)）を図示する。

![](https://raw.github.com/cpprefjp/image/master/reference/random/bernoulli_distribution/bernoulli_distribution.png)


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
- [ベルヌーイ分布 - Wikipedia](http://ja.wikipedia.org/wiki/ベルヌーイ分布)
- [ベルヌーイ分布(Bernoulli distribution) - NtRand](http://www.ntrand.com/jp/bernoulli-distribution/)

