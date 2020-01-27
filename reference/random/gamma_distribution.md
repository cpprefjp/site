# gamma_distribution
* random[meta header]
* std[meta namespace]
* class template[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class RealType = double>
  class gamma_distribution;
}
```

## 概要
`gamma_distribution`は、連続確率分布の一種であるガンマ分布を表すクラスである。  
以下の確率密度関数に基いて、浮動小数点数の値`x`を生成する：

$$ p(x \mid \alpha, \beta) = \frac{x^{-x/\beta}}{\beta^{\alpha} \cdot \Gamma(\alpha) } \cdot x^{\alpha - 1} $$

この数式においてα(alpha)は形状母数(shape parameter)、β(beta)は尺度母数(scale parameter)を表す。  
形状母数に�の整数を与えれば、アーラン分布(Erlang distribution)としても使用できる。  


ガンマ分布は、以下のような用途に使用できる：

- 均一に忙しいコールセンターに10回電話をかけ、つながるまでの時間の統計を求める
- 放射性物質の大きなボディが、1000回原�核崩壊するのを観察する


テンプレートパラメータは、以下を意味する：

- `RealType` : 生成する実数の型。


## メンバ関数
### 構築・リセット

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------|--------------------|-------|
| [`(constructor)`](gamma_distribution/op_constructor.md)     | コンストラクタ     | C++11 |
| `~gamma_distribution() = default;`                            | デストラクタ       | C++11 |
| [`reset`](gamma_distribution/reset.md)                      | 状態をリセットする | C++11 |


### 生成

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------|----------------|-------|
| [`operator()`](gamma_distribution/op_call.md) | 乱数を生成する | C++11 |


### プ�パティ

| 名前 | 説明 | 対応バージョン |
|------------------------------------------|----------------------------------|-------|
| [`alpha`](gamma_distribution/alpha.md) | 形状母数を取得する   | C++11 |
| [`beta`](gamma_distribution/beta.md)   | 尺度母数を取得する | C++11 |
| [`param`](gamma_distribution/param.md) | 分布のパラメータを取得／�定する | C++11 |
| [`min`](gamma_distribution/min.md)     | 生成し得る値の下限を取得する   | C++11 |
| [`max`](gamma_distribution/max.md)     | 生成し得る値の上限を取得する   | C++11 |


## メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 乱数生成結果の実数型 `RealType`。 | C++11 |
| `param_type`  | 分布パラメータの型。未規定。 | C++11 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|----------------------|-------|
| [`operator==`](gamma_distribution/op_equal.md)     | �値比較             | C++11 |
| [`operator!=`](gamma_distribution/op_not_equal.md) | 非�値比較           | C++11 |
| [`operator<<`](gamma_distribution/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](gamma_distribution/op_istream.md)   | ストリームからの入力 | C++11 |


## 例
```cpp example
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
* std::gamma_distribution[color ff0000]
* std::ofstream[link /reference/fstream/basic_ofstream.md]
* dist(engine)[link gamma_distribution/op_call.md]

### 出力
```
```

このプ�グラムによってある時に得られた結果（[gamma_distribution.tsv](https://github.com/cpprefjp/image/raw/master/reference/random/gamma_distribution/gamma_distribution.tsv)）を図示する。 

![](https://github.com/cpprefjp/image/raw/master/reference/random/gamma_distribution/gamma_distribution.png)

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 
- [GCC](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 

### 参考
- [ガンマ分布 - Wikipedia](https://ja.wikipedia.org/wiki/ガンマ分布)

