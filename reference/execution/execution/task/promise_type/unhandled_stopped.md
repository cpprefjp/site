# unhandled_stopped
* execution[meta header]
* std::execution[meta namespace]
* task::promise_type[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
coroutine_handle<> unhandled_stopped() noexcept;
```
* coroutine_handle<>[link /reference/coroutine/coroutine_handle.md]

## 概要
タスクコルーチンの[停止完了](../../set_stopped.md)動作を制御する。


## 効果
[`set_stopped`](../../set_stopped.md)`(`[`std::move`](/reference/utility/move.md)`(RCVR(*this)))`を呼び出すことで、`STATE(*this)`に関連付けられた非同期操作を完了する。


## 戻り値
[`noop_coroutine()`](/reference/coroutine/noop_coroutine.md)


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
- [LWG4340. `task::promise_type::unhandled_stopped()` should be `noexcept`](https://cplusplus.github.io/LWG/issue4340)
