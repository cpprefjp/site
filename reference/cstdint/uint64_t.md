# uint64_t
* cstdint[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  using uint64_t = unsigned-integer-type;
}
```
* unsigned-integer-type[italic]

## 概要
64ビットの符号なし整数型。この型はパディングビットは�在しない。

この型を実装するかどうかは処理系定義であるが、上記の条件に合致する整数型が処理系に�在する場合には必ず定義されている。


## 備考
処理系によっては1バイトが8ビットでないことがあり、そういった環境では8ビットの乗数幅を持つ整数型が定義されていない可能性がある。


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015


## 参照
- [`CHAR_BIT`](/reference/climits/char_bit.md)
