# final_suspend
* execution[meta header]
* std::execution[meta namespace]
* task::promise_type[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
auto final_suspend() noexcept;
```

## 概要
タスクコルーチンの[最終サスペンドポイント](/lang/cpp20/coroutines.md)を制御するAwaitableオブジェクトを返す。
プログラマが本関数を直接利用することは想定されていない。


## 戻り値
`STATE(*this)`に関連付けられた非同期操作を下記呼び出しによって完了するメンバ関数を持つ、未規定のAwaitableオブジェクトを返す。

- `errors.`[`index()`](/reference/variant/variant/index.md)が`0`より大きいとき、`e`を`errors`が保持する値として[`set_error`](../../set_error.md)`(std::move(RCVR(*this)), std::move(e))`。そうでなければ、
- [`is_void`](/reference/type_traits/is_void.md)`<T>`が`true`のとき、[`set_value`](../../set_value.md)`(std::move(RCVR(*this)))`。そうでなければ、
- [`set_value`](../../set_value.md)`(std::move(RCVR(*this)), *result)`


## 例外
投げない


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
