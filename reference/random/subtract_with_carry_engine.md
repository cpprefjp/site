# subtract_with_carry_engine
* random[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class UIntType, size_t w, size_t s, size_t r>
  class subtract_with_carry_engine;

  using ranlux24_base = …;
  using ranlux48_base = …;
  using ranlux24      = …;
  using ranlux48      = …;
}
```
* ranlux24[link ranlux24.md]
* ranlux48[link ranlux48.md]
* ranlux24_base[link ranlux24_base.md]
* ranlux48_base[link ranlux48_base.md]

## 概要
`subtract_with_carry_engine`クラスは、[�ャリー付き減算法](https://en.wikipedia.org/wiki/Subtract_with_carry)による擬似乱数生成エンジンである。

テンプレートパラメータの意味は以下の通り:

* `UIntType`: 生成する符号なし整数の型。
* `w`: ワードサイズ。`0 < w <= `[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<UIntType>::`[`digits`](/reference/limits/numeric_limits/digits.md) でなければならない。
* `s`: �いラグ。`0 < s < r` でなければならない。
* `r`: 長いラグ。

�ャリー付き減算法は、以下の特徴を持つ：

* [メルセンヌ・ツイスター](mersenne_twister_engine.md)より周期が�い(10<sup>171</sup>)が軽量。
* シードを系統的に選ぶ (例えばスレッド ID) と、特に初期において生成した値の間に線型の相関 (nearly affine dependence) がみられる。これを避けるには
    * [`random_device`](random_device.md) �の非決定論的な乱数をシードとして使う
    * [最初の方の値を捨てる](subtract_with_carry_engine/discard.md)


この生成法は、RANLUX (LUXury RANdom numbers) 法の実装にも使われる。


## メンバ関数
### 構築・シード

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------------------------------|------------------|-------|
| [`(constructor)`](subtract_with_carry_engine/op_constructor.md)             | コンストラクタ   | C++11 |
| `~subtract_with_carry_engine() = default;`                                    | デストラクタ     | C++11 |
| [`seed`](subtract_with_carry_engine/seed.md)                                | シードを�定する | C++11 |


### 生成

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------|--------------------|-------|
| [`operator()`](subtract_with_carry_engine/op_call.md) | 擬似乱数を生成する | C++11 |
| [`discard`](subtract_with_carry_engine/discard.md)    | 指定した回数だけ擬似乱数を生成し、内部状態を進める | C++11 |


## 静的メンバ関数
### エンジンの特性

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|--------------------------------|-------|
| [`min`](subtract_with_carry_engine/min.md) | 生成し得る値の最小値を取得する | C++11 |
| [`max`](subtract_with_carry_engine/max.md) | 生成し得る値の最大値を取得する | C++11 |


## メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 擬似乱数生成結果の符号なし整数型 `UIntType`。 | C++11 |


## メンバ定数

| 定数 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `static constexpr size_t word_size` | ワードサイズ。状態シーケンス内での各ワードのビット数。テンプレートパラメータ`w`。 | C++11 |
| `static constexpr size_t short_lag` | �いラグ。進める要素数。テンプレートパラメータ`s`。 | C++11 |
| `static constexpr size_t long_lag`  | 長いラグ。オペランドの値間の距離。テンプレートパラメータ`r`。 | C++11 |
| `static constexpr result_type default_seed` | デフォルトのシード値。`19780503u` | C++11 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------------------|----------------------|-------|
| [`operator==`](subtract_with_carry_engine/op_equal.md)     | �値比較             | C++11 |
| [`operator!=`](subtract_with_carry_engine/op_not_equal.md) | 非�値比較           | C++11 |
| [`operator<<`](subtract_with_carry_engine/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](subtract_with_carry_engine/op_istream.md)   | ストリームからの入力 | C++11 |


## 例
```cpp example
#include <iostream>
#include <random>
#include <cstdint>

int main()
{
  std::random_device seed_gen;

  // subtract_with_carry_engineのパラメータ�定済み別名であるranlux24_baseを使用する。
  // ランダムなシードを使用して初期化
  std::ranlux24_base engine(seed_gen());

  for (int i = 0; i < 10; ++i) {
    // 乱数を生成
    std::uint32_t result = engine();

    std::cout << result << std::endl;
  }
}
```
* std::ranlux24_base[color ff0000]
* std::uint32_t[link /reference/cstdint/uint32_t.md]
* engine()[link subtract_with_carry_engine/op_call.md]

### 出力
```
5880757
13095533
1545433
15249896
3512432
2193500
7368389
13589182
9374747
13701319
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 
- [GCC](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015, 2017
	- 2008には、`std::tr1::subtract_with_carry`が�在する。

## 参照
- [Subtract with carry - Wikipedia](https://en.wikipedia.org/wiki/Subtract_with_carry)
- [A New Class of Random Number Generators](http://projecteuclid.org/DPubS?service=UI&version=1.0&verb=Display&handle=euclid.aoap/1177005878), George Marsaglia and Arif Zaman, The Annals of Applied Probability, Vol. 1, No. 3, 1991
- [M. Matsumoto, et al., Common Defects in Initialization of Pseudorandom Number Generators, *ACM Trans. Model. Comput. Simul.* **17**, 15 (2007)](https://doi.org/10.1145/1276927.1276928)
