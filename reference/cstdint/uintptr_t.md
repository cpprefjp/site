#uintptr_t
* cstdint[meta header]
* std[meta namespace]
* typedef[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  typedef unsigned-integer-type uintptr_t;
}
```
* unsigned-integer-type[italic]

##概要
ポインタサイズの符号なし整数型。

この型を実装するかどうかは処理系定義。


この型は、以下の動作が保証される：

1. 有効な`void`へのポインタから`uintptr_t`型への変換
2. `uintptr_t`型のポインタ値から`void`へのポインタへの逆変換
3. 変換前と逆変換のポインタ値が等値となる


コード例は、[`intptr_t`](./intptr_t.md)を参照。


##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0
	- 8.0, 9.0では、`<stdlib.h>`にグローバル名前空間で定義されている。
