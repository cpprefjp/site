#cauchy_distribution (C++11)
* random[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class RealType = double>
  class cauchy_distribution;
}
```

##概要
`cauchy_distribution`は、連絡確率分布の一種であるコーシー分布(ローレンツ分布とも呼ばれる)を生成するクラスである。  
正規分布([`normal_distribution`](./normal_distribution.md))と違い、平均も分散も定義されない、という特徴を持つ。  
以下の密度関数に基いて、浮動小数点数の乱数を生成する：  


![](https://github.com/cpprefjp/image/raw/master/reference/random/cauchy_distribution/cauchy.png)


この密度関数において、aは分布の最頻値を与える位置母数(location parameter)、bは半値半幅を与える尺度母数(scale parameter)を意味する。  

コーシー分布は、以下のような用途に使用できる：

- 正規分布に比べて外れ値(outliers)が非常に多い場合の分布のモデルに、使われることがある
- 原子核物理の文やにおいて、放射線の線スペクトルの強度分布など、共鳴現象を表すのに使われる(この分野では、ブライト・ウィグナー分布とも呼ばれている)


テンプレートパラメータは、以下を意味する：

- `RealType` : 成功する実数の型。


##メンバ関数
###構築・リセット

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------------------|--------------------|-------|
| [`(constructor)`](./cauchy_distribution/op_constructor.md) | コンストラクタ     | C++11 |
| `~cauchy_distribution() = default;`                             | デストラクタ       | C++11 |
| [`reset`](./cauchy_distribution/reset.md)                       | 状態をリセットする | C++11 |


###生成

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------|----------------|-------|
| [`operator()`](./cauchy_distribution/op_call.md) | 乱数を生成する | C++11 |


###プロパティ

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------|----------------------------------|-------|
| [`a`](./cauchy_distribution/a.md)         | 位置母数を取得する               | C++11 |
| [`b`](./cauchy_distribution/b.md)         | 尺度母数を取得する               | C++11 |
| [`param`](./cauchy_distribution/param.md) | 分布のパラメータを取得／設定する | C++11 |
| [`min`](./cauchy_distribution/min.md)     | 生成する範囲の最小値を取得する   | C++11 |
| [`max`](./cauchy_distribution/max.md)     | 生成する範囲の最大値を取得する   | C++11 |


##メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|---------------------------------|-------|
| `result_type` | 乱数生成結果の整数型。`IntType` | C++11 |
| `param_type`  | 分布パラメータの型。未規定。    | C++11 |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------|----------------------|-------|
| [`operator==`](./cauchy_distribution/op_equal.md)     | 等値比較             | C++11 |
| [`operator!=`](./cauchy_distribution/op_not_equal.md) | 非等値比較           | C++11 |
| [`operator<<`](./cauchy_distribution/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](./cauchy_distribution/op_istream.md)   | ストリームからの入力 | C++11 |


##例
```cpp
#include <fstream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // 位置母数0.0、尺度母数1.0で分布させる
  std::cauchy_distribution<> dist(0.0, 1.0);

  std::ofstream file("cauchy_distribution.tsv");
  for (size_t n = 0; n < 1000; ++n) {
    // コーシー分布で乱数を生成する
    double result = dist(engine);
    file << result << "\n";
  }
}
```

###出力
```
```

このプログラムによってある時に得られた結果（[cauchy_distribution.tsv](https://github.com/cpprefjp/image/raw/master/reference/random/cauchy_distribution/cauchy_distribution.tsv)）を図示する。

![](https://github.com/cpprefjp/image/raw/master/reference/random/cauchy_distribution/cauchy_distribution.png)

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
- [コーシー分布 - Wikipedia](http://ja.wikipedia.org/wiki/%E3%82%B3%E3%83%BC%E3%82%B7%E3%83%BC%E5%88%86%E5%B8%83)
- [コーシー分布 - NtRand](http://www.ntrand.com/jp/cauchy-distribution/)

