# binomial_distribution
* random[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class IntType = int>
  class binomial_distribution;
}
```

## 概要
`binomial_distribution`は、離散確率分布の一種である二項分布を表すクラスである。  
成功する確率pの事象をn回施行し、成功した回数を求める。  

二項分布は、以下のような用途に使用できる：

- �亡する確率があるワクチンをN人に投与し、生き残る(or �亡する)人数を求める
- N個の製品に、確率pで不良品が発生する


テンプレートパラメータは、以下を意味する：

- `IntType` : 成功した回数を表す整数型。


## メンバ関数
### 構築・リセット

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------------|--------------------|-------|
| [`(constructor)`](binomial_distribution/op_constructor.md)        | コンストラクタ     | C++11 |
| `~binomial_distribution() = default;`                               | デストラクタ       | C++11 |
| [`reset`](binomial_distribution/reset.md)                         | 状態をリセットする | C++11 |


### 生成

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------|----------------|-------|
| [`operator()`](binomial_distribution/op_call.md) | 乱数を生成する | C++11 |


### プ�パティ

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|----------------------------------|-------|
| [`t`](binomial_distribution/t.md)         | 試行回数を取得する               | C++11 |
| [`p`](binomial_distribution/p.md)         | 確率を取得する                   | C++11 |
| [`param`](binomial_distribution/param.md) | 分布のパラメータを取得／�定する | C++11 |
| [`min`](binomial_distribution/min.md)     | 生成し得る値の下限を取得する   | C++11 |
| [`max`](binomial_distribution/max.md)     | 生成し得る値の上限を取得する   | C++11 |


## メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|---------------------------------|-------|
| `result_type` | 乱数生成結果の整数型。`IntType` | C++11 |
| `param_type`  | 分布パラメータの型。未規定。    | C++11 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------------|----------------------|-------|
| [`operator==`](binomial_distribution/op_equal.md)     | �値比較             | C++11 |
| [`operator!=`](binomial_distribution/op_not_equal.md) | 非�値比較           | C++11 |
| [`operator<<`](binomial_distribution/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](binomial_distribution/op_istream.md)   | ストリームからの入力 | C++11 |


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // 成功確率0.5の事象を5回施行する
  std::binomial_distribution<> dist(5, 0.5);

  // 成功した回数を取得(0以上5以下の値が返される)
  int result = dist(engine);
  std::cout << result << std::endl;
}
```
* std::binomial_distribution[color ff0000]
* dist(engine)[link binomial_distribution/op_call.md]

### 出力例
```
2
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
- [二項分布 - Wikipedia](https://ja.wikipedia.org/wiki/二項分布)

