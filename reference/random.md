#random
<random> は擬似乱数を取り扱う為、乱数生成器 (Random Number Generator) や分布生成器 (Distribution) 及び関連する一連のクラス等を定義する C++11 で仕様化された乱数ライブラリである。

乱数生成器

※多くのユーザーにとって以下に挙げる生の乱数生成器テンプレートクラスそのものよりも、この次に挙げるパラメータ定義済みの乱数生成器クラスを使用すれば十分である。


| | |
|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| [linear_congruential_engine ](./random/linear_congruential_engine.md) | 線形合同法エンジン |
| mersenne_twister_engine | メルセンヌツイスターエンジン |
| subtract_with_carry_engine | キャリー付き減算エンジン |
| discard_block_engine | ディスカードブロックエンジン |
| independent_bits_engine | インデペンデントビッツエンジン |
| shuffle_order_engine | シャッフルオーダーエンジン |


パラメータ定義済み乱数生成器
<span style='line-height:25px;font-size:medium'><span style='font-size:13px;line-height:normal'>
※先に挙げた乱数生成器に対し一般的なパラメータを定義し、使い易い様に用意された乱数生成器クラス。

</span></span>
<span style='line-height:25px;font-size:medium'><span style='font-size:13px;line-height:normal'>

| | |
|-----------------------|--|
| minstd_rand0  | |
| minstd_rand | |
| mt19937 |  |
| mt19937_64 |  |
| ranlux24_base |  |
| ranlux48_base |  |
| ranlux24 |  |
| ranlux48 |  |
| knuth_b |  |
| default_random_engine |  |

</span></span>

分布生成器及びその他のクラス


| | |
|---------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| [random_device](./random/random_device.md) | 予測不能な真の乱数値を得る為のクラス |
| [seed_seq](./random/seed_seq.md) | 疑似乱数エンジンの為のシード数列クラス |
| [generate_canonical](./random/generate_canonical.md) |  |
| [uniform_int_distribution](./random/uniform_int_distribution.md) | 一様分布／一様整数分布生成器 |
| [uniform_real_distribution](./random/uniform_real_distribution.md) | 一様分布／一様実数分布生成器 |
| [bernoulli_distribution](./random/bernoulli_distribution.md) | ベルヌーイ分布／ベルヌーイ分布生成器 |
| [binomial_distribution](./random/binomial_distribution.md) | ベルヌーイ分布／二項分布生成器 |
| [geometric_distribution](./random/geometric_distribution.md) | ベルヌーイ分布／幾何分布生成器 |
| [negative_binomial_distribution](./random/negative_binomial_distribution.md) | ベルヌーイ分布／負の二項分布生成器 |
| [poisson_distribution](./random/poisson_distribution.md) | ポワソン分布／ポワソン分布生成器 |
| [exponential_distribution](./random/exponential_distribution.md) | ポワソン分布／指数分布生成器 |
| [gamma_distribution](./random/gamma_distribution.md) | ポワソン分布／ガンマ分布生成器 |
| [weibull_distribution](./random/weibull_distribution.md) | ポワソン分布／ワイブル分布生成器 |
| [extreme_value_distribution](./random/extreme_value_distribution.md) | ポワソン分布／極値分布生成器 |
| [normal_distribution](./random/normal_distribution.md) | 正規分布／正規分布生成器 |
| [lognormal_distribution](./random/lognormal_distribution.md) | 正規分布／対数正規分布生成器 |
| [chi_squared_distribution](./random/chi_squared_distribution.md) | 正規分布／χ二乗分布生成器 |
| [cauchy_distribution](./random/cauchy_distribution.md) | 正規分布／コーシー分布生成器 |
| [fisher_f_distribution](./random/fisher_f_distribution.md) | 正規分布／フィッシャーの基準分布生成器 |
| [student_t_distribution](./random/student_t_distribution.md) | 正規分布／ステューデントのt分布生成器 |
| [discrete_distribution](./random/discrete_distribution.md) | 標本分布／整数のインデックスごとに離散した確率分布生成器 |
| [piecewise_constant_distribution](./random/piecewise_constant_distribution.md) | 標本分布／区間ごとの重み付けを定数値とした分布生成器 |
| [piecewise_linear_distribution](./random/piecewise_linear_distribution.md) | 標本分布／区間ごとの重み付けを線形に接続した分布生成器 |

例

以下に示す例では、C++11の標準ライブラリ<random>等を用いてランダムデバイスから初期化数列を取得してメルセンヌツイスタエンジンを初期化、単精度浮動少数型で[-1.0f - 1.0f]の一様分布及び1.0fを中心として標準偏差0.5fの正規分布に基づく擬似乱数を1メガ個生成し"random.tsv"にタブセパレート形式のファイルとして結果を保存する。
```cpp
<code style='color:rgb(0,0,0)'>#include <iostream><code style='color:rgb(0,0,0)'>#include <exception>#include <random>#include <algorithm>#include <functional>#include <fstream><code style='color:rgb(0,0,0)'>main()try{  <code style='color:rgb(0,0,0)'>  static const size_t seed_size = 8;<code style='color:rgb(0,0,0)'>  typedef std::random_device device_type;<code style='color:rgb(0,0,0)'>  typedef std::mt19937_64 engine_type;<code style='color:rgb(0,0,0)'>  typedef std::uniform_real_distribution<float> distribution_type_1;<code style='color:rgb(0,0,0)'>  typedef std::normal_distribution<float> distribution_type_2;<code style='color:rgb(0,0,0)'>  auto s = [seed_size](){<code style='color:rgb(0,0,0)'>    device_type r;<code style='color:rgb(0,0,0)'>    std::vector<device_type::result_type> i(seed_size);<code style='color:rgb(0,0,0)'>    std::generate(i.begin(), i.end(), std::ref(r));<code style='color:rgb(0,0,0)'>    return std::seed_seq(i.begin(), i.end());<code style='color:rgb(0,0,0)'>  }();<code style='color:rgb(0,0,0)'>  engine_type e(s);<code style='color:rgb(0,0,0)'>  distribution_type_1 d1(-1.0f, 1.0f);<code style='color:rgb(0,0,0)'>  distribution_type_2 d2(1.0f, 0.5f);  <code style='color:rgb(0,0,0)'>  std::ofstream o("random.tsv");<code style='color:rgb(0,0,0)'>  for(size_t n = 1000*1000; n; --n)<code style='color:rgb(0,0,0)'>    o << d1(e) << "\t" << d2(e) << "\n";<code style='color:rgb(0,0,0)'>  o.close();<code style='color:rgb(0,0,0)'>}catch(const std::exception& e){<code style='color:rgb(0,0,0)'>  std::cerr << e.what();}

この例である時得られた random.tsv (ファイルサイズが大きいので添付する上では random.tsv.xz に圧縮) を元に、得られたデータの密度を図示すると、以下のような図が得られた。

!

緑のラインは d1 (一様分布; min=-1.0f, max=1.0f) 、赤のラインは d2 (正規分布; mean=1.0f, stdev=0.5f) 、横軸は値、縦軸は密度(値の件数を区間ごとに数えたヒストグラムを全体に占める割合で表したもの)である。

参照：
さまざまな確率分布 (probability distributions)
```
* random.tsv (ファイルサイズが大きいので添付する上では random.tsv.xz に圧縮)[link https://github.com/cpprefjp/image/raw/master/reference/random/random.tsv.xz]
* [link https://github.com/cpprefjp/image/raw/master/reference/random/random.png]
* さまざまな確率分布 (probability distributions)[link http://www.biwako.shiga-u.ac.jp/sensei/mnaka/ut/statdist.html]
* random[color ff0000]
* std::random_device[color ff0000]
* std::mt19937_64[color ff0000]
* std::uniform_real_distribution<[color ff0000]
* >[color ff0000]
* std::normal_distribution<[color ff0000]
* >[color ff0000]
* std::seed_seq([color ff0000]
* )[color ff0000]
* ([color ff0000]
* )[color ff0000]
* ([color ff0000]
* )[color ff0000]
* ([color ff0000]
* )[color ff0000]
* ([color ff0000]
* )[color ff0000]
* ([color ff0000]
* )[color ff0000]




