# piecewise_linear_distribution
* random[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class RealType = double>
  class piecewise_linear_distribution;
}
```

## 概要
`piecewise_linear_distribution`は、区間ごとの重み付けを線形に接続した分布を生成するクラスである。  
このクラスはコンストラクタに、値の区間を表す数列と、区間ごとに線形に変化する重みの数列を�定する。  


パラメータを、区間 `{0.0, 1.0, 2.0}`、重み `{0.0, 0.5, 0.0}`のように�定した場合、区間`[0.0, 1.0)`の値が出現する確率は、重み数列によって`[0.0, 0.5)`に線形に上昇する。区間`[1.0, 2.0)`の値が出現する確率は、重み数列によって`[0.5, 0.0)`に線形に減少する。  


テンプレートパラメータは、以下を意味する。

- `RealType` : 生成される実数の型。


## メンバ関数
### 構築・リセット

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------------------------|------------------------------|-------|
| [`(constructor)`](piecewise_linear_distribution/op_constructor.md) | コンストラクタ | C++11 |
| `~piecewise_linear_distribution() = default;`                           | デストラクタ               | C++11 |
| [`reset`](piecewise_linear_distribution/reset.md)                     | 状態をリセットする         | C++11 |


### 生成

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------------|----------------|-------|
| [`operator()`](piecewise_linear_distribution/op_call.md) | 乱数を生成する | C++11 |


### プ�パティ

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------------|----------------------------------|-------|
| [`intervals`](piecewise_linear_distribution/intervals.md) | 区間の数列を取得する             | C++11 |
| [`densities`](piecewise_linear_distribution/densities.md) | 重み付けの数列を取得する         | C++11 |
| [`param`](piecewise_linear_distribution/param.md)         | 分布のパラメータを取得／�定する | C++11 |
| [`mix`](piecewise_linear_distribution/min.md)             | 下限を取得する                 | C++11 |
| [`max`](piecewise_linear_distribution/max.md)             | 上限を取得する                 | C++11 |


## メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------------------|-------|
| `result_type` | 乱数生成結果の型 `RealType`。 | C++11 |
| `param_type`  | 分布パラメータの型。未規定。  | C++11 |


## 例
```cpp example
#include <fstream>
#include <random>
#include <array>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // [0.0, 5.0)の値は、出現確率が0.0から0.5まで線形に上昇する。
  // [5.0, 10.0)の値は、出現確率が0.5から0.1まで線形に減少する。
  std::array<double, 3>
    intervals = {0.0, 5.0, 10.0},
    densities = {0.0, 0.5,  0.1};

  std::piecewise_linear_distribution<> dist(
    intervals.begin(),
    intervals.end(),
    densities.begin()
  );

  std::ofstream file("piecewise_linear_distribution.tsv");
  for (int i = 0; i < 1000; ++i) {
    double result = dist(engine);
    file << result << "\n";
  }
}
```
* std::piecewise_linear_distribution[color ff0000]
* intervals.begin()[link /reference/array/array/begin.md]
* intervals.end()[link /reference/array/array/end.md]
* densities.begin()[link /reference/array/array/begin.md]
* std::ofstream[link /reference/fstream/basic_ofstream.md]
* dist(engine)[link piecewise_linear_distribution/op_call.md]

### 出力
```
```

このプ�グラムによってある時に得られた結果（[piecewise_linear_distribution.tsv](https://github.com/cpprefjp/image/raw/master/reference/random/piecewise_linear_distribution/piecewise_linear_distribution.tsv)）を図示する。

![](https://github.com/cpprefjp/image/raw/master/reference/random/piecewise_linear_distribution/piecewise_linear_distribution.png)

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 
- [GCC](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 

