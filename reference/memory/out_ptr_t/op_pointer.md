# operator Pointer*
* memory[meta header]
* std[meta namespace]
* out_ptr_t[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
operator Pointer*() const noexcept; // (1) C++23
constexpr
operator Pointer*() const noexcept; // (1) C++26
```

## 概要
`Pointer`型の[説明用メンバ変数](op_constructor.md)へのポインタを取得する。


## 事前条件
`*this`の[`operator void**()`](op_voidpp.md)が呼び出されていないこと


## 戻り値
[`addressof`](../addressof.md)`(const_cast<Pointer&>(p))`


## 例外
投げない


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`out_ptr()`](../out_ptr.md)


## 参照
- [P1132R8 out_ptr - a scalable output pointer abstraction](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1132r8.html)
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)