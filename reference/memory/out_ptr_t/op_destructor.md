# デストラクタ
* memory[meta header]
* std[meta namespace]
* out_ptr_t[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
~out_ptr_t();
```

## 概要
指定した`Smart`型スマートポインタに、レガシーC関数呼び出しにより取得されたポインタ値を格納する。

スマートポインタへのポインタ値格納には、`Smart::reset()`メンバ関数、もしくは`Smart`オブジェクト構築＋ムーブ代入`operator=`が利用される。

- オブジェクト単位でカスタムデリータを管理する[`std::shared_ptr<T>`](../shared_ptr.md)の場合、[`out_ptr_t`コンストラクタ](op_constructor.md)にてデリータオブジェクトを渡しておくことで、[`reset()`](../shared_ptr/reset.md)呼び出しの取得ポインタ値に続く引数として渡される。
この動作は[`out_ptr_t`](../out_ptr_t.md)クラステンプレートの適格要件にて強制される。
- 型レベルでカスタムデリータを管理する[`std::unique_ptr<T,D>`](../unique_ptr.md)の場合、[`reset()`](../unique_ptr/reset.md)呼び出しには取得ポインタ値のみが渡される。
- これ以外のスマートポインタ型では、同スマートポインタの動作セマンティクスに従う。


## 効果
説明用の`SP`型を下記の通り定義する :

- `Smart::pointer`が有効な型名であれば`Smart::pointer`
- そうでなければ、`Smart::element_type*`が有効な型名であれば`Smart::element_type*`
- そうでなければ、[`pointer_traits`](../pointer_traits.md)`<Smart>::element_type*`
- そうでなければ、`Pointer`

[説明用メンバ変数](op_constructor.md)`s`, `a`, `p`を用いて、以下と同じ効果を持つ :

- 式 `s.reset(static_cast<SP>(p),` [`std::forward`](/reference/utility/forward.md)`<Args>(args)...)` が適格ならば、

    ```cpp
    if (p) {
      apply([&](auto&&... args) {
        s.reset(static_cast<SP>(p), std::forward<Args>(args)...); }, std::move(a));
    }
    ```
    * apply[link /reference/tuple/apply.md]

- [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<Smart, SP, Args...>`が`true`ならば、

    ```cpp
    if (p) {
      apply([&](auto&&... args) {
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
- [`out_ptr()`](../out_ptr.md)
- [`(constructor)`](op_constructor.md)
- [`operator Pointer*`](op_pointer.md)
- [`operator void**`](op_voidpp.md)


## 参照
- [P1132R8 out_ptr - a scalable output pointer abstraction](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1132r8.html)
