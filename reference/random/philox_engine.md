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

1. 小さい容量の状態をもつ (Philox4x32の状態は32ビットの値 * 10個の要素)
2. 長い周期をもつ (Philox4x32の周期は2<sup>130</sup>)
3. ベクトル化・並列化がしやすい

`philox_engine`は、 $ m = 2^{w}−1 $ であるとして、区間`[0, m]`の符号なし整数の乱数を生成する。

- オブジェクトの状態としては、以下をもつ：
    - n個のwビットの符号なし整数からなるシーケンス $X$
    - n/2個の`result_type`値からなるシーケンス $K$
    - n個の`result_type`値からなるシーケンス $Y$
    - スカラー値i

    ここでそれぞれの値は以下の意味をもつ：
    - $X$ は $ n \cdot w $ ビットの符号なし整数のカウンター値 $ Z=\sum_{j=0}^{n-1}X_{j} \cdot 2^{wj} $ の解釈である
    - $K$ はキー
    - $Y$ は生成された値のバッファ
    - $i$ は $Y$ バッファのインデックス値

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

    - 2. シーケンス $V$ の要素には以下の計算が適用される：
        $$ X'_{2 \cdot k} = mullo(V_{2 \cdot k + 1},\ M_{k},\ w) $$
        $$ X'_{2 \cdot k + 1} = mulhi(V_{2 \cdot k + 1},\ M_{k}, w)\ xor\ key_k^q\ xor\ V_{2 \cdot k} $$

        - ここで以下のように定義する：
            - `mullo(a, b, w)`関数は、`a`と`b`を掛けた剰余の下半分を返す： $ a \cdot b\ mod \ 2^{w} $
            - `mulhi(a, b, w)`関数は、`a`と`b`を掛けた上半分を返す： $ \left( \lfloor (a \cdot b) / 2^{w} \rfloor \right) $ 。`k`は0, …, n/2-1のインデックスシーケンスである
            - `q`は0, …, r - 1のラウンドのインデックスである
            - $ key_k^q $ はラウンド`q`の`k`番目のラウンドキーであり、 $ key_k^q = \left( K_{k}\ +\ q \cdot C_{k} \right)\ mod\ 2^{w} $
            - $ K_{k} $ はシードで一度生成されたキーであり、[`seed()`](philox_engine/seed.md)関数が呼ばれない限り固定である
            - $ M_{k} $ は`multipliers`である
            - $ C_{k} $ は`round_consts`である

- 一回のラウンド関数が`r`回適用されたあと、Philoxはシーケンス`Y=X'`を返す
- このクラスオブジェクトのテキスト表現は、 $ K_{0}, …, K_{n/2-1}, X_{0}, …, X_{n-1}, i $ の順で対応する
    - 備考: ストリーム演算子は、必要に応じて $K$ と $X$ から $Y$ を再構築できる


### テンプレートパラメータ
- `UIntType` : 生成する符号なし整数の型。
- `w` : ワードサイズ。状態シーケンス内での各ワードのビット数
- `n` : ワード数
- `r` : ラウンド数
- `consts` : 内部で使用する`n`個の定数値
    - $ M_{k} $ と $ C_{k} $ の値を表し、以下のようにグループ化される： $ \left[ M_{0}, C_{0}, M_{1}, C_{1}, M_{2}, C_{2}, …, M_{n/2-1}, C_{n/2-1} \right] $


### 適格要件
- `sizeof...(consts) == n`が`true`であること
- `0 < r`が`true`であること
- `0 < w && w <=` [`numeric_limits`](/reference/limits/numeric_limits.md)`<UIntType>::`[`digits`](/reference/limits/numeric_limits/digits.md)が`true`であること


### 周期
$ n \cdot 2^{w \cdot n} $


### サイズ
$ r \cdot w $ ビット


## メンバ関数
### 構築・シード

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------|------------------|-------|
| [`(constructor)`](philox_engine/op_constructor.md)  | コンストラクタ   | C++26 |
| `~philox_engine() = default;`                       | デストラクタ     | C++26 |
| [`seed`](philox_engine/seed.md)                     | シードを設定する | C++26 |
| [`set_counter`](philox_engine/set_counter.md)       | カウンターを設定する | C++26 |


### 生成

| 名前 | 説明 | 対応バージョン |
|------------------------------------------|--------------------|-------|
| [`operator()`](philox_engine/op_call.md) | 擬似乱数を生成する | C++26 |
| [`discard`](philox_engine/discard.md)    | 指定した回数だけ擬似乱数を生成し、内部状態を進める | C++26 |


## 静的メンバ関数
### エンジンの特性

| 名前 | 説明 | 対応バージョン |
|-------------------------------|--------------------------------|-------|
| [`min`](philox_engine/min.md) | 生成し得る値の最小値を取得する | C++26 |
| [`max`](philox_engine/max.md) | 生成し得る値の最大値を取得する | C++26 |


## メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 擬似乱数生成結果の符号なし整数型 `UIntType`。 | C++26 |


## メンバ定数

| 定数 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `static constexpr size_t word_size`   | ワードサイズ。状態シーケンス内での各ワードのビット数。テンプレートパラメータ`w`。 | C++26 |
| `static constexpr size_t word_count`  | 状態のサイズ。状態シーケンスの要素数。生成される値が再発する程度を調整するための値。テンプレートパラメータ`n`。 | C++26 |
| `static constexpr size_t round_count` | ラウンド数。大きいほど乱数の質が高くなり、分布が改善する。テンプレートパラメータ`r`。 | C++26 |
| `static constexpr array<result_type, n / 2> multipliers` | カウンター値に対する乗数。 | C++26 |
| `static constexpr array<result_type, n / 2>` | ラウンドごとのキー値 | C++26 |
| `static constexpr result_type default_seed` | デフォルトのシード値。`20111115u` | C++26 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------|----------------------|-------|
| [`operator==`](philox_engine/op_equal.md)     | 等値比較             | C++26 |
| `operator!=`                                  | 非等値比較 (`==`により使用可能) | C++26 |
| [`operator<<`](philox_engine/op_ostream.md)   | ストリームへの出力   | C++26 |
| [`operator>>`](philox_engine/op_istream.md)   | ストリームからの入力 | C++26 |


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;

  // philox_engineのパラメータ設定済み別名であるphilox4x32を使用する。
  // ランダムなシードを使用して初期化
  std::philox4x32 engine{seed_gen()};

  for (int i = 0; i < 10; ++i) {
    // 乱数を生成
    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }
}
```
* std::uint32_t[link /reference/cstdint/uint32_t.md]
* engine()[link philox_engine/op_call.md]

### 出力例
```
717409690
3816001420
2063273750
279442752
2836561695
431684143
3973522490
2090827657
748889484
859307553
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 19 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P1932R0 Extension of the C++ random number generators](http://open-std.org/JTC1/SC22/WG21/docs/papers/2019/p1932r0.pdf)
    - C++にPhilox乱数生成器が最初に提案された文書
- [Parallel Random Numbers: As Easy as 1, 2, 3](https://www.thesalmons.org/john/random123/papers/random123sc11.pdf)
    - 2011年に発表されたこの論文でPhilox乱数生成器が考案された
