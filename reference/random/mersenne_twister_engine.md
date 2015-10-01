#mersenne_twister_engine
* random[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class UIntType, size_t w, size_t n, size_t m, size_t r,
            UIntType a, size_t u, UIntType d, size_t s,
            UIntType b, size_t t,
            UIntType c, size_t l, UIntType f>
  class mersenne_twister_engine;

  typedef … mt19937;
  typedef … mt19937_64;
}
```
* mt19937[link ./mt19937.md]
* mt19937_64[link ./mt19937_64.md]

##概要
`mersenne_twister_engine`クラスは、メルセンヌ・ツイスター法による擬似乱数生成エンジンである。  

メルセンヌ・ツイスター法は、以下のような特徴を持つ：

1. 非常に長い周期を持つ。
2. 非常に大きな次元で均等分布する。(`n`次元…パラメータ設定済み`typedef`である`mt19937`では623次元)
	- これは内部的に、大きな配列(領域)を保持することを意味する。空間的に余裕がある場合にこのエンジンを選択する。


テンプレートパラメータは、以下を意味する：

* `UIntType` : 生成する符号なし整数の型。
* `w` : ワードサイズ。状態シーケンス内での各ワードのビット数。[`numeric_limits`](/reference/limits/numeric_limits.md)`<UIntType>::`[`digits`](/reference/limits/numeric_limits/digits.md)以下にするのがよい。
* `n` : 状態のサイズ。状態シーケンスの要素数。生成される値が再発する程度を調整するための値。
* `m` : シフトサイズ。各ひねり(twist)時にシーケンスから選択する他の値が、`m`要素離れるようにする。`n`より小さくするのがよい。
* `r` : マスクのビットサイズ。各ひねりに対する分離ポイントのマスクサイズ。`w`よりも小さくするのがよい。
* `a` : XORのマスク。各ひねりに対して、線形関数としてXORする値。`1u << w`よりも小さくするのがよい。
* `s, t, u, l` : 調律シフトのパラメータ。生成アルゴリズムによって使用される、ごちゃ混ぜ処理のシフト値。`w`よりも小さくするのがよい。
* `b, c, d` : 調律ビットマスクのパラメータ。生成アルゴリズムによって使用される、ごちゃ混ぜ処理のビットマスク値。`1u << w`以下にするのがよい。
* `f` : 初期化の乗数。ひとつの値をシードとする際の、状態シーケンスのシードとして使用する初期化乗数。


##メンバ関数
###構築・シード

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------------------------|------------------|-------|
| [`(constructor)`](./mersenne_twister_engine/op_constructor.md)          | コンストラクタ   | C++11 |
| `~mersenne_twister_engine() = default;`                                 | デストラクタ     | C++11 |
| [`seed`](./mersenne_twister_engine/seed.md)                             | シードを設定する | C++11 |


###生成

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|--------------------|-------|
| [`operator()`](./mersenne_twister_engine/op_call.md) | 擬似乱数を生成する | C++11 |
| [`discard`](./mersenne_twister_engine/discard.md)    | 指定した回数だけ擬似乱数を生成し、内部状態を進める | C++11 |


##静的メンバ関数
###エンジンの特性

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------|--------------------------------|-------|
| [`min`](./mersenne_twister_engine/min.md) | 生成する範囲の最小値を取得する | C++11 |
| [`max`](./mersenne_twister_engine/max.md) | 生成する範囲の最大値を取得する | C++11 |


##メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 擬似乱数生成結果の符号なし整数型 `UIntType`。 | C++11 |


##メンバ定数

| 定数 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `static constexpr size_t word_size`     | ワードサイズ。状態シーケンス内での各ワードのビット数。テンプレートパラメータ`w`。 | C++11 |
| `static constexpr size_t state_size`    | 状態のサイズ。状態シーケンスの要素数。生成される値が再発する程度を調整するための値。テンプレートパラメータ`n`。 | C++11 |
| `static constexpr size_t shift_size`    | シフトサイズ。各ひねり(twist)時にシーケンスから選択する他の値が、`m`要素離れるようにする。テンプレートパラメータ`m`。 | C++11 |
| `static constexpr size_t mask_bits`     | マスクのビットサイズ。各ひねりに対する分離ポイントのマスクサイズ。テンプレートパラメータ`r`。 | C++11 |
| `static constexpr UIntType xor_mask`    | XORのマスク。各ひねりに対して、線形関数としてXORする値。テンプレートパラメータ`a`。 | C++11 |
| `static constexpr size_t tempering_u`   | 調律シフトのパラメータ。生成アルゴリズムによって使用される、ごちゃ混ぜ処理のシフト値。テンプレートパラメータ`u`。 | C++11 |
| `static constexpr UIntType tempering_d` | 調律ビットマスクのパラメータ。生成アルゴリズムによって使用される、ごちゃ混ぜ処理のビットマスク値。テンプレートパラメータ`d`。 | C++11 |
| `static constexpr size_t tempering_s`   | 調律シフトのパラメータ。生成アルゴリズムによって使用される、ごちゃ混ぜ処理のシフト値。テンプレートパラメータ`s`。 | C++11 |
| `static constexpr UIntType tempering_b` | 調律ビットマスクのパラメータ。生成アルゴリズムによって使用される、ごちゃ混ぜ処理のビットマスク値。テンプレートパラメータ`b`。 | C++11 |
| `static constexpr size_t tempering_t`   | 調律シフトのパラメータ。生成アルゴリズムによって使用される、ごちゃ混ぜ処理のシフト値。テンプレートパラメータ`t`。 | C++11 |
| `static constexpr UIntType tempering_c` | 調律ビットマスクのパラメータ。生成アルゴリズムによって使用される、ごちゃ混ぜ処理のビットマスク値。テンプレートパラメータ`c`。 | C++11 |
| `static constexpr size_t tempering_l`   | 調律シフトのパラメータ。生成アルゴリズムによって使用される、ごちゃ混ぜ処理のシフト値。テンプレートパラメータ`l`。 | C++11 |
| `static constexpr UIntType initialization_multiplier` | 初期化の乗数。ひとつの値をシードとする際の、状態シーケンスのシードとして使用する初期化乗数。テンプレートパラメータ`f`。 | C++11 |
| `static constexpr result_type default_seed` | デフォルトのシード値。`5489u` | C++11 |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------------|----------------------|-------|
| [`operator==`](./mersenne_twister_engine/op_equal.md)     | 等値比較             | C++11 |
| [`operator!=`](./mersenne_twister_engine/op_not_equal.md) | 非等値比較           | C++11 |
| [`operator<<`](./mersenne_twister_engine/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](./mersenne_twister_engine/op_istream.md)   | ストリームからの入力 | C++11 |


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;

  // mersenne_twister_engineのパラメータ設定済みtypedefであるmt19937を使用する。
  // ランダムなシードを使用して初期化
  std::mt19937 engine(seed_gen());

  for (int i = 0; i < 10; ++i) {
    // 乱数を生成
    std::uint32_t result = engine();

    std::cout << result << std::endl;
  }
}
```

###出力例
```
1947293914
2297418245
2457279642
1103462493
1989850974
803886008
4019141122
4235051204
208651936
1880689761
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

##参照
* [Mersenne Twister Home Page](http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/mt.html)
* [メルセンヌ・ツイスタ - Wikipedia](http://ja.wikipedia.org/wiki/メルセンヌ・ツイスタ)
* GCC(libstdc++) 4.8以降では、`<ext/random>`ヘッダに、SSE最適化されたメルセンヌ・ツイスターである`simd_fast_mersenne_twister_engine`クラスが実装されている

