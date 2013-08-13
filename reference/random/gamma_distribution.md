#gamma_distribution(C++11)
```cpp
namespace std {
  template <class RealType = double>
  class gamma_distribution;
}
```

##概要
`gamma_distribution`は、連続確率分布の一種であるガンマ分布を表すクラスである。  
以下の密度関数に基いて、浮動小数点数の値`x`を生成する：


![](https://github.com/cpprefjp/image/raw/master/reference/random/gamma_distribution/gamma.png)


この数式におけるα(alpha)は形状母数(shape parameter)を意味し、β(beta)は尺度母数(scale parameter)を意味する。


テンプレートパラメータは、以下を意味する：

- `RealType` : 生成する実数の型。


##メンバ関数
###構築・リセット

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------|--------------------|-------|
| [`(constructor)`](./gamma_distribution/gamma_distribution.md) | コンストラクタ     | C++11 |
| `~gamma_distribution() = default;`                            | デストラクタ       | C++11 |
| [`reset`](./gamma_distribution/reset.md)                      | 状態をリセットする | C++11 |


###生成

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------|----------------|-------|
| [`operator()`](./gamma_distribution/op_call.md) | 乱数を生成する | C++11 |


###プロパティ

| 名前 | 説明 | 対応バージョン |
|------------------------------------------|----------------------------------|-------|
| [`alpha`](./gamma_distribution/mean.md)  | 形状母数を取得する   | C++11 |
| [`beta`](./gamma_distribution/stddev.md) | 尺度母数を取得する | C++11 |
| [`param`](./gamma_distribution/param.md) | 分布のパラメータを取得／設定する | C++11 |
| [`min`](./gamma_distribution/min.md)     | 生成する範囲の最小値を取得する   | C++11 |
| [`max`](./gamma_distribution/max.md)     | 生成する範囲の最大値を取得する   | C++11 |


##メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 乱数生成結果の実数型 `RealType`。 | C++11 |
| `param_type`  | 分布パラメータの型。未規定。 | C++11 |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|----------------------|-------|
| [`operator==`](./gamma_distribution/op_equal.md)     | 等値比較             | C++11 |
| [`operator!=`](./gamma_distribution/op_not_equal.md) | 非等値比較           | C++11 |
| [`operator<<`](./gamma_distribution/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](./gamma_distribution/op_istream.md)   | ストリームからの入力 | C++11 |


##例
```cpp
#include <random>
#include <fstream>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // 形状母数1.0、尺度母数1.0で分布させる
  std::gamma_distribution<> dist(1.0, 1.0);

  std::ofstream file("gamma_distribution.tsv");
  for (std::size_t n = 0; n < 1000; ++n) {
    // ガンマ分布で乱数を生成する
    double result = dist(engine);
    file << result << "\t\n";
  }
}
```

###出力
このプログラムによってある時に得られた結果（[gamma_distribution.tsv.7z](https://github.com/cpprefjp/image/raw/master/reference/random/gamma_distribution/gamma_distribution.tsv)）を図示する。 

![](https://github.com/cpprefjp/image/raw/master/reference/random/gamma_distribution/gamma_distribution.png)

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): 
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): 
- [Visual C++](/implementation#visual_cpp.md): 

###参考
- [ガンマ分布 - Wikipedia](http://ja.wikipedia.org/wiki/ガンマ分布)

