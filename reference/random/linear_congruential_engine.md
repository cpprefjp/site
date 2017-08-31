# linear_congruential_engine
* random[meta header]
* std[meta namespace]
* class template[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class UIntType, UIntType a, UIntType c, UIntType m>
  class linear_congruential_engine;

  using minstd_rand0 = …;
  using minstd_rand  = …;
}
```
* minstd_rand0[link minstd_rand0.md]
* minstd_rand[link minstd_rand.md]

## 概要
`linear_congruential_engine`クラスは、線形合同法による擬似乱数生成エンジンである。  
前の擬似乱数と定数a、定数c、定数mを保持し、以下の漸化式により次の擬似乱数を生成する。

$$x_{n+1}= (a \times x_n + c) \bmod m$$

線形合同法は、以下の特徴を持つ：

* 省メモリで高速
* 周期が短い(2<sup>31</sup>-1)

省メモリで高速という点から、多くの言語で、標準の乱数生成法として使用されている。  
C言語から引き継いだ標準ライブラリ関数[`std::rand()`](/reference/cstdlib/rand.md.nolink)の乱数生成法は実装定義だが、多くの実装で線形合同法が使用されている。


しかし、メモリ使用量がそれほど問題にならないのであれば、メルセンヌ・ツイスター([`mt19937`](mt19937.md))の使用を検討した方がいいだろう。

標準にはないが、メモリ使用量が少なく、高速で、周期も長い(メルセンヌ・ツイスターほどではない)、xorshiftという乱数生成法も存在する。


## メンバ関数
### 構築・シード

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------------------------------|------------------|-------|
| [`(constructor)`](linear_congruential_engine/op_constructor.md)             | コンストラクタ   | C++11 |
| `~linear_congruential_engine() = default;`                                    | デストラクタ     | C++11 |
| [`seed`](linear_congruential_engine/seed.md)                                | シードを設定する | C++11 |


### 生成

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------|--------------------|-------|
| [`operator()`](linear_congruential_engine/op_call.md) | 擬似乱数を生成する | C++11 |
| [`discard`](linear_congruential_engine/discard.md)    | 指定した回数だけ擬似乱数を生成し、内部状態を進める | C++11 |


## 静的メンバ関数
### エンジンの特性

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|--------------------------------|-------|
| [`min`](linear_congruential_engine/min.md) | 生成し得る値の最小値を取得する | C++11 |
| [`max`](linear_congruential_engine/max.md) | 生成し得る値の最大値を取得する | C++11 |


## メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 擬似乱数生成結果の符号なし整数型 `UIntType`。 | C++11 |


## メンバ定数

| 定数 | 説明 | 対応バージョン |
|---------------|-------------------|---------|
| `static constexpr result_type multiplier`   | 乗項a。テンプレートパラメータ`a`。 | C++11 |
| `static constexpr result_type increment`    | 増分項c。状態シーケンスの要素数。テンプレートパラメータ`c`。 | C++11 |
| `static constexpr result_type modulus`      | 剰余項m。テンプレートパラメータ`m`。 | C++11 |
| `static constexpr result_type default_seed` | デフォルトのシード値。`1u` | C++11 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------------------|----------------------|-------|
| [`operator==`](linear_congruential_engine/op_equal.md)     | 等値比較             | C++11 |
| [`operator!=`](linear_congruential_engine/op_not_equal.md) | 非等値比較           | C++11 |
| [`operator<<`](linear_congruential_engine/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](linear_congruential_engine/op_istream.md)   | ストリームからの入力 | C++11 |


## 例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;

  // linear_congruential_engineのパラメータ設定済み別名であるminstd_randを使用する。
  // ランダムなシードを使用して初期化
  std::minstd_rand engine(seed_gen());

  for (int i = 0; i < 10; ++i) {
    // 乱数を生成
    std::uint32_t result = engine();

    std::cout << result << std::endl;
  }
}
```
* std::minstd_rand[color ff0000]
* std::random_device[link random_device.md]
* seed_gen()[link random_device/op_call.md]
* std::uint32_t[link /reference/cstdint/uint32_t.md]
* engine()[link linear_congruential_engine/op_call.md]

### 出力
```
822915164
932862885
1787211539
1775131785
641394788
496072749
1485002929
1719732546
81869534
554365234
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 
