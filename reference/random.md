# random
* random[meta header]
* cpp11[meta cpp]

`<random>`ヘッダは、擬似乱数を取り扱うための乱数生成器 (Random Number Generator) や分布生成器 (Distribution) 、非決定論的な乱数生成器、および関連する一連のクラス・関数を定義する乱数ライブラリである。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<initializer_list>`](initializer_list.md)


## 擬似乱数生成器

擬似乱数生成器は、ソフトウェアで乱雑な値のシーケンスを生成するクラスである。

擬似乱数生成器は、環境によらず同じシードを与えれば同じ乱数列が生成される。

多くのユーザーにとっては、以下に挙げる生の乱数生成器テンプレートクラスそのものよりも、後述するパラメータ定義済みの乱数生成器の型を使用すれば十分である。

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------------------------|-------------------------------|-------|
| [`linear_congruential_engine`](random/linear_congruential_engine.md) | 線形合同法(class template)             | C++11 |
| [`mersenne_twister_engine`](random/mersenne_twister_engine.md)       | メルセンヌツイスター法(class template) | C++11 |
| [`subtract_with_carry_engine`](random/subtract_with_carry_engine.md) | �ャリー付き減算法(class template)     | C++11 |


## 生成器アダプタ

生成器アダプタは、他の乱数生成器の乱数列を調整するクラスである。

通常、ユーザーがこれらのクラスを直接使用することはない。新たな乱数アルゴリズムを作る上級者、および研究者向けの機能である。

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------------|------------------------------|-------|
| [`discard_block_engine`](random/discard_block_engine.md) | 部分的に乱数列を破棄する(class template) | C++11 |
| [`independent_bits_engine`](random/independent_bits_engine.md) | 乱数生成器が生成するビットを変更する(class template) | C++11 |
| [`shuffle_order_engine`](random/shuffle_order_engine.md) | 乱数の生成順をシャッフルする(class template) | C++11 |


## パラメータ定義済み擬似乱数生成器

先に挙げた擬似乱数生成器に対して一般的なパラメータを定義し、使いやすいように用意された擬似乱数生成器の型。

これらの型には、パフォーマンス、オブジェクトのサイズ、周期などのトレードオフがある。ユーザーの目的に合わせて擬似乱数�器の型を選択してほしい。

オブジェクトのサイズをある程度無視・許容できる状況では、多くの分野と用途に、[`mt19937`](random/mt19937.md)を推奨できる。

| 名前 | 説明 | 対応バージョン |
|----------------|---------------------------|-------|
| [`minstd_rand0`](random/minstd_rand0.md)   | 最小標準MINSTD(type-alias)                               | C++11 |
| [`minstd_rand`](random/minstd_rand.md)     | 最小標準MINSTDのパラメータ改良版(type-alias)             | C++11 |
| [`mt19937`](random/mt19937.md)             | メルセンヌツイスターの32ビット版(type-alias)             | C++11 |
| [`mt19937_64`](random/mt19937_64.md)       | メルセンヌツイスターの64ビット版(type-alias)             | C++11 |
| [`ranlux24_base`](random/ranlux24_base.md) | RANLUX法の`ranlux24`を定義するための型(type-alias)       | C++11 |
| [`ranlux48_base`](random/ranlux48_base.md) | RANLUX法の`ranlux48`を定義するための型(type-alias)       | C++11 |
| [`ranlux24`](random/ranlux24.md)           | RANLUX法のレベル3(type-alias)                            | C++11 |
| [`ranlux48`](random/ranlux48.md)           | RANLUX法のレベル4(type-alias)                            | C++11 |
| [`knuth_b`](random/knuth_b.md)             | KnuthのリオーダーアルゴリズムB(type-alias)               | C++11 |
| [`default_random_engine`](random/default_random_engine.md) | 非専門用途でデフォルト使用する擬似乱数生成器(type-alias) | C++11 |


## 非決定論的な乱数生成器

擬似乱数には「予測できる」「再現性がある」という特徴がある。

暗号化、パスワードの生成、擬似乱数のシードを決定するといった、エンドユーザーに予測されたくない乱数列が必要な場合に、擬似乱数の代わりに、以下の非決定論的な乱数生成器を利用できる。

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|-----------------------------|-------|
| [`random_device`](random/random_device.md) | 予測不能な乱数生成器(class) | C++11 |


## シード数列

| 名前 | 説明 | 対応バージョン |
|------------------------------------|-----------------------------------------|-------|
| [`seed_seq`](random/seed_seq.md) | 擬似乱数エンジンの為のシード数列(class) | C++11 |


## 分布生成器
分布生成器は、乱数生成器のよって生成される値の範囲や分布を調整するクラスである。

分布生成器は、環境によって異なるアルゴリズムで実装される可能性がある。擬似乱数生成器は環境によらず同じシードを与えれば同じ乱数列が生成されるが、分布生成器を介して乱数生成する場合、環境によって異なる乱数列が生成される場合がある。

### 一様分布

| 名前 | 説明 | 対応バージョン |
|----------------|------------------------------|-------|
| [`uniform_int_distribution`](random/uniform_int_distribution.md)   | 一様整数分布(class template) | C++11 |
| [`uniform_real_distribution`](random/uniform_real_distribution.md) | 一様実数分布(class template) | C++11 |


### ベルヌーイ分布(Bernoulli Distribution)

| 名前 | 説明 | 対応バージョン |
|----------------|------------------------------|-------|
| [`bernoulli_distribution`](random/bernoulli_distribution.md)       | ベルヌーイ分布(class) | C++11 |
| [`binomial_distribution`](random/binomial_distribution.md)         | 二項分布(class template) | C++11 |
| [`geometric_distribution`](random/geometric_distribution.md)       | 幾何分布(class template) | C++11 |
| [`negative_binomial_distribution`](random/negative_binomial_distribution.md) | 負の二項分布(class template) | C++11 |


### ポワソン分布(Poisson Distribution)

| 名前 | 説明 | 対応バージョン |
|----------------|------------------------------|-------|
| [`poisson_distribution`](random/poisson_distribution.md)             | ポワソン分布(class template) | C++11 |
| [`exponential_distribution`](random/exponential_distribution.md)     | 指数分布(class template)     | C++11 |
| [`gamma_distribution`](random/gamma_distribution.md)                 | ガンマ分布(class template)   | C++11 |
| [`weibull_distribution`](random/weibull_distribution.md)             | ワイブル分布(class template) | C++11 |
| [`extreme_value_distribution`](random/extreme_value_distribution.md) | 極値分布(class template)     | C++11 |


### �規分布(Normal Distribution)

| 名前 | 説明 | 対応バージョン |
|----------------|------------------------------|-------|
| [`normal_distribution`](random/normal_distribution.md)           | �規分布(class template)              | C++11 |
| [`lognormal_distribution`](random/lognormal_distribution.md)     | 対数�規分布(class template)          | C++11 |
| [`chi_squared_distribution`](random/chi_squared_distribution.md) | カイ二乗分布(class template)          | C++11 |
| [`cauchy_distribution`](random/cauchy_distribution.md)           | コーシー分布(class template)          | C++11 |
| [`fisher_f_distribution`](random/fisher_f_distribution.md)       | フィッシャーのF分布(class template)   | C++11 |
| [`student_t_distribution`](random/student_t_distribution.md)     | ステューデントのt分布(class template) | C++11 |


### 標本分布(Sampling Distribution)

| 名前 | 説明 | 対応バージョン |
|----------------|------------------------------|-------|
| [`discrete_distribution`](random/discrete_distribution.md) | 整数のインデックスごとに離散した確率分布生成器(class template) | C++11 |
| [`piecewise_constant_distribution`](random/piecewise_constant_distribution.md) | 区間ごとの重み付けを定数値とした分布生成器(class template) | C++11 |
| [`piecewise_linear_distribution`](random/piecewise_linear_distribution.md) | 区間ごとの重み付けを線形に接続した分布生成器(class template) | C++11 |


### ユーティリティ

| 名前 | 説明 | 対応バージョン |
|----------------|------------------------------|-------|
| [`generate_canonical`](random/generate_canonical.md) | 実数区間\[0.0,1.0\)に展開（事実上�規化）された一様分布乱数を得る(function template) | C++11 |


## 例
以下に示す例では、標準の乱数ライブラリを用いてランダムデバイスでシードを生成してメルセンヌツイスタエンジンを初期化、単精度浮動小数点数型で区間\[-1.0f, 1.0f\)の一様分布、および`1.0f`を�心として標準偏差`0.5f`の�規分布に基づく擬似乱数を100万個生成し"random.tsv"にタブ区切り形式のファイルとして結果を保�する。

```cpp example
#include <fstream>
#include <random>

int main()
{
  // メルセンヌ・ツイスター法による擬似乱数生成器を、
  // ハードウェア乱数をシードにして初期化
  std::random_device seed_gen;
  std::mt19937 engine(seed_gen());

  // 一様実数分布
  // [-1.0, 1.0)の値の範囲で、�確率に実数を生成する
  std::uniform_real_distribution<> dist1(-1.0, 1.0);

  // �規分布
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
* seed_gen()[link random/random_device/op_call.md]
* std::uniform_real_distribution[link random/uniform_real_distribution.md]
* std::normal_distribution[link random/normal_distribution.md]
* std::ofstream[link fstream/basic_ofstream.md]
* dist1(engine)[link random/uniform_real_distribution/op_call.md]
* dist2(engine)[link random/normal_distribution/op_call.md]

この例である時得られた [random.tsv](https://github.com/cpprefjp/image/raw/master/reference/random/random.tsv.xz) (ファイルサイズが大きいので添付する上では random.tsv.xz に圧縮) を元に、得られたデータの密度を図示すると、以下のような図が得られた。

![](https://github.com/cpprefjp/image/raw/master/reference/random/random.png)

破線は dist1 (一様分布; min=-1.0f, max=1.0f) 、実線は dist2 (�規分布; mean=1.0f, stdev=0.5f) 、横軸は値、縦軸は密度(値の件数を区間ごとに数えたヒストグラムを全体に占める割合で表したもの)である。


## 標準乱数ライブラリの基本的な使い方
### 「擬似」乱数生成器
擬似乱数生成器は決定論的で、再現性を持つ。
擬似乱数生成器に同じシードを与えることで、同じ乱数列を再現させられる。この挙動は開発�のテストやデバッグなどで有用である。
実行ごとに異なる乱数列が必要な場合、[`random_device`](random/random_device.md) クラスのような非決定論的に実装される乱数をシードとして使用するとよい。

また、擬似乱数生成器は高速かつ高効率に動作するよう�計されている。
しかしながら、これらが生成する乱数列は真の乱数ではなく、周期を持つ。

`<random>` が提供する擬似乱数生成器は暗号論的に安全ではない。

一方 [`random_device`](random/random_device.md) は非決定論的である（ただし実装は処理系定義なので詳細は項目を参照すること）が、
速度は擬似乱数生成器に比べ遅く、特にエント�ピープールが枯渇すると著しく悪化する。

モンテカル�法など多数の乱数が必要な場合は擬似乱数生成器の使用を推奨する。

### 推奨する擬似乱数エンジン
基本的には32ビット版メルセンヌ・ツイスターの実装である[`mt19937`](random/mt19937.md)、もしくはその64ビット版の実装である[`mt19937_64`](random/mt19937_64.md)のどちらかを使用することを推奨する。

非専門用途のための[`default_random_engine`](random/default_random_engine.md)というエンジン型も定義されているが、この型は環境によって乱雑度が低く、周期も�い擬似乱数エンジンの別名として定義される場合がある。

[`mt19937`](random/mt19937.md)は、状態の大きさが`sizeof(std::uint_fast32_t) * (624 + 1)`だけあり、少々サイズが大きいが、それを受け入れられる状況であれば、デフォルトで[`mt19937`](random/mt19937.md)を採用しよう。このエンジンでは、乱雑度や周期の長さが問題になることは少ない。

### 特定の範囲の整数や浮動小数点数が必要な場合
[`uniform_int_distribution`](random/uniform_int_distribution.md)や[`uniform_real_distribution`](random/uniform_real_distribution.md)のような、専門特化した分布クラスを使用する。

古典的な方法として、特定の範囲の整数を生成するために、剰余演算が使われていた。たとえば`[0, 6)`の範囲のランダムな整数が必要な場合には、`int x = random_value % 6;`のようにしていた。この方法では、modulo biasと呼ばれる値の偏り問題が発生する。この場合は、`[0, 3]`の値が出力される確率が17%で、`[4, 5]`の値が出力される可能性は16%となり、小さい値の方が確率が高くなる。これは、出力される可能のある乱数の最大値が、剰余する値で割り切れない場合に発生する偏りである。

専門特化した一様分布のクラスを使用することで、そのような偏りは起こらなくなる。

### シード生成法
リリース版においては、実行ごとに擬似乱数のシードが異なることが求められる。
[`random_device`](random/random_device.md) クラスが非決定論的に実装されている環境ではこれを使用するのが望ましい。

古典的な方法として、シードには`std::time(NULL)`で取得した現在時間 (エポックからの経過秒) が使われてきた。
しかしながら、この方法ではアプリケーションの起動時間によってシードを調整され、乱数列を制御されてしまう。

これを防ぐには、非決定論的な [`random_device`](random/random_device.md) や CPU の `RDRAND` 命令などを使用してシードを生成するのがよいだろう。

## バージョン
### 言語
- C++11

## 参照
### 分布アルゴリズム
* [さまざまな確率分布 (probability distributions)](http://www.biwako.shiga-u.ac.jp/sensei/mnaka/ut/statdist.html)
* [確率変数－種々の分布の特徴](https://sites.google.com/site/techdmba/distribution)

### 乱数ライブラリの使い方
* [N3551 Random Number Generation in C++11](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3551.pdf)
* [Pitfalls in Random Number Generation](https://www.codeproject.com/articles/28548/pitfalls-in-random-number-generation)

### 乱数ライブラリが導入された経緯
* [N0352 Proposal for Standardization of Random Number Generators in C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/1993/N0352.asc)
* [N1398 A Proposal to Add an Extensible Random Number Facility to the Standard Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2002/n1398.html)
* [N1452 A Proposal to Add an Extensible Random Number Facility to the Standard Library (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1452.html)
* [N1588 On Random-Number Distributions for C++0x](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1588.pdf)
* [N1837 Library Extension Technical Report  Issues List](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1837.pdf)
* [N1914 A Proposal to Add Random-Number Distributions to C++0x](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1914.pdf)
* [N1932 Random Number Generation in C++0X: A Comprehensive Proposal](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n1932.pdf)
* [N1933 Improvements to TR1’s Facility for Random Number Generation](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n1933.pdf)
* [N2032 Random Number Generation in C++0X: A Comprehensive Proposal, version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2032.pdf)
* [N2033 Proposal to Consolidate the Subtract-with-Carry Engines](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2033.pdf)
* [N2079 Random Number Generation in C++0X: A Comprehensive Proposal, version 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2079.pdf)
* [N2111 Random Number Generation in C++0X: A Comprehensive Proposal, version 4](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2111.pdf)
* [N2423 Recommendations for Resolving Issues re \[rand\], Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2423.pdf)
* [N2424 Recommendations for Resolving the 2007-09-21 Issues re \[rand\]](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2424.pdf)

### その他
- [N2930 Range-Based For Loop Wording (Without Concepts)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2930.html)


## 編集者向けの参照
* [乱数分布の図を作る方法](/editors_doc/random_figure.md)
