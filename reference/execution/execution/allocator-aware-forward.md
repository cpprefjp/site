# allocator-aware-forward
* [meta exposition-only]
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
template<class T, class Context>
decltype(auto) allocator-aware-forward(T&& obj, Context&& context);
```

## 概要
`allocator-aware-forward`は、Senderアルゴリズム動作仕様定義で用いられる説明専用の関数テンプレートである。

アロケータの利用可否に応じて、`obj`から`T`型の新規オブジェクトを作成するか、`obj`を転送する。
`context`に関連付けられた[環境](../queryable.md)がアロケータを提供する（つまり、式[`get_allocator`](../get_allocator.md)`(`[`get_env`](get_env.md)`(context))`が有効である）とき、同式の結果を`alloc`、型`P`を[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<T>`とする。


## 戻り値
- `alloc`が定義されなければ、[`std::forward`](/reference/utility/forward.md)`<T>(obj)`を返す。
- そうではなく、`P`が`product-type`の特殊化のときは、`obj`の要素を`e`としたとき各要素が次の通り初期化された`P`型のオブジェクトを返す。

    ```cpp
    make_obj_using_allocator<decltype(e)>(std::forward_like<T>(e), alloc)
    ```
    * make_obj_using_allocator[link /reference/memory/make_obj_using_allocator.md]

- そうでなければ、[`make_obj_using_allocator`](/reference/memory/make_obj_using_allocator.md)`<P>(`[`std::forward`](/reference/utility/forward.md)`<T>(e), alloc)`を返す。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::impls-for`](impls-for.md)
- [`execution::let_value`](let_value.md)


## 参照
- [P3433R1 Allocator Support for Operation States](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3433r1.pdf)
