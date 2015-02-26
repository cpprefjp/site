#poisson_distribution (C++11)
* random[meta header]

```cpp
namespace std {
  template <class IntType = int>
  class poisson_distribution;
}
```

##概要
`poisson_distribution`は、離散確率分布の一種であるポワソン分布を表すクラスである。  
以下の密度関数に基いて、ランダムな整数を生成する：


![](https://github.com/cpprefjp/image/raw/master/reference/random/poisson_distribution/poisson.png)


この数式におけるμ(mu)は、平均値(mean)を意味する。


ポワソン分布は、以下のような用途に使用できる：

- ある交差点で1時間に起きる事故の件数
- 国道1キロメートル当たりのレストランの数
- この原稿を書いている間に変換間違えをする数


テンプレートパラメータは、以下を意味する：

- `IntType` : 生成する整数型。


##メンバ関数
###構築・リセット

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------------------|--------------------|-------|
| [`(constructor)`](./poisson_distribution/op_constructor.md)       | コンストラクタ     | C++11 |
| `~poisson_distribution() = default;`                              | デストラクタ       | C++11 |
| [`reset`](./poisson_distribution/reset.md)                        | 状態をリセットする | C++11 |


###生成

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------|----------------|-------|
| [`operator()`](./poisson_distribution/op_call.md) | 乱数を生成する | C++11 |


###プロパティ

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|----------------------------------|-------|
| [`mean`](./poisson_distribution/mean.md)   | 平均値を取得する                 | C++11 |
| [`param`](./poisson_distribution/param.md) | 分布のパラメータを取得／設定する | C++11 |
| [`min`](./poisson_distribution/min.md)     | 生成する範囲の最小値を取得する   | C++11 |
| [`max`](./poisson_distribution/max.md)     | 生成する範囲の最大値を取得する   | C++11 |


##メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 乱数生成結果の整数型 `IntType`。 | C++11 |
| `param_type`  | 分布パラメータの型。未規定。 | C++11 |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------------|----------------------|-------|
| [`operator==`](./poisson_distribution/op_equal.md)     | 等値比較             | C++11 |
| [`operator!=`](./poisson_distribution/op_not_equal.md) | 非等値比較           | C++11 |
| [`operator<<`](./poisson_distribution/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](./poisson_distribution/op_istream.md)   | ストリームからの入力 | C++11 |


##例
```cpp
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

###出力
```
```

このプログラムによってある時に得られた結果（[poisson_distribution.tsv](https://github.com/cpprefjp/image/raw/master/reference/random/poisson_distribution/poisson_distribution.tsv)）を図示する。 

![](https://github.com/cpprefjp/image/raw/master/reference/random/poisson_distribution/poisson_distribution.png)

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 

###参考
- [ポワソン分布 - Wikipedia](http://ja.wikipedia.org/wiki/ポアソン分布)
- [ポアソン分布 - 統計・データ解析](http://oku.edu.mie-u.ac.jp/~okumura/stat/poisson.php)
- [ポアソン分布 - NtRand](http://www.ntrand.com/jp/poisson-distribution/)


