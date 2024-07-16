# デストラクタ
* memory[meta header]
* std[meta namespace]
* inout_ptr_t[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
~inout_ptr_t();
```

## 概要
指定した`Smart`型スマートポインタが管理するリソースを解放し、レガシーC関数呼び出しにより取得されたポインタ値を格納する。

スマートポインタのリソース解放には、`Smart::release()`メンバ関数が利用される。
スマートポインタへのポインタ値格納には、`Smart::reset()`メンバ関数、もしくは`Smart`オブジェクト構築＋ムーブ代入`operator=`が利用される。


## 効果
説明用の`SP`型を下記の通り定義する :

- `Smart::pointer`が有効な型名であれば`Smart::pointer`
- そうでなければ、`Smart::element_type*`が有効な型名であれば`Smart::element_type*`
- そうでなければ、[`pointer_traits`](../pointer_traits.md)`<Smart>::element_type*`
- そうでなければ、`Pointer`

説明用の文`release-statement`を下記の通り定義する :

- [コンストラクタ](op_constructor.md)で`s.release()`を呼び出さない実装であれば、`s.release()`
- そうでなければ、空文

[説明用メンバ変数](op_constructor.md)`s`, `a`, `p`を用いて、以下と同じ効果を持つ :

- [`is_pointer_v`](/reference/type_traits/is_pointer.md)`<Smart>`が`true`ならば、

    ```cpp
    apply([&](auto&&... args) {
      s = Smart(static_cast<SP>(p), std::forward<Args>(args)...); }, std::move(a));
    ```

- 式 `s.reset(static_cast<SP>(p),` [`std::forward`](/reference/utility/forward.md)`<Args>(args)...)` が適格ならば、

    ```cpp
    if (p) {
      apply([&](auto&&... args) {
        release-statement;
        s.reset(static_cast<SP>(p), std::forward<Args>(args)...); }, std::move(a));
    }
    ```
    * apply[link /reference/tuple/apply.md]

- [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<Smart, SP, Args...>`が`true`ならば、

    ```cpp
    if (p) {
      apply([&](auto&&... args) {
        release-statement;
        s = Smart(static_cast<SP>(p), std::forward<Args>(args)...); }, std::move(a));
    }
    ```
    * apply[link /reference/tuple/apply.md]

- そうでなければ、プログラムは不適格となる。


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`inout_ptr_t()`](../inout_ptr_t.md)
- [`(constructor)`](op_constructor.md)
- [`operator Pointer*`](op_pointer.md)
- [`operator void**`](op_voidpp.md)


## 参照
- [P1132R8 out_ptr - a scalable output pointer abstraction](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1132r8.html)
- [LWG Issue 3897. `inout_ptr` will not update raw pointer to 0](https://cplusplus.github.io/LWG/issue3897)
