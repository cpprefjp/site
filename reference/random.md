#random(C++11)
`<random>`ヘッダは、擬似乱数を取り扱うための乱数生成器 (Random Number Generator) や分布生成器 (Distribution) 、非決定的な乱数生成器、及び関連する一連のクラス・関数を定義する乱数ライブラリである。


##擬似乱数生成器

擬似乱数生成器は、ソフトウェアで乱雑な値のシーケンスを生成するクラスである。  
多くのユーザーにとっては、以下に挙げる生の乱数生成器テンプレートクラスそのものよりも、後述するパラメータ定義済みの乱数生成器クラスを使用すれば十分である。

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------------------------|-------------------------------|-------|
| [`linear_congruential_engine `](./random/linear_congruential_engine.md) | 線形合同法(class template)             | C++11 |
| [`mersenne_twister_engine`](./random/mersenne_twister_engine.md)        | メルセンヌツイスター法(class template) | C++11 |
| [`subtract_with_carry_engine`](./random/subtract_with_carry_engine.md)  | キャリー付き減算法(class template)     | C++11 |


##生成器アダプタ

生成器アダプタは、他の乱数生成器の乱数列を調整するクラスである。

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------------|------------------------------|-------|
| [`discard_block_engine`](./random/discard_block_engine.md) | 部分的に乱数列を破棄する(class template) | C++11 |
| [`independent_bits_engine`](./random/independent_bits_engine.md) | 乱数生成器が生成するビットを変更する(class template) | C++11 |
| [`shuffle_order_engine`](./random/shuffle_order_engine.md) | 乱数の生成順をシャッフルする(class template) | C++11 |


##パラメータ定義済み擬似乱数生成器

先に挙げた乱数生成器に対し一般的なパラメータを定義し、使いやすいように用意された乱数生成器クラス。

| 名前 | 説明 | 対応バージョン |
|----------------|------------------------------|-------|
| [`minstd_rand0`](./random/minstd_rand0.md)   | 線形合同法／最小標準MINSTD(typedef)                   | C++11 |
| [`minstd_rand`](./random/minstd_rand.md)     | 線形合同法／最小標準MINSTDのパラメータ改良版(typedef) | C++11 |
| [`mt19937`](./random/mt19937.md)             | メルセンヌツイスターの32ビット版(typedef)             | C++11 |
| [`mt19937_64`](./random/mt19937_64.md)       | メルセンヌツイスターの64ビット版(typedef)             | C++11 |
| [`ranlux24_base`](./random/ranlux24_base.md) | RANLUX法の`ranlux24`を定義するための型(typedef)       | C++11 |
| [`ranlux48_base`](./random/ranlux48_base.md) | RANLUX法の`ranlux48`を定義するための型(typedef)       | C++11 |
| [`ranlux24`](./random/ranlux24.md)           | RANLUX法のレベル3(typedef)                            | C++11 |
| [`ranlux48`](./random/ranlux48.md)           | RANLUX法のレベル4(typedef)                            | C++11 |
| [`knuth_b`](./random/knuth_b.md)             | KnuthのリオーダーアルゴリズムB(typedef)               | C++11 |
| [`default_random_engine`](./random/default_random_engine.md) | 非専門用途でデフォルト使用する擬似乱数生成器(typedef) | C++11 |


##非決定的な乱数生成器

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|-----------------------------|-------|
| [`random_device`](./random/random_device.md) | 予測不能な乱数生成器(class) | C++11 |


##シード数列

| 名前 | 説明 | 対応バージョン |
|------------------------------------|-----------------------------------------|-------|
| [`seed_seq`](./random/seed_seq.md) | 疑似乱数エンジンの為のシード数列(class) | C++11 |


##分布生成器
###一様分布

| 名前 | 説明 | 対応バージョン |
|----------------|------------------------------|-------|
| [`uniform_int_distribution`](./random/uniform_int_distribution.md)   | 一様整数分布(class template) | C++11 |
| [`uniform_real_distribution`](./random/uniform_real_distribution.md) | 一様実数分布(class template) | C++11 |


###ベルヌーイ分布(Bernoulli Distribution)

| 名前 | 説明 | 対応バージョン |
|----------------|------------------------------|-------|
| [`bernoulli_distribution`](./random/bernoulli_distribution.md)       | ベルヌーイ分布(class) | C++11 |
| [`binomial_distribution`](./random/binomial_distribution.md)         | 二項分布(class template) | C++11 |
| [`geometric_distribution`](./random/geometric_distribution.md)       | 幾何分布(class template) | C++11 |
| [`negative_binomial_distribution`](./random/negative_binomial_distribution.md) | 負の二項分布(class template) | C++11 |


###ポワソン分布(Poisson Distribution)

| 名前 | 説明 | 対応バージョン |
|----------------|------------------------------|-------|
| [`poisson_distribution`](./random/poisson_distribution.md)             | ポワソン分布(class template) | C++11 |
| [`exponential_distribution`](./random/exponential_distribution.md)     | 指数分布(class template)     | C++11 |
| [`gamma_distribution`](./random/gamma_distribution.md)                 | ガンマ分布(class template)   | C++11 |
| [`weibull_distribution`](./random/weibull_distribution.md)             | ワイブル分布(class template) | C++11 |
| [`extreme_value_distribution`](./random/extreme_value_distribution.md) | 極値分布(class template)     | C++11 |


###正規分布(Normal Distribution)

| 名前 | 説明 | 対応バージョン |
|----------------|------------------------------|-------|
| [`normal_distribution`](./random/normal_distribution.md)           | 正規分布(class template)              | C++11 |
| [`lognormal_distribution`](./random/lognormal_distribution.md)     | 対数正規分布(class template)          | C++11 |
| [`chi_squared_distribution`](./random/chi_squared_distribution.md) | カイ二乗分布(class template)          | C++11 |
| [`cauchy_distribution`](./random/cauchy_distribution.md)           | コーシー分布(class template)          | C++11 |
| [`fisher_f_distribution`](./random/fisher_f_distribution.md)       | フィッシャーのF分布(class template)   | C++11 |
| [`student_t_distribution`](./random/student_t_distribution.md)     | ステューデントのt分布(class template) | C++11 |


###標本分布(Sampling Distribution)

| 名前 | 説明 | 対応バージョン |
|----------------|------------------------------|-------|
| [`discrete_distribution`](./random/discrete_distribution.md) | 整数のインデックスごとに離散した確率分布生成器(class template) | C++11 |
| [`piecewise_constant_distribution`](./random/piecewise_constant_distribution.md) | 区間ごとの重み付けを定数値とした分布生成器(class template) | C++11 |
| [`piecewise_linear_distribution`](./random/piecewise_linear_distribution.md) | 区間ごとの重み付けを線形に接続した分布生成器(class template) | C++11 |


###ユーティリティ

| 名前 | 説明 | 対応バージョン |
|----------------|------------------------------|-------|
| [`generate_canonical`](./random/generate_canonical.md) | 実数区間\[0.0-1.0\)に展開（事実上正規化）された一様分布乱数を得る(function template) | C++11 |


##例

以下に示す例では、C++11の標準の乱数ライブラリを用いてランダムデバイスから初期化数列を取得してメルセンヌツイスタエンジンを初期化、単精度浮動少数型で\[-1.0f - 1.0f\]の一様分布及び`1.0f`を中心として標準偏差`0.5f`の正規分布に基づく擬似乱数を1メガ個生成し"random.tsv"にタブ区切り形式のファイルとして結果を保存する。

```cpp
#include <fstream>
#include <random>

int main()
{
  // メルセンヌ・ツイスター法による擬似乱数生成器を、
  // ハードウェア乱数をシードにして初期化
  std::random_device seed_gen;
  std::mt19937 engine(seed_gen());

  // 一様実数分布
  // [-1.0, 1.0)の値の範囲で、等確率に実数を生成する
  std::uniform_real_distribution<> dist1(-1.0, 1.0);

  // 正規分布
  // 平均1.0、標準偏差0.5で分布させる
  std::normal_distribution<> dist2(1.0, 0.5);

  std::ofstream file("random.tsv");
  for (size_t i = 0; i < 1000*1000; ++i) {
    // 各分布法に基いて乱数を生成
    double r1 = dist1(engine);
    double r2 = dist2(engine);
 
    file << r1 << "\t" << r2 << "\n";
  }
}
```

この例である時得られた [random.tsv](https://github.com/cpprefjp/image/raw/master/reference/random/random.tsv.xz) (ファイルサイズが大きいので添付する上では random.tsv.xz に圧縮) を元に、得られたデータの密度を図示すると、以下のような図が得られた。

![](https://github.com/cpprefjp/image/raw/master/reference/random/random.png)

破線は dist1 (一様分布; min=-1.0f, max=1.0f) 、実線は dist2 (正規分布; mean=1.0f, stdev=0.5f) 、横軸は値、縦軸は密度(値の件数を区間ごとに数えたヒストグラムを全体に占める割合で表したもの)である。

##バージョン
###言語
- C++11

##参照
* [さまざまな確率分布 (probability distributions)](http://www.biwako.shiga-u.ac.jp/sensei/mnaka/ut/statdist.html)
* [確率変数－種々の分布の特徴](https://sites.google.com/site/techdmba/distribution)
* [N1398 A Proposal to Add an Extensible Random Number Facility to the Standard Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2002/n1398.html)
* [N3551 Random Number Generation in C++11](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3551.pdf)

##編集者向けの参照
* [乱数分布の図を作る方法](/editors_doc/random_figure.md)

