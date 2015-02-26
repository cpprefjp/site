#uint64_t (C++11)
* cstdint[meta header]
* std[meta namespace]

```cpp
namespace std {
  typedef unsigned-integer-type uint64_t;
}
```
* unsigned-integer-type[italic]

##概要
64ビットの符号なし整数型。

この型を実装するかどうかは処理系定義。


##備考
CPUによっては1バイトが7ビットや16ビットになる場合があるため、そういった環境では8ビットの乗数幅を持つ整数型が定義できない可能性がある。


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??
