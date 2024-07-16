# コンストラクタ
* memory[meta header]
* std[meta namespace]
* out_ptr_t[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
explicit out_ptr_t(Smart& smart, Args... args);  // (1)
out_ptr_t(const out_ptr_t&) = delete;  // (2)
```

## 概要
- (1) : `out_ptr_t`オブジェクトの構築。
- (2) : コピーコンストラクタ。コピー不可。


## 効果
(1) : `out_ptr_t`クラスの説明用メンバ変数`s`, `a`, `p`を下記の通り初期化する。

- `Smart&`型メンバ変数`s` : `smart`
- `tuple<Args...>`型メンバ変数`a` : [`std::forward`](/reference/utility/forward.md)`<Args>(args)...`
- `Pointer`型メンバ`p` : `{}`(値初期化)


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
- [`(destructor)`](op_destructor.md)
- [`operator Pointer*`](op_pointer.md)
- [`operator void**`](op_voidpp.md)


## 参照
- [P1132R8 out_ptr - a scalable output pointer abstraction](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1132r8.html)
