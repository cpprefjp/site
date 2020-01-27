# discrete_distribution
* random[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class IntType = int>
  class discrete_distribution;
}
```

## 概要
`discrete_distribution`は整数のインデックスごとに離散した確率分布を生成するクラスである。アルゴリズムとしては、Walkerの別名法(Walker's alias method, 二者択一法ともいう)で実装されることが多い。

この分布クラスは、コンストラクタで指定された確率列に基いて値を分布させる。その結果として、確率列から選択された、0から始まるインデックスを返す。

テンプレートパラメータは、以下を意味する。

* `IntType` : 分布結果として返される、0から始まるインデックス値の整数型。負の値が返されることはないため、符号なし整数型を指定してもよい。デフォルトは`int`。


## メンバ関数
### 構築・リセット

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------------------------|------------------------------|-------|
| [`(constructor)`](discrete_distribution/op_constructor.md)         | コンストラクタ               | C++11 |
| `~discrete_distribution() = default;`                                | デストラクタ                 | C++11 |
| [`reset`](discrete_distribution/reset.md)                          | 状態をリセットする           | C++11 |


### 生成

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|----------------|-------|
| [`operator()`](discrete_distribution/op_call.md) | 乱数を生成する | C++11 |


### プ�パティ

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------------|--------------------------------------------|-------|
| [`probabilities`](discrete_distribution/probabilities.md) | インデックスに対応する確率の数列を取得する | C++11 |
| [`param`](discrete_distribution/param.md)                 | 分布のパラメータを取得／�定する           | C++11 |
| [`min`](discrete_distribution/min.md)                     | 下限を取得する                           | C++11 |
| [`max`](discrete_distribution/max.md)                     | 上限を取得する                           | C++11 |


## メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 乱数生成結果の型 `IntType`。0から始まるインデックス値が入る整数型である。符号なし整数型でもよい。 | C++11 |
| `param_type`  | 分布パラメータの型。未規定。 | C++11 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------|----------------------|-------|
| [`operator==`](discrete_distribution/op_equal.md)     | �値比較             | C++11 |
| [`operator!=`](discrete_distribution/op_not_equal.md) | 非�値比較           | C++11 |
| [`operator<<`](discrete_distribution/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](discrete_distribution/op_istream.md)   | ストリームからの入力 | C++11 |


## 例
```cpp example
#include <random>
#include <vector>
#include <fstream>

int main()
{
  std::random_device seed_gen;
  std::mt19937 engine(seed_gen());

  // 確率列を定義
  // 浮動小数点数の範囲として定義する。合計値が1.0や10.0のような切りの良い数値である必要はない。
  std::vector<double> probabilities = {
    0.0, 0.1, 0.2,
    0.3, 0.4, 0.5,
    1.0, 0.9, 0.8,
    0.7, 0.6
  };

  // 分布オブジェクトを生成。
  // コンストラクタには、確率列のイテレータ範囲を指定する。
  std::discrete_distribution<std::size_t> dist(
    probabilities.begin(),
    probabilities.end()
  );

  std::ofstream result_file("discrete_distribution.tsv");
  for (std::size_t n = 0; n < 1000; ++n) {
    // 確率列に基いて、ランダムなインデックスを生成する。
    // 確率0.1のものが選択された場合は1が返され、
    // 確率0.6が選択された場合は10が返される。
    std::size_t result = dist(engine);

    result_file << result << "\t\n";
  }
}
```
* std::discrete_distribution[color ff0000]
* probabilities.begin()[link /reference/vector/vector/begin.md]
* probabilities.end()[link /reference/vector/vector/end.md]
* std::ofstream[link /reference/fstream/basic_ofstream.md]
* dist(engine)[link discrete_distribution/op_call.md]

### 出力
```
```

このプ�グラムによってある時に得られた結果（;[discrete_distribution.tsv.7z](https://github.com/cpprefjp/image/raw/master/reference/random/discrete_distribution/discrete_distribution.tsv.7z)）を図示する。

![](https://github.com/cpprefjp/image/raw/master/reference/random/discrete_distribution/discrete_distribution.png) 
![](https://github.com/cpprefjp/image/raw/master/reference/random/discrete_distribution/discrete_distribution-hist.png)


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 
- [GCC](/implementation.md#gcc): 4.5.3
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 


## 参照
- [離散確率分布 - Wikipedia](https://ja.wikipedia.org/wiki/離散確率分布)
- [Pseudo-random number sampling - Wikipedia](https://en.wikipedia.org/wiki/Pseudo-random_number_sampling)
- [Alias Method - Wikipedia](https://en.wikipedia.org/wiki/Alias_method)
- [一般の離散分布の従う乱数の発生させる方法 - arupaka-_-arupakaの日記](http://d.hatena.ne.jp/arupaka-_-arupaka/20100508/1273319666)

