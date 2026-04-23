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
[`STATE(*this)`](../state.md)に関連付けられた非同期操作を完了するメンバ関数を持つ、未規定のAwaitableオブジェクトを返す。`st`を`STATE(*this)`への参照とする。非同期完了は最初に`st.handle.`[`destroy()`](/reference/coroutine/coroutine_handle/destroy.md)によってコルーチンフレームを破棄し、続いて下記を呼び出す。

- `bool(st.error)`が`true`のとき、[`set_error`](../../set_error.md)`(std::move(st.rcvr), std::move(st.error))`。そうでなければ、
- [`is_void_v`](/reference/type_traits/is_void.md)`<T>`が`true`のとき、[`set_value`](../../set_value.md)`(std::move(st.rcvr))`。そうでなければ、
- [`set_value`](../../set_value.md)`(std::move(st.rcvr), *std::move(st.result))`


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
- [LWG4525. `task`'s `final_suspend` should `move` the result](https://cplusplus.github.io/LWG/issue4525)
- [LWG4339. `task`'s coroutine frame may be released late](https://cplusplus.github.io/LWG/issue4339)
