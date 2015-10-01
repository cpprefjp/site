#discard_block_engine
* random[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Engine, size_t p, size_t r>
  class discard_block_engine;

  typedef … ranlux24;
  typedef … ranlux48;
}
```
* ranlux24[link ./ranlux24.md]
* ranlux48[link ./ranlux48.md]

##概要
`discard_block_engine`クラスは、乱数生成エンジンが生成する乱数を調整し、捨てるブロックと使用するブロックに分ける生成器アダプタである。  
テンプレートパラメータ`p`はブロックの全体サイズ、`r`は使用するブロックサイズである。`p - r`が破棄するブロックサイズとなる。  

この生成器アダプタは、標準内においては[`subtract_with_carry_engine`](./subtract_with_carry_engine.md)クラスと組み合わせて、RANLUX(LUXury RANdom numbers)法を実装するために使われる。RANLUX法は、重複のない独立した乱数列を生成することで知られている。


##要件
`0 < r`かつ`r <= p`であること。


##メンバ関数
###構築・シード

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------------------|------------------|-------|
| [`(constructor)`](./discard_block_engine/op_constructor.md)       | コンストラクタ   | C++11 |
| `~discard_block_engine() = default;`                              | デストラクタ     | C++11 |
| [`seed`](./discard_block_engine/seed.md)                          | シードを設定する | C++11 |


###生成

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------|--------------------|-------|
| [`operator()`](./discard_block_engine/op_call.md) | 乱数を生成する | C++11 |
| [`discard`](./discard_block_engine/discard.md)    | 指定した回数だけ乱数を生成し、内部状態を進める | C++11 |


###エンジンの特性

| 名前 | 説明 | 対応バージョン |
|------------------------------------------|------------------------------|-------|
| [`base`](./discard_block_engine/base.md) | 元となる乱数生成器を取得する | C++11 |


##静的メンバ関数
###エンジンの特性

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|--------------------------------|-------|
| [`min`](./discard_block_engine/min.md) | 生成する範囲の最小値を取得する | C++11 |
| [`max`](./discard_block_engine/max.md) | 生成する範囲の最大値を取得する | C++11 |


##メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 擬似乱数生成結果型 `typename Engine::result_type`。 | C++11 |


##メンバ定数

| 定数 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `static constexpr size_t block_size` | ブロックサイズ。テンプレートパラメータ`p`。 | C++11 |
| `static constexpr size_t used_size`  | 使用するブロックサイズ。テンプレートパラメータ`r`。 | C++11 |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------------------|----------------------|-------|
| [`operator==`](./discard_block_engine/op_equal.md)     | 等値比較             | C++11 |
| [`operator!=`](./discard_block_engine/op_not_equal.md) | 非等値比較           | C++11 |
| [`operator<<`](./discard_block_engine/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](./discard_block_engine/op_istream.md)   | ストリームからの入力 | C++11 |


##例
```cpp
#include <iostream>
#include <random>

// [0, 1, 2, 3.....)のように、単にカウンタを進めていくだけのエセ乱数生成器
class sequence_generator {
  size_t value_ = 0;
public:
  using result_type = size_t;

  sequence_generator(result_type = 0) {}
  void seed(result_type) {}

  constexpr static result_type min() { return 0; }
  constexpr static result_type max() { return 65537; }

  result_type operator()()
  {
    return value_++;
  }

  void discard(unsigned long long z)
  {
    for (size_t i = 0; i < z; ++i) {
      (*this)();
    }
  }
};

int main()
{
  // ブロック全体のサイズp : 3
  // 使用するサイズr : 2
  // 破棄するサイズ : p - r == 1
  std::discard_block_engine<sequence_generator, 3, 2> engine;

  for (int i = 0; i < 10; ++i) {
    std::cout << engine() << std::endl;
  }
}
```

###出力
```
0
1
3
4
6
7
9
10
12
13
```

出力結果から、使用するブロック(0, 1)が選択されたあと、破棄するブロック(2)が出力されず、そのあと使用するブロック、破棄するブロック・・・のようにサイクルしていることがわかる。


## バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 

