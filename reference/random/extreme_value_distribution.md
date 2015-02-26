#extreme_value_distribution (C++11)
* random[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class RealType = double>
  class extreme_value_distribution;
}
```

##概要
`extreme_value_distribution`は、連続確率分布の一種である極値分布を表すクラスである。  
以下の密度関数に基いて、浮動小数点数の値を生成する：  


![](https://github.com/cpprefjp/image/raw/master/reference/random/extreme_value_distribution/extreme_value.png)


この数式におけるaは位置パラメータ(location parameter)、bは尺度パラメータ(scale parameter)を表す。


極値分布は、以下のような用途に使用できる：

- N年後の最高気温予測
- 競馬での順位(払戻金)予想


テンプレートパラメータは、以下を意味する：

- `RealType` : 生成する実数の型。


##メンバ関数
###構築・リセット

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------------------|--------------------|-------|
| [`(constructor)`](./extreme_value_distribution/op_constructor.md) | コンストラクタ     | C++11 |
| `~extreme_value_distribution() = default;`                              | デストラクタ       | C++11 |
| [`reset`](./extreme_value_distribution/reset.md)                        | 状態をリセットする | C++11 |


###生成

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------|----------------|-------|
| [`operator()`](./extreme_value_distribution/op_call.md) | 乱数を生成する | C++11 |


###プロパティ

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|----------------------------------|-------|
| [`a`](./extreme_value_distribution/a.md)         | 位置パラメータを取得する         | C++11 |
| [`b`](./extreme_value_distribution/b.md)         | 尺度パラメータを取得する         | C++11 |
| [`param`](./extreme_value_distribution/param.md) | 分布のパラメータを取得／設定する | C++11 |
| [`min`](./extreme_value_distribution/min.md)     | 生成する範囲の最小値を取得する   | C++11 |
| [`max`](./extreme_value_distribution/max.md)     | 生成する範囲の最大値を取得する   | C++11 |


##メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-----------------------------------|-------|
| `result_type` | 乱数生成結果の実数型 `RealType`。 | C++11 |
| `param_type`  | 分布パラメータの型。未規定。      | C++11 |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------------------|----------------------|-------|
| [`operator==`](./extreme_value_distribution/op_equal.md)     | 等値比較             | C++11 |
| [`operator!=`](./extreme_value_distribution/op_not_equal.md) | 非等値比較           | C++11 |
| [`operator<<`](./extreme_value_distribution/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](./extreme_value_distribution/op_istream.md)   | ストリームからの入力 | C++11 |


##例
```cpp
#include <random>
#include <fstream>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // 位置パラメータ0.0、尺度パラメータ1.0で分布させる
  std::extreme_value_distribution<> dist(0.0, 1.0);

  std::ofstream file("extreme_value_distribution.tsv");
  for (std::size_t n = 0; n < 1000; ++n) {
    // 極値分布で乱数を生成する
    double result = dist(engine);

    file << result << "\t\n";
  }
}
```

###出力
```
```

このプログラムによってある時に得られた結果（[extreme_value_distribution.tsv](https://github.com/cpprefjp/image/raw/master/reference/random/extreme_value_distribution/extreme_value_distribution.tsv)）を図示する。 

![](https://github.com/cpprefjp/image/raw/master/reference/random/extreme_value_distribution/extreme_value_distribution.png)


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
- [極値分布](http://ja.wikipedia.org/wiki/極値分布)
- [一般化極値分布 - MATLAB & Simulink - MathWorks 日本](http://www.mathworks.co.jp/jp/help/stats/generalized-extreme-value-distribution.html)
- [生態学のデータ解析 - 極値分布](http://hosho.ees.hokudai.ac.jp/~kubo/ce/ExtremeValue.html)
- [極値分布とその応用に関する研究](http://www.seto.nanzan-u.ac.jp/msie/gr-thesis/ms/2005/osaki/02mm042.pdf)

