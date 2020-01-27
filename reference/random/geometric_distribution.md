# geometric_distribution
* random[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class IntType = int>
  class geometric_distribution;
}
```

## 概要
`geometric_distribution`は、離散確率分布の一種である幾何分布を表すクラスである。  
このクラスは、ベルヌーイ分布([`bernoulli_distribution`](bernoulli_distribution.md))を施行し、初めて成功するまでに何回失敗したかを取得する。これは、[`negative_binomial_distribution`](negative_binomial_distribution.md)`<IntType>(1, p)`と同じである。

幾何分布は、無記憶性(memoryless)という性質を持つ。これにより、施行の結果が次の結果(確率)に影響せず、それぞれが独立した結果となる。


幾何分布は、以下のような用途で使用できる：

- くじ引きを行い、当たりが出るまでに引いた回数を求める
- 信頼性の低い部品を製造するために失敗した個数を求める


テンプレートパラメータは、以下を意味する：

- `IntType` : 成功回を表す整数型。


## メンバ関数
### 構築・リセット

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------------------------|--------------------|-------|
| [`(constructor)`](geometric_distribution/op_constructor.md)         | コンストラクタ     | C++11 |
| `~geometric_distribution() = default;`                                | デストラクタ       | C++11 |
| [`reset`](geometric_distribution/reset.md)                          | 状態をリセットする | C++11 |


### 生成

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------|----------------|-------|
| [`operator()`](geometric_distribution/op_call.md) | 乱数を生成する | C++11 |


### プ�パティ

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|----------------------------------|-------|
| [`p`](geometric_distribution/p.md)         | 確率を取得する                   | C++11 |
| [`param`](geometric_distribution/param.md) | 分布のパラメータを取得／�定する | C++11 |
| [`min`](geometric_distribution/min.md)     | 生成し得る値の下限を取得する   | C++11 |
| [`max`](geometric_distribution/max.md)     | 生成し得る値の上限を取得する   | C++11 |


## メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|---------------------------------|-------|
| `result_type` | 乱数生成結果の整数型。`IntType` | C++11 |
| `param_type`  | 分布パラメータの型。未規定。    | C++11 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------------|----------------------|-------|
| [`operator==`](geometric_distribution/op_equal.md)     | �値比較             | C++11 |
| [`operator!=`](geometric_distribution/op_not_equal.md) | 非�値比較           | C++11 |
| [`operator<<`](geometric_distribution/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](geometric_distribution/op_istream.md)   | ストリームからの入力 | C++11 |


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // 成功確率0.5の事象を、成功するまで施行する
  std::geometric_distribution<> dist(0.5);

  // 成功するまでに、何回失敗したかを取得
  int result = dist(engine);
  std::cout << result << std::endl;
}
```
* std::geometric_distribution[color ff0000]
* dist(engine)[link geometric_distribution/op_call.md]

### 出力例
```
0
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [幾何分布 - Wikipedia](https://ja.wikipedia.org/wiki/幾何分布)

