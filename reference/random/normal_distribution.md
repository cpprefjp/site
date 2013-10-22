#normal_distribution(C++11)
```cpp
namespace std {
  template <class RealType = double>
  class normal_distribution;
}
```

##概要
`normal_distribution`は、平均μ、標準偏差σの正規分布にしたがった乱数を生成するクラスである。

![](https://github.com/cpprefjp/image/raw/master/reference/random/normal_distribution/normal.png)

テンプレートパラメータは、以下を意味する：

* `RealType` : 生成する実数の型。


正規分布は、以下のような用途に使用できる：

- 平均身長170cm、標準偏差5cmというパラメータから、平均付近の身長データを作成する


##メンバ関数
###構築・リセット

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------------------|--------------------|-------|
| [`(constructor)`](./normal_distribution/normal_distribution.md) | コンストラクタ     | C++11 |
| `~normal_distribution() = default;`                             | デストラクタ       | C++11 |
| [`reset`](./normal_distribution/reset.md)                       | 状態をリセットする | C++11 |


###生成

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|----------------|-------|
| [`operator()`](./normal_distribution/op_call.md) | 乱数を生成する | C++11 |


###プロパティ

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|----------------------------------|-------|
| [`mean`](./normal_distribution/mean.md)     | コンストラクタで指定された平均を取得する   | C++11 |
| [`stddev`](./normal_distribution/stddev.md) | コンストラクタで指定された標準偏差を取得する | C++11 |
| [`param`](./normal_distribution/param.md)   | 分布のパラメータを取得／設定する | C++11 |
| [`min`](./normal_distribution/min.md)       | 生成する範囲の最小値を取得する   | C++11 |
| [`max`](./normal_distribution/max.md)       | 生成する範囲の最大値を取得する   | C++11 |


##メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 乱数生成結果の実数型 `RealType`。 | C++11 |
| `param_type`  | 分布パラメータの型。未規定。 | C++11 |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------|----------------------|-------|
| [`operator==`](./normal_distribution/op_equal.md)     | 等値比較             | C++11 |
| [`operator!=`](./normal_distribution/op_not_equal.md) | 非等値比較           | C++11 |
| [`operator<<`](./normal_distribution/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](./normal_distribution/op_istream.md)   | ストリームからの入力 | C++11 |


##例
```cpp
#include <random>
#include <fstream>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // 平均100、標準偏差20で分布させる
  std::normal_distribution<> dist(100.0, 20.0);

  std::ofstream file("normal_distribution.tsv");
  for (std::size_t n = 0; n < 256; ++n) {
    // 正規分布で乱数を生成する
    double result = dist(engine);
    file << result << "\t\n";
  }
}
```

###出力
このプログラムによってある時に得られた結果（[normal_distribution.tsv.7z](https://github.com/cpprefjp/image/raw/master/reference/random/normal_distribution/normal_distribution.tsv.7z)）を図示する。

![](https://github.com/cpprefjp/image/raw/master/reference/random/normal_distribution/normal_distribution.png)

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md):
- [GCC](/implementation#gcc.md):
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md):
- [Visual C++](/implementation#visual_cpp.md):

###参考
- [正規分布 - Wikipedia](http://ja.wikipedia.org/wiki/%E6%AD%A3%E8%A6%8F%E5%88%86%E5%B8%83)

