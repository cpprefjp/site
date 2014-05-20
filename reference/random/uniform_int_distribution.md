#uniform_int_distribution (C++11)
```cpp
namespace std {
  template <class IntType = int>
  class uniform_int_distribution;
}
```

##概要
`uniform_int_distribution`は、指定された範囲の値が等確率で発生するよう離散分布するクラスである。 
このクラスは、離散一様分布(Discrete Uniform Distribution)の整数に特化したバージョンである。実数が必要な場合は、[`uniform_real_distribution`](./uniform_real_distribution.md)クラスを使用する。

テンプレートパラメータは、以下を意味する：

* `IntType` : 生成する整数の型。


##メンバ関数
###構築・リセット

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------------------|--------------------|-------|
| [`(constructor)`](./uniform_int_distribution/uniform_int_distribution.md) | コンストラクタ     | C++11 |
| `~uniform_int_distribution() = default;`                                  | デストラクタ       | C++11 |
| [`reset`](./uniform_int_distribution/reset.md)                            | 状態をリセットする | C++11 |


###生成

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------|----------------|-------|
| [`operator()`](./uniform_int_distribution/op_call.md) | 乱数を生成する | C++11 |


###プロパティ

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|----------------------------------|-------|
| [`a`](./uniform_int_distribution/a.md)         | 生成する範囲の最小値を取得する   | C++11 |
| [`b`](./uniform_int_distribution/b.md)         | 生成する範囲の最大値を取得する   | C++11 |
| [`param`](./uniform_int_distribution/param.md) | 分布のパラメータを取得／設定する | C++11 |
| [`min`](./uniform_int_distribution/min.md)     | 生成する範囲の最小値を取得する   | C++11 |
| [`max`](./uniform_int_distribution/max.md)     | 生成する範囲の最大値を取得する   | C++11 |


##メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 乱数生成結果の整数型 `IntType`。符号なし整数型でもよい。 | C++11 |
| `param_type`  | 分布パラメータの型。未規定。 | C++11 |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------------|----------------------|-------|
| [`operator==`](./uniform_int_distribution/op_equal.md)     | 等値比較             | C++11 |
| [`operator!=`](./uniform_int_distribution/op_not_equal.md) | 非等値比較           | C++11 |
| [`operator<<`](./uniform_int_distribution/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](./uniform_int_distribution/op_istream.md)   | ストリームからの入力 | C++11 |


##例
```cpp
#include <random>
#include <fstream>

int main() 
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // 0以上9以下の値を等確率で発生させる
  std::uniform_int_distribution<> dist(0, 9);

  std::ofstream result_file("uniform_int_distribution.tsv");
  for (size_t n = 0; n < 1000; ++n) {
    // 一様整数分布で乱数を生成する
    int result = dist(engine);

    result_file << result << "\t\n";
  }
}
```

###出力
このプログラムによってある時に得られた結果（[uniform_int_distribution.tsv](https://github.com/cpprefjp/image/blob/master/reference/random/uniform_int_distribution/uniform_int_distribution.tsv)）を図示する。

![](https://raw.github.com/cpprefjp/image/master/reference/random/uniform_int_distribution/uniform_int_distribution.png)

1,000個程度のデータのため、ある程度は偏りがあるが、誤差の範囲でほぼ等確率で0から9までの値が生成されていることがわかる。


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??


