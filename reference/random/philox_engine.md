# philox_engine
* random[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]
* [mathjax enable]

```cpp
namespace std {
  template <class UIntType, size_t w, size_t n, size_t r, UIntType... consts>
  class philox_engine;

  using philox4x32 = …;
  using philox4x64 = …;
}
```
* philox4x32[link philox4x32.md]
* philox4x64[link philox4x64.md]

## 概要
`philox_engine`クラスは、カウンターベースのPhilox法による擬似乱数生成エンジンである。  

Philox法は、以下のような特徴を持つ：

1. 小さい容量の状態をもつ (Philox4x32の状態は10 * 32ビット個の要素)
2. 長い周期をもつ (Philox4x32の周期は2<sup>130</sup>)
3. ベクトル化・並列化がしやすい

`philox_engine`は、m = 2<sup>w</sup>−1であるとして、区間`[0, m]`の符号なし整数の乱数を生成する。

- オブジェクトの状態としては、以下をもつ：
    - n個のwビットの符号なし整数からなるシーケンスX
    - n/2個の`result_type`値からなるシーケンスK
    - n個の`result_type`値からなるシーケンスY
    - スカラー値i

    ここでそれぞれの値は以下の意味をもつ：
    - Xは $$ n \cdot w $$ ビットの符号なし整数のカウンター値 $$ Z=\sum_{j=0}^{n-1}X_{j} \cdot 2^{wj} $$ の解釈である
    - Kはキー
    - Yは生成された値のバッファ
    - iはYバッファのインデックス値
- 乱数生成アルゴリズムは、遷移アルゴリズムを適用したあと、Yのi番目に格納された値を返す
- 状態遷移は、以下のアルゴリズムで実行される：
    ```
    i=i+1
    if (i == n){
        Y = Philox(K, X) // 下記参照
        Z = (Z+1)
        i = 0
    }
    ```

- Philox関数は、長さn/2のシーケンスKと、長さnのシーケンスXを、長さnのシーケンスYにマッピングする。Philox関数はX内の値にrラウンドのSPN構造 (substitution-permutation network) を適用する。生成アルゴリズムのひとつのラウンドは以下のステップを実行する：
    - 1.  前のラウンドの出力シーケンスX'（第1ラウンドの場合はX）を並べ替えて中間状態Vを得る：
        $$ V_{j} = X'_{f(j)} $$
        ここでj = 0, …, n-1であり、`f(j)`は以下のテーブルで定義される (n=2のシーケンスは順列ではない)：
    |      | j=0 | j=1 | j=2 | j=3 | j=4 | j=5 | j=6 | j=7 | j=8 | j=9 | j=10 | j=11 | j=12 | j=13 | j=14 | j=15 |
    |------|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|------|------|------|------|------|------|
    | n=2  | 0   | 1   |     |     |     |     |     |     |     |     |      |      |      |      |      |      |
    | n=4  | 0   | 3   | 2   | 1   |     |     |     |     |     |     |      |      |      |      |      |      |
    | n=8  | 2   | 1   | 4   | 7   | 6   | 5   | 0   | 3   |     |     |      |      |      |      |      |      |
    | n=16 | 0   | 9   | 2   | 13  | 16  | 11  | 4   | 15  | 10  | 7   | 12   | 13   | 14   | 5    | 8    | 1    |

    - 2. シーケンスVの要素には以下の計算が適用される：
        $$ X'_{2 \cdot k} = mullo(V_{2 \cdot k + 1'} M_{k'} w) $$  
        $$ X'_{2 \cdot k + 1} = mulhi(V_{2 \cdot k + 1'} M_{k'} w) xor key_k^q xor V_{2 \cdot k} $$

        - ここで


### テンプレートパラメータ
* `UIntType` : 生成する符号なし整数の型。
* `w` : ワードサイズ。状態シーケンス内での各ワードのビット数
* `n` : ワード数
* `r` : ラウンド数。大きいほど乱数の質が高くなり、分布が改善する
* `consts` : 内部で使用する定数値


### 適格要件
- `sizeof...(consts) == n`が`true`であること
- `0 < r`が`true`であること
- `0 < w && w <=` [`numeric_limits`](/reference/limits/numeric_limits.md)`<UIntType>::`[`digits`](/reference/limits/numeric_limits/digits.md)が`true`であること


### 周期
n * 2<sup>w * n</sup>


### サイズ
r * wビット


## メンバ関数
### 構築・シード

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------------------------|------------------|-------|
| [`(constructor)`](mersenne_twister_engine/op_constructor.md)          | コンストラクタ   | C++11 |
| `~mersenne_twister_engine() = default;`                                 | デストラクタ     | C++11 |
| [`seed`](mersenne_twister_engine/seed.md)                             | シードを設定する | C++11 |


### 生成

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|--------------------|-------|
| [`operator()`](mersenne_twister_engine/op_call.md) | 擬似乱数を生成する | C++11 |
| [`discard`](mersenne_twister_engine/discard.md)    | 指定した回数だけ擬似乱数を生成し、内部状態を進める | C++11 |


## 静的メンバ関数
### エンジンの特性

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------|--------------------------------|-------|
| [`min`](mersenne_twister_engine/min.md) | 生成し得る値の最小値を取得する | C++11 |
| [`max`](mersenne_twister_engine/max.md) | 生成し得る値の最大値を取得する | C++11 |


## メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 擬似乱数生成結果の符号なし整数型 `UIntType`。 | C++11 |


## メンバ定数

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


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------------|----------------------|-------|
| [`operator==`](mersenne_twister_engine/op_equal.md)     | 等値比較             | C++11 |
| [`operator!=`](mersenne_twister_engine/op_not_equal.md) | 非等値比較           | C++11 |
| [`operator<<`](mersenne_twister_engine/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](mersenne_twister_engine/op_istream.md)   | ストリームからの入力 | C++11 |


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;

  // mersenne_twister_engineのパラメータ設定済み別名であるmt19937を使用する。
  // ランダムなシードを使用して初期化
  std::mt19937 engine(seed_gen());

  for (int i = 0; i < 10; ++i) {
    // 乱数を生成
    std::uint32_t result = engine();

    std::cout << result << std::endl;
  }
}
```
* std::uint32_t[link /reference/cstdint/uint32_t.md]
* engine()[link mersenne_twister_engine/op_call.md]

### 出力例
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

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
* [Mersenne Twister Home Page](http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/mt.html)
* [メルセンヌ・ツイスタ - Wikipedia](https://ja.wikipedia.org/wiki/メルセンヌ・ツイスタ)
* GCC(libstdc++) 4.8以降では、`<ext/random>`ヘッダに、SSE最適化されたメルセンヌ・ツイスターである`simd_fast_mersenne_twister_engine`クラスが実装されている

