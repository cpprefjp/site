#shuffle_order_engine
* random[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template<class Engine, size_t K>
  class shuffle_order_engine;

  typedef … knuth_b;
}
```
* knuth_b[link knuth_b.md]

##概要
`shuffle_order_engine`クラスは、乱数生成エンジンが生成する乱数を調整し、バッファリングされた乱数列からランダムに値を選択する生成器アダプタである。  
テンプレートパラメータ`K`は、バッファリングする乱数列のサイズである。  


このアルゴリズムは、以下のような動作を行う：

1. 元となる乱数生成器で、`K`個の乱数を生成し、バッファリングする。
2. 元となる乱数生成器を`e`、最後に選択した乱数を`Y`とした場合、式`i = K * (Y - e.min()) / (e.max() - e.min() + 1)`によって、選択位置`i`を決定する。
3. バッファリングされた乱数列を`v`とした場合、`Y = v[i]`とし、乱数列の`i`番目を選択する。
4. 式`v[i] = e()`で、使用済みの乱数を、新たな乱数で置き換える。
5. `Y`を生成した乱数として返す。


この生成器アダプタは、標準内においては[`linear_congruential_engine`](linear_congruential_engine.md)クラスと組み合わせて、KnuthのリオーダーアルゴリズムB([`knuth_b`](knuth_b.md))の実装に使用されている。


##要件
`K > 0`であること。


##メンバ関数
###構築・シード

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------------------|------------------|-------|
| [`(constructor)`](shuffle_order_engine/op_constructor.md)       | コンストラクタ   | C++11 |
| `~shuffle_order_engine() = default;`                              | デストラクタ     | C++11 |
| [`seed`](shuffle_order_engine/seed.md)                          | シードを設定する | C++11 |


###生成

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------|--------------------|-------|
| [`operator()`](shuffle_order_engine/op_call.md) | 乱数を生成する | C++11 |
| [`discard`](shuffle_order_engine/discard.md)    | 指定した回数だけ擬似乱数を生成し、内部状態を進める | C++11 |


###エンジンの特性

| 名前 | 説明 | 対応バージョン |
|------------------------------------------|------------------------------|-------|
| [`base`](shuffle_order_engine/base.md) | 元となる乱数生成器を取得する | C++11 |


##静的メンバ関数
###エンジンの特性

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|--------------------------------|-------|
| [`min`](shuffle_order_engine/min.md) | 生成し得る値の最小値を取得する | C++11 |
| [`max`](shuffle_order_engine/max.md) | 生成し得る値の最大値を取得する | C++11 |


##メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 擬似乱数生成結果型 `typename Engine::result_type`。 | C++11 |


##メンバ定数

| 定数 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `static constexpr size_t table_size` | バッファリングする乱数列の要素数。テンプレートパラメータ`K`。 | C++11 |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------------------|----------------------|-------|
| [`operator==`](shuffle_order_engine/op_equal.md)     | 等値比較             | C++11 |
| [`operator!=`](shuffle_order_engine/op_not_equal.md) | 非等値比較           | C++11 |
| [`operator<<`](shuffle_order_engine/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](shuffle_order_engine/op_istream.md)   | ストリームからの入力 | C++11 |


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  // 線形合同法で普通に乱数を生成する
  {
    std::minstd_rand0 base_engine;
    for (int i = 0; i < 10; ++i) {
      std::cout << base_engine() << std::endl;
    }
  }

  // shuffle_order_engineを通して線形合同法で乱数を生成する
  // バッファサイズ5
  std::cout << std::endl;
  {
    std::shuffle_order_engine<std::minstd_rand0, 5> engine;

    for (int i = 0; i < 10; ++i) {
      std::cout << engine() << std::endl;
    }
  }
}
```
* std::shuffle_order_engine[color ff0000]
* std::minstd_rand0[link minstd_rand0.md]
* base_engine()[link linear_congruential_engine/op_call.md]
* engine()[link shuffle_order_engine/op_call.md]

###出力
```
16807
282475249
1622650073
984943658
1144108930
470211272
101027544
1457850878
1458777923
2007237709

282475249
16807
1457850878
984943658
1622650073
2007237709
1144108930
823564440
101027544
1458777923
```

出力結果から、線形合同法が生成する順番が適度に入れ替えられ、乱雑さが増加していることがわかる。


## バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 

