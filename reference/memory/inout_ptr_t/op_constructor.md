# コンストラクタ
* memory[meta header]
* std[meta namespace]
* inout_ptr_t[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
explicit
inout_ptr_t(Smart& smart, Args... args);  // (1) C++23
constexpr explicit
inout_ptr_t(Smart& smart, Args... args);  // (1) C++26

inout_ptr_t(const inout_ptr_t&) = delete; // (2) C++23
```

## 概要
- (1) : `inout_ptr_t`オブジェクトの構築。
- (2) : コピーコンストラクタ。コピー不可。


## 効果
(1) : `inout_ptr_t`クラスの説明用メンバ変数`s`, `a`, `p`を下記の通り初期化する。

- `Smart&`型メンバ変数`s` : `smart`
- `tuple<Args...>`型メンバ変数`a` : [`std::forward`](/reference/utility/forward.md)`<Args>(args)...`
- `Pointer`型メンバ`p` :
    - [`is_pointer_v`](/reference/type_traits/is_pointer.md)`<Smart>`が`true`ならば、`smart`
    - そうでなければ、`smart.get()`


## 備考
実装によっては`s.release()`を呼び出すかもしれない。
コンストラクタで`release`メンバ関数を呼び出さない場合は、[デストラクタ](op_destructor.md)にて呼び出される。


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`inout_ptr()`](../inout_ptr.md)
- [`(destructor)`](op_destructor.md)
- [`operator Pointer*`](op_pointer.md)
- [`operator void**`](op_voidpp.md)


## 参照
- [P1132R8 out_ptr - a scalable output pointer abstraction](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1132r8.html)
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)