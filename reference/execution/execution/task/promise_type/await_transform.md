# await_transform
* execution[meta header]
* std::execution[meta namespace]
* task::promise_type[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<sender Sender>
auto await_transform(Sender&& sndr); // (1)
```
* sender[link ../../sender.md]

## 概要
タスクコルーチンにおける[co_await式](/lang/cpp20/coroutines.md)の動作を制御する。
プログラマが本関数を直接利用することは想定されていない。


## 効果
[`same_as`](/reference/concepts/same_as.md)`<`[`inline_scheduler`](../../inline_scheduler.md)`,` [`start_scheduler_type`](../../task.md)`> == true`ならば、[`as_awaitable`](../../as_awaitable.md)`(std::forward<Sender>(sndr), *this)`を返す。
そうでなければ、[`as_awaitable`](../../as_awaitable.md)`(`[`affine`](../../affine.md)`(std::forward<Sender>(sndr)), *this)`を返す。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::as_awaitable`](../../as_awaitable.md)
- [`execution::affine`](../../affine.md)
- [`execution::inline_scheduler`](../../inline_scheduler.md)


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
- [P3941R4 Scheduler Affinity](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3941r4.html)
- [P4151R1 Rename `affine_on`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p4151r1.pdf)
