# yield_value
* execution[meta header]
* std::execution[meta namespace]
* task::promise_type[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<class Err>
auto yield_value(with_error<Err> err);
```
* with_error[link ../../with_error.md]

## 概要
タスクコルーチンにおける[co_yield式](/lang/cpp20/coroutines.md)の動作を制御する。
プログラマが本関数を直接利用することは想定されていない。


## 適格要件
[`std::move`](/reference/utility/move.md)`(err.error)`が、[`error_types`](../../task.md)の[`set_error_t`](../../set_error.md)引数型のうち正確に1つに変換可能であること。そのような型を`Cerr`とする。


## 戻り値
呼び出し元コルーチンをサスペンドし、[`STATE(*this)`](../state.md)に関連付けられた非同期操作を完了させるメンバ関数をもつ、未規定な型のAwaitableオブジェクトを返す。`st`を`STATE(*this)`への参照とする。非同期完了は最初に`st.handle.`[`destroy()`](/reference/coroutine/coroutine_handle/destroy.md)によってコルーチンフレームを破棄し、続いて[`set_error`](../../set_error.md)`(`[`std::move`](/reference/utility/move.md)`(st.rcvr), Cerr(`[`std::move`](/reference/utility/move.md)`(err.error)))`を呼び出す。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::with_error`](../../with_error.md)


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
- [LWG4339. `task`'s coroutine frame may be released late](https://cplusplus.github.io/LWG/issue4339)
