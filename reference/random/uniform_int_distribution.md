# uniform_int_distribution
* random[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class IntType = int>
  class uniform_int_distribution;
}
```

## 概要
`uniform_int_distribution`は、指定された範囲の値が�確率で発生するよう離散分布するクラスである。 
このクラスは、離散一様分布(Discrete Uniform Distribution)の整数に特化したバージョンである。実数が必要な場合は、[`uniform_real_distribution`](uniform_real_distribution.md)クラスを使用する。


一様分布の整数は、以下のような用途で使用できる：

- サイコ�を振る
- カードデッ�から1枚を選ぶ


テンプレートパラメータは、以下を意味する：

- `IntType` : 生成する整数の型。


## メンバ関数
### 構築・リセット

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------------------|--------------------|-------|
| [`(constructor)`](uniform_int_distribution/op_constructor.md)           | コンストラクタ     | C++11 |
| `~uniform_int_distribution() = default;`                                  | デストラクタ       | C++11 |
| [`reset`](uniform_int_distribution/reset.md)                            | 状態をリセットする | C++11 |


### 生成

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------|----------------|-------|
| [`operator()`](uniform_int_distribution/op_call.md) | 乱数を生成する | C++11 |


### プ�パティ

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|----------------------------------|-------|
| [`a`](uniform_int_distribution/a.md)         | 生成し得る値の下限を取得する   | C++11 |
| [`b`](uniform_int_distribution/b.md)         | 生成し得る値の上限を取得する   | C++11 |
| [`param`](uniform_int_distribution/param.md) | 分布のパラメータを取得／�定する | C++11 |
| [`min`](uniform_int_distribution/min.md)     | 生成し得る値の下限を取得する   | C++11 |
| [`max`](uniform_int_distribution/max.md)     | 生成し得る値の上限を取得する   | C++11 |


## メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 乱数生成結果の整数型 `IntType`。符号なし整数型でもよい。 | C++11 |
| `param_type`  | 分布パラメータの型。未規定。 | C++11 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------------|----------------------|-------|
| [`operator==`](uniform_int_distribution/op_equal.md)     | �値比較             | C++11 |
| [`operator!=`](uniform_int_distribution/op_not_equal.md) | 非�値比較           | C++11 |
| [`operator<<`](uniform_int_distribution/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](uniform_int_distribution/op_istream.md)   | ストリームからの入力 | C++11 |


## 例
```cpp example
#include <random>
#include <fstream>

int main() 
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // 0以上9以下の値を�確率で発生させる
  std::uniform_int_distribution<> dist(0, 9);

  std::ofstream result_file("uniform_int_distribution.tsv");
  for (std::size_t n = 0; n < 1000; ++n) {
    // 一様整数分布で乱数を生成する
    int result = dist(engine);

    result_file << result << "\t\n";
  }
}
```
* std::uniform_int_distribution[color ff0000]
* std::ofstream[link /reference/fstream/basic_ofstream.md]
* dist(engine)[link uniform_int_distribution/op_call.md]

### 出力
```
```

このプ�グラムによってある時に得られた結果（[uniform_int_distribution.tsv](https://github.com/cpprefjp/image/blob/master/reference/random/uniform_int_distribution/uniform_int_distribution.tsv)）を図示する。

![](https://raw.github.com/cpprefjp/image/master/reference/random/uniform_int_distribution/uniform_int_distribution.png)

1,000個程度のデータのため、ある程度は偏りがあるが、誤差の範囲でほぼ�確率で0から9までの値が生成されていることがわかる。


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [Doubling the speed of `std::uniform_int_distribution` in the GNU C++ library - Daniel Lemire's blog](https://lemire.me/blog/2019/09/28/doubling-the-speed-of-stduniform_int_distribution-in-the-gnu-c-library/)
