#independent_bits_engine (C++11)
* random[meta header]

```cpp
namespace std {
  template <class Engine, size_t W, class UIntType>
  class independent_bits_engine;
}
```

##概要
`independent_bits_engine`クラスは、乱数生成エンジンが生成する乱数をラップし、生成結果のビット数を変更する生成器アダプタである。  
32ビット整数を生成する[`mt19937`](./mt19937.md)をラップして、64ビット整数を生成させる、といったことができる。  


テンプレートパラメータは、以下を意味する：

- `W` : 生成させる整数のビット数
- `UIntType` : 生成させる符号なし整数型


##要件
`W > 0`かつ`W <=` [`numeric_limits`](/reference/limits/numeric_limits.md)`<UIntType>::`[`digits`](/reference/limits/numeric_limits/digits.md)であること。


##メンバ関数
###構築・シード

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------------------------|------------------|-------|
| [`(constructor)`](./independent_bits_engine/op_constructor.md)          | コンストラクタ   | C++11 |
| `~independent_bits_engine() = default;`                                 | デストラクタ     | C++11 |
| [`seed`](./independent_bits_engine/seed.md)                             | シードを設定する | C++11 |


###生成

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|--------------------|-------|
| [`operator()`](./independent_bits_engine/op_call.md) | 乱数を生成する | C++11 |
| [`discard`](./independent_bits_engine/discard.md)    | 指定した回数だけ乱数を生成し、内部状態を進める | C++11 |


###エンジンの特性

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------|-------|
| [`base`](./independent_bits_engine/base.md) | 元となる乱数生成器を取得する | C++11 |


##静的メンバ関数
###エンジンの特性

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------|--------------------------------|-------|
| [`min`](./independent_bits_engine/min.md) | 生成する範囲の最小値を取得する | C++11 |
| [`max`](./independent_bits_engine/max.md) | 生成する範囲の最大値を取得する | C++11 |


##メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 乱数生成結果型 `UIntType`。 | C++11 |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------------------|----------------------|-------|
| [`operator==`](./independent_bits_engine/op_equal.md)     | 等値比較             | C++11 |
| [`operator!=`](./independent_bits_engine/op_not_equal.md) | 非等値比較           | C++11 |
| [`operator<<`](./independent_bits_engine/op_ostream.md)   | ストリームへの出力   | C++11 |
| [`operator>>`](./independent_bits_engine/op_istream.md)   | ストリームからの入力 | C++11 |


##例
```cpp
#include <iostream>
#include <random>
#include <cstdint>

int main()
{
  // 32ビット整数を生成するmt19937をラップし、
  // 64ビット整数を生成させる
  std::independent_bits_engine<std::mt19937, 64, std::uint64_t> engine;

  for (int i = 0; i < 10; ++i) {
    std::uint64_t result = engine();
    std::cout << result << std::endl;
  }
}
```
* mt19937[link /reference/random/mt19937.md]
* uint64_t[link /reference/cstdint/uint64_t.md]

###出力
```
15028999435905310454
16708911996216745849
2342493223442167775
16848810653347327969
11664969248402573611
1799302827895858725
5137385360522333466
10088183424363624464
17662883439475955428
17799051847008967418
```

## バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 

