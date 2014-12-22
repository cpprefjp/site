#student_t_distribution (C++11)
```cpp
namespace std {
  template <class RealType = double>
  class student_t_distribution;
}
```

##概要
`student_t_distribution`は、連続確率分布の一種である、ステューデントのt分布を生成する。以下の密度関数に基いて、浮動小数点数の乱数を生成する：


![](https://github.com/cpprefjp/image/raw/master/reference/random/student_t_distribution/student_t.png)


この密度関数において、nは自由度を意味する。


以下のような用途に使用できる：

- 母集団の性質(平均、分散)を推定する


テンプレートパラメータは、以下を意味する：

- `RealType` : 成功する実数型。


##メンバ関数
###構築・リセット

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------------------------|--------------------|-------|
| [`(constructor)`](./student_t_distribution/student_t_distribution.md) | コンストラクタ     | C++11 |
| `~student_t_distribution() = default;`                                | デストラクタ       | C++11 |
| [`reset`](./student_t_distribution/reset.md)                          | 状態をリセットする | C++11 |


###生成

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------|----------------|-------|
| [`operator()`](./student_t_distribution/op_call.md) | 乱数を生成する | C++11 |


###プロパティ

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|----------------------------------|-------|
| [`t`](./student_t_distribution/t.md)         | 自由度を取得する                 | C++11 |
| [`param`](./student_t_distribution/param.md) | 分布のパラメータを取得／設定する | C++11 |
| [`min`](./student_t_distribution/min.md)     | 生成する範囲の最小値を取得する   | C++11 |
| [`max`](./student_t_distribution/max.md)     | 生成する範囲の最大値を取得する   | C++11 |


##メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|---------------------------------|-------|
| `result_type` | 乱数生成結果の実数型。`RealType` | C++11 |
| `param_type`  | 分布パラメータの型。未規定。    | C++11 |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------------|----------------------|-------|
| [`operator==`](./student_t_distribution/op_equal.md)     | 等値比較             | C++11 |
| [`operator!=`](./student_t_distribution/op_not_equal.md) | 非等値比較           | C++11 |
| [`operator<<`](./student_t_distribution/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](./student_t_distribution/op_istream.md)   | ストリームからの入力 | C++11 |




##例
```cpp
#include <random>
#include <fstream>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // 自由度1.0で分布させる
  std::student_t_distribution<> dist(1.0);

  std::ofstream file("student_t_distribution.tsv");
  for (std::size_t n = 0; n < 256; ++n) {
    // t分布で乱数を生成する
    double result = dist(engine);
    file << result << "\n";
  }
}
```

###出力
```
```

このプログラムによってある時に得られた結果（[student_t_distribution.tsv](https://github.com/cpprefjp/image/raw/master/reference/random/student_t_distribution/student_t_distribution.tsv)）を図示する。

![](https://github.com/cpprefjp/image/raw/master/reference/random/student_t_distribution/student_t_distribution.png)


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
- [t分布 - Wikipedia](http://ja.wikipedia.org/wiki/T%E5%88%86%E5%B8%83)
- [t分布 統計学入門](http://www.tamagaki.com/math/Statistics402.html)
- [第８回　ｔ分布とｔ検定](http://www.ipc.shimane-u.ac.jp/food/kobayasi/biometry8_2011.html)

