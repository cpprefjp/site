#negative_binomial_distribution (C++11)
```cpp
namespace std {
  template <class IntType = int>
  class negative_binomial_distribution;
}
```

##概要
`negative_binomial_distribution`は、離散確率分布の一種である、負の二項分布を表すクラスである。  
二項分布([`binomial_distribution`](./binomial_distribution.md)が「確率pで成功する事象をt回施行し、成功回数を取得する」のに対し、負の二項分布は「確率pで成功する事象がk回成功するまでに失敗した回数を取得する」ということを行う。  


負の二項分布は、実装によって「k回成功するまでに施行した回数を取得する」ものと、「k回成功するまでに失敗した回数を取得する」もの、2つのバリエーションが存在する。`std::negative_binomial_distribution`クラスは後者である。


テンプレートパラメータは、以下を意味する：

- `IntType` : 成功／失敗回数を表す整数型。


##メンバ関数
###構築・リセット

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------------|--------------------|-------|
| [`(constructor)`](./negative_binomial_distribution/negative_binomial_distribution.md) | コンストラクタ | C++11 |
| `~negative_binomial_distribution() = default;`       | デストラクタ       | C++11 |
| [`reset`](./negative_binomial_distribution/reset.md) | 状態をリセットする | C++11 |


###生成

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------------|----------------|-------|
| [`operator()`](./negative_binomial_distribution/op_call.md) | 乱数を生成する | C++11 |


###プロパティ

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|----------------------------------|-------|
| [`k`](./negative_binomial_distribution/k.md)         | 目標とする成功回数を取得する     | C++11 |
| [`p`](./negative_binomial_distribution/p.md)         | 確率を取得する                   | C++11 |
| [`param`](./negative_binomial_distribution/param.md) | 分布のパラメータを取得／設定する | C++11 |
| [`min`](./negative_binomial_distribution/min.md)     | 生成する範囲の最小値を取得する   | C++11 |
| [`max`](./negative_binomial_distribution/max.md)     | 生成する範囲の最大値を取得する   | C++11 |


##メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|---------------------------------|-------|
| `result_type` | 乱数生成結果の整数型。`IntType` | C++11 |
| `param_type`  | 分布パラメータの型。未規定。    | C++11 |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------------|----------------------|-------|
| [`operator==`](./negative_binomial_distribution/op_equal.md)     | 等値比較             | C++11 |
| [`operator!=`](./negative_binomial_distribution/op_not_equal.md) | 非等値比較           | C++11 |
| [`operator<<`](./negative_binomial_distribution/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](./negative_binomial_distribution/op_istream.md)   | ストリームからの入力 | C++11 |


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // 成功確率0.5の事象を5回成功させる
  std::negative_binomial_distribution<> dist(5, 0.5);

  // 5回成功するまでに失敗した回数を取得
  int result = dist(engine);
  std::cout << result << std::endl;
}
```

###出力例
```
3
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??


##参照
- [負の二項分布 - Wikipedia](http://ja.wikipedia.org/wiki/負の二項分布)


