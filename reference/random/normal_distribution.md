#normal_distribution (C++11)
```cpp
namespace std {
  template <class RealType = double>
  class normal_distribution;
}
```

##概要
`normal_distribution`は、平均μ、標準偏差σの正規分布にしたがった乱数を生成するクラスである。

![](https://github.com/cpprefjp/image/raw/master/reference/random/normal_distribution/normal.png)

正規分布は、釣り鐘型の分布で、平均値を中心に、左右(マイナスとプラス)に値が分散する。平均値付近が最も出現確率が高く、標準偏差の値を基準として、左右に離れるほど出現確率が低くなる。

標準偏差は、値が分布する広がり方(ばらつき)の尺度である。「平均 ± 標準偏差」を超える値も、低確率ながら出現する。


正規分布は、以下のような用途に使用できる：

- 平均身長170cm、標準偏差5cmというパラメータから、平均付近の身長データを作成する


テンプレートパラメータは、以下を意味する：

- `RealType` : 生成する実数の型。


##メンバ関数
###構築・リセット

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------------------|--------------------|-------|
| [`(constructor)`](./normal_distribution/op_constructor.md)      | コンストラクタ     | C++11 |
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

  // 平均0.0、標準偏差1.0で分布させる
  std::normal_distribution<> dist(0.0, 1.0);

  std::ofstream file("normal_distribution.tsv");
  for (std::size_t n = 0; n < 1000 * 1000; ++n) {
    // 正規分布で乱数を生成する
    double result = dist(engine);
    file << result << "\t\n";
  }
}
```

###出力
```
```

このプログラムによってある時に得られた結果（[normal_distribution.tsv](https://github.com/cpprefjp/image/raw/master/reference/random/normal_distribution/normal_distribution.tsv)）を図示する。

![](https://github.com/cpprefjp/image/raw/master/reference/random/normal_distribution/normal_distribution.png)

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
- [正規分布 - Wikipedia](http://ja.wikipedia.org/wiki/%E6%AD%A3%E8%A6%8F%E5%88%86%E5%B8%83)
- [Marsaglia polar method - Wikipedia](http://en.wikipedia.org/wiki/Marsaglia_polar_method)
    - GCC 4.9時点においてlibstdc++で使用されているアルゴリズム
    - ボックス＝ミュラー法の変形版。棄却採択処理を含んでいる。
- [ボックス＝ミュラー法 - Wikipedia](http://ja.wikipedia.org/wiki/%E3%83%9C%E3%83%83%E3%82%AF%E3%82%B9%EF%BC%9D%E3%83%9F%E3%83%A5%E3%83%A9%E3%83%BC%E6%B3%95)
    - Boost 1.55.0以前まで、Boost.Randomの`normal_distribution`の実装に使われていたアルゴリズム。
- [Ziggurat sampling - Wikipedia](http://en.wikipedia.org/wiki/Ziggurat_algorithm)
    - Boost 1.56.0以降で、Boost.Randomの`normal_distribution`の実装に使われているアルゴリズム。
    - ボックス＝ミュラー法やPolar法など他の方式よりも、効率を大幅に改善しており、生成される乱数の精度も良い。

