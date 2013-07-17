#random(C++11)
`<random>`ヘッダ は擬似乱数を取り扱う為、乱数生成器 (Random Number Generator) や分布生成器 (Distribution) 及び関連する一連のクラス等を定義する乱数ライブラリである。


##乱数生成器

※多くのユーザーにとって以下に挙げる生の乱数生成器テンプレートクラスそのものよりも、この次に挙げるパラメータ定義済みの乱数生成器クラスを使用すれば十分である。

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------------|------------------------------|-------|
| [`linear_congruential_engine `](./random/linear_congruential_engine.md) | 線形合同法エンジン | C++11 |
| [`mersenne_twister_engine`](./random/mersenne_twister_engine.md)        | メルセンヌツイスターエンジン | C++11 |
| `subtract_with_carry_engine` | キャリー付き減算エンジン | C++11 |
| `discard_block_engine` | ディスカードブロックエンジン | C++11 |
| `independent_bits_engine` | インデペンデントビッツエンジン | C++11 |
| `shuffle_order_engine` | シャッフルオーダーエンジン | C++11 |


##パラメータ定義済み乱数生成器

※先に挙げた乱数生成器に対し一般的なパラメータを定義し、使い易い様に用意された乱数生成器クラス。

| 名前 | 説明 | 対応バージョン |
|----------------|------------------------------|-------|
| `minstd_rand0`  | | C++11 |
| `minstd_rand`   | | C++11 |
| `mt19937`       |  | C++11 |
| `mt19937_64`    |  | C++11 |
| `ranlux24_base` |  | C++11 |
| `ranlux48_base` |  | C++11 |
| `ranlux24`      |  | C++11 |
| `ranlux48`      |  | C++11 |
| `knuth_b`       |  | C++11 |
| `default_random_engine` |  | C++11 |


##分布生成器及びその他のクラス

| 名前 | 説明 | 対応バージョン |
|----------------|------------------------------|-------|-------|
| [`random_device`](./random/random_device.md)                         | 予測不能な乱数生成器(class) | C++11 |
| [`seed_seq`](./random/seed_seq.md)                                   | 疑似乱数エンジンの為のシード数列(class) | C++11 |
| [`generate_canonical`](./random/generate_canonical.md)               | 実数区間\[0.0-1.0\)に展開（事実上正規化）された一様分布乱数を得る(function template) | C++11 |
| [`uniform_int_distribution`](./random/uniform_int_distribution.md)   | 一様分布／一様整数分布生成器 | C++11 |
| [`uniform_real_distribution`](./random/uniform_real_distribution.md) | 一様分布／一様実数分布生成器 | C++11 |
| [`bernoulli_distribution`](./random/bernoulli_distribution.md)       | ベルヌーイ分布／ベルヌーイ分布生成器 | C++11 |
| [`binomial_distribution`](./random/binomial_distribution.md)         | ベルヌーイ分布／二項分布生成器 | C++11 |
| [`geometric_distribution`](./random/geometric_distribution.md)       | ベルヌーイ分布／幾何分布生成器 | C++11 |
| [`negative_binomial_distribution`](./random/negative_binomial_distribution.md) | ベルヌーイ分布／負の二項分布生成器 | C++11 |
| [`poisson_distribution`](./random/poisson_distribution.md)           | ポワソン分布／ポワソン分布生成器 | C++11 |
| [`exponential_distribution`](./random/exponential_distribution.md)   | ポワソン分布／指数分布生成器 | C++11 |
| [`gamma_distribution`](./random/gamma_distribution.md)               | ポワソン分布／ガンマ分布生成器 | C++11 |
| [`weibull_distribution`](./random/weibull_distribution.md)           | ポワソン分布／ワイブル分布生成器 | C++11 |
| [`extreme_value_distribution`](./random/extreme_value_distribution.md) | ポワソン分布／極値分布生成器 | C++11 |
| [`normal_distribution`](./random/normal_distribution.md)             | 正規分布／正規分布生成器 | C++11 |
| [`lognormal_distribution`](./random/lognormal_distribution.md)       | 正規分布／対数正規分布生成器 | C++11 |
| [`chi_squared_distribution`](./random/chi_squared_distribution.md)   | 正規分布／χ二乗分布生成器 | C++11 |
| [`cauchy_distribution`](./random/cauchy_distribution.md)             | 正規分布／コーシー分布生成器 | C++11 |
| [`fisher_f_distribution`](./random/fisher_f_distribution.md)         | 正規分布／フィッシャーの基準分布生成器 | C++11 |
| [`student_t_distribution`](./random/student_t_distribution.md)       | 正規分布／ステューデントのt分布生成器 | C++11 |
| [`discrete_distribution`](./random/discrete_distribution.md)         | 標本分布／整数のインデックスごとに離散した確率分布生成器 | C++11 |
| [`piecewise_constant_distribution`](./random/piecewise_constant_distribution.md) | 標本分布／区間ごとの重み付けを定数値とした分布生成器 | C++11 |
| [`piecewise_linear_distribution`](./random/piecewise_linear_distribution.md) | 標本分布／区間ごとの重み付けを線形に接続した分布生成器 | C++11 |


##例

以下に示す例では、C++11の標準の乱数ライブラリを用いてランダムデバイスから初期化数列を取得してメルセンヌツイスタエンジンを初期化、単精度浮動少数型で\[-1.0f - 1.0f\]の一様分布及び`1.0f`を中心として標準偏差`0.5f`の正規分布に基づく擬似乱数を1メガ個生成し"random.tsv"にタブ区切り形式のファイルとして結果を保存する。

```cpp
#include <iostream>
#include <exception>
#include <random>
#include <algorithm>
#include <functional>
#include <fstream>

int main()try{
  static const size_t seed_size = 8;
  typedef std::random_device device_type;
  typedef std::mt19937_64 engine_type;
  typedef std::uniform_real_distribution<float> distribution_type_1;
  typedef std::normal_distribution<float> distribution_type_2;
  auto s = [seed_size](){
    device_type r;
    std::vector<device_type::result_type> i(seed_size);
    std::generate(i.begin(), i.end(), std::ref(r));
    return std::seed_seq(i.begin(), i.end());
  }();
  engine_type e(s);
  distribution_type_1 d1(-1.0f, 1.0f);
  distribution_type_2 d2(1.0f, 0.5f);
  std::ofstream o("random.tsv");
  for(size_t n = 1000*1000; n; --n)
    o << d1(e) << "\t" << d2(e) << "\n";
  o.close();
}catch(const std::exception& e){
  std::cerr << e.what();
}
```
* random[color ff0000]
* std::random_device[color ff0000]
* std::mt19937_64[color ff0000]
* std::uniform_real_distribution[color ff0000]
* std::normal_distributio<[color ff0000]
* std::seed_seq[color ff0000]

この例である時得られた [random.tsv](https://github.com/cpprefjp/image/raw/master/reference/random/random.tsv.xz) (ファイルサイズが大きいので添付する上では random.tsv.xz に圧縮) を元に、得られたデータの密度を図示すると、以下のような図が得られた。

![](https://github.com/cpprefjp/image/raw/master/reference/random/random.png)

緑のラインは d1 (一様分布; min=-1.0f, max=1.0f) 、赤のラインは d2 (正規分布; mean=1.0f, stdev=0.5f) 、横軸は値、縦軸は密度(値の件数を区間ごとに数えたヒストグラムを全体に占める割合で表したもの)である。

##バージョン
###言語
- C++11

##参照：
* [さまざまな確率分布 (probability distributions)](http://www.biwako.shiga-u.ac.jp/sensei/mnaka/ut/statdist.html)

