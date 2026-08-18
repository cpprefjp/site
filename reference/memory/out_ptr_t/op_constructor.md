# コンストラクタ
* memory[meta header]
* std[meta namespace]
* out_ptr_t[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
explicit
out_ptr_t(Smart& smart, Args... args);  // (1) C++23
constexpr explicit
out_ptr_t(Smart& smart, Args... args);  // (1) C++26

out_ptr_t(const out_ptr_t&) = delete;   // (2) C++23
```

## 概要
- (1) : `out_ptr_t`オブジェクトの構築。
- (2) : コピーコンストラクタ。コピー不可。


## 効果
(1) : `out_ptr_t`クラスの説明用メンバ変数`s`, `a`, `p`を下記の通り初期化する。

- `Smart&`型メンバ変数`s` : `smart`
- `tuple<Args...>`型メンバ変数`a` : [`std::forward`](/reference/utility/forward.md)`<Args>(args)...`
- `Pointer`型メンバ`p` : `{}`(値初期化)

その後、以下と等価の処理を行う。

- 式`s.reset()`が適格であれば、`s.reset()`
- そうでなく、[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<Smart> == true`であれば、`s = Smart()`
- いずれでもなければ、プログラムは不適格となる


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
- [LWG Issue 3734. Inconsistency in `inout_ptr` and `out_ptr` for empty case](https://cplusplus.github.io/LWG/issue3734)
    - C++23で、`out_ptr_t`のコンストラクタが、`s`が保持していた既存の値を`s.reset()`（不可能なら`s = Smart()`）で解放するよう変更された。これにより、ポインタスタイル関数が`nullptr`を返した場合でも`out`が空状態になる
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)