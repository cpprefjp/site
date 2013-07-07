#discrete_distribution(C++11)
```cpp
namespace std {
  template <class IntType = int>
  class discrete_distribution;
}
```

##概要
整数のインデックスごとに離散した確率分布を生成する。

この分布クラスは、コンストラクタで指定された確率列に基いて値を分布させる。その結果として、確率列から選択された、0から始まるインデックスを返す。

テンプレートパラメータは、以下を意味する。

* `IntType` : 分布結果として返される、0から始まるインデックス値の整数型。負の値が返されることはないため、符号なし整数型を指定してもよい。デフォルトは`int`。


##メンバ関数
###構築・リセット

| 名前 | 説明 | 対応バージョン |
|---------------------------------------|------------------------------|-------|
| `(constructor)`                       | コンストラクタ               | C++11 |
| `~discrete_distribution() = default;` | デストラクタ                 | C++11 |
| `reset`                               | 分布のパラメータを設定し直す | C++11 |


###生成

| 名前 | 説明 | 対応バージョン |
|--------------|----------------------|-------|
| `operator()` | 擬似乱数を生成する。 | C++11 |


###プロパティ

| 名前 | 説明 | 対応バージョン |
|-----------------|--------------------------------------------|-------|
| `probabilities` | インデックスに対応する確率の数列を取得する | C++11 |
| `param`         | 分布のパラメータを取得／設定する           | C++11 |
| `mix`           | 最小値を取得する                           | C++11 |
| `max`           | 最大値を取得する                           | C++11 |

##メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 擬似乱数生成結果の型 `IntType`。0から始まるインデックス値が入る整数型である。符号なし整数型でもよい。 | C++11 |
| `param_type`  | 分布パラメータの型。未規定。 | C++11 |


##例
```cpp
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
  for (size_t n = 0; n < 1000; ++n) {
    // 確率列に基いて、ランダムなインデックスを生成する。
    // 確率0.1のものが選択された場合は1が返され、
    // 確率0.6が選択された場合は10が返される。
    std::size_t result = dist(engine);

    result_file << result << "\t\n";
  }
}
```


###出力
このプログラムによってある時に得られた結果（;[discrete_distribution.tsv.7z](https://github.com/cpprefjp/image/raw/master/reference/random/discrete_distribution/discrete_distribution.tsv.7z)）を図示する。

![](https://github.com/cpprefjp/image/raw/master/reference/random/discrete_distribution/discrete_distribution.png) 
![](https://github.com/cpprefjp/image/raw/master/reference/random/discrete_distribution/discrete_distribution-hist.png)


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): 
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.5.3
- [ICC](/implementation#icc.md): 
- [Visual C++](/implementation#visual_cpp.md): 


