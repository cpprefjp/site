# uintptr_t
* cstdint[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  using uintptr_t = unsigned-integer-type;
}
```
* unsigned-integer-type[italic]

## 概要
ポインタサイズの符号なし整数型。


## 備考
- この型の定義有無
    - C++11 : この型を実装するかどうかは処理系定義である
    - C++29 : この型は必ず定義される


この型は、以下の動作が保証される：

1. 有効な`void`へのポインタから`uintptr_t`型への変換
2. `uintptr_t`型のポインタ値から`void`へのポインタへの逆変換
3. 変換前と逆変換のポインタ値が等値となる


コード例は、[`intptr_t`](intptr_t.md)を参照。


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]
	- 2005, 2008では、`<stdlib.h>`にグローバル名前空間で定義されている。


## 参照
- [P3248R5 Require `[u]intptr_t`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3248r5.html)
    - C++29で、この型が必ず定義されるようになった。C++26までは、実装するかどうかは処理系定義だった
