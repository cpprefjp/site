# INFINITY
* cmath[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define INFINITY constant-expression
```
* constant-expression[italic]

## 概要
`float` の無限大がサポートされる場合、`float` 型の正の無限大である。

無限大がサポートされない場合、オーバーフローする `float` 型の式である。


## 備考
- C++26では、C23を参照するようになったことで、このマクロは[`<cfloat>`](/reference/cfloat.md)でも定義されるようになった


## バージョン
### 言語
- C++11


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.html)
    - C++26がC23を参照するようになり、このマクロが[`<cfloat>`](/reference/cfloat.md)でも定義されるようになった
