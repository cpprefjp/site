#piecewise_constant_distribution (C++11)
```cpp
namespace std {
  template <class RealType = double>
  class piecewise_constant_distribution;
}
```

##概要
`piecewise_constant_distribution`は、区間ごとの重み付けを定数値とした分布を生成するクラスである。  
このクラスはコンストラクタに、値の区間を表す数列と、区間ごとに線形に変化する重みの数列を設定する。重み数列の要素数は、区間数列の要素数 - 1個である。  


パラメータを、区間 `{0.0, 1.0, 2.0}`、重み `{0.3, 0.5}`のように設定した場合、区間`[0.0, 1.0)`の値が出現する確率は`0.3`、区間`[1.0, 2.0)`の値が出現する確率は`0.5`となる。  


テンプレートパラメータは、以下を意味する。

* `RealType` : 生成される実数の型。


##メンバ関数
###構築・リセット

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------------------------|------------------------------|-------|
| [`(constructor)`](./piecewise_constant_distribution/piecewise_constant_distribution.md) | コンストラクタ | C++11 |
| `~piecewise_constant_distribution() = default;`                             | デストラクタ               | C++11 |
| [`reset`](./piecewise_constant_distribution/reset.md)                       | 状態をリセットする         | C++11 |


###生成

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------------------|----------------|-------|
| [`operator()`](./piecewise_constant_distribution/op_call.md) | 乱数を生成する | C++11 |


###プロパティ

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------|----------------------------------|-------|
| [`intervals`](./piecewise_constant_distribution/intervals.md) | 区間の数列を取得する             | C++11 |
| [`densities`](./piecewise_constant_distribution/densities.md) | 重み付けの数列を取得する         | C++11 |
| [`param`](./piecewise_constant_distribution/param.md)         | 分布のパラメータを取得／設定する | C++11 |
| [`mix`](./piecewise_constant_distribution/min.md)             | 最小値を取得する                 | C++11 |
| [`max`](./piecewise_constant_distribution/max.md)             | 最大値を取得する                 | C++11 |


##メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------------------|-------|
| `result_type` | 乱数生成結果の型 `RealType`。 | C++11 |
| `param_type`  | 分布パラメータの型。未規定。  | C++11 |


##例
```cpp
#include <fstream>
#include <random>
#include <array>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  // [0.0, 5.0)の値は、0.3の確率で出現する。
  // [5.0, 10.0)の値は、0.5の確率で出現する。
  std::array<double, 3> intervals = {0.0, 5.0, 10.0},
  std::array<double, 2> densities = {0.3, 0.5};

  std::piecewise_constant_distribution<> dist(
    intervals.begin(),
    intervals.end(),
    densities.begin()
  );

  std::ofstream file("piecewise_constant_distribution.tsv");
  for (int i = 0; i < 1000; ++i) {
    double result = dist(engine);
    file << result << "\n";
  }
}
```


###出力
このプログラムによってある時に得られた結果（[piecewise_constant_distribution.tsv](https://github.com/cpprefjp/image/raw/master/reference/random/piecewise_constant_distribution/piecewise_constant_distribution.tsv)）を図示する。

![](https://github.com/cpprefjp/image/raw/master/reference/random/piecewise_constant_distribution/piecewise_constant_distribution.png)


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): 
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.5.3, 4.6.1
- [ICC](/implementation#icc.md): 
- [Visual C++](/implementation#visual_cpp.md): 


