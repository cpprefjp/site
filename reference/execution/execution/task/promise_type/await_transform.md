# await_transform
* execution[meta header]
* std::execution[meta namespace]
* task::promise_type[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<sender Sender>
auto await_transform(Sender&& sndr); // (1)

template<class Sch>
auto await_transform(change_coroutine_scheduler<Sch> sch); // (2)
```
* sender[link ../../sender.md]
* change_coroutine_scheduler[link ../../change_coroutine_scheduler.md.nolink]

## 概要
タスクコルーチンにおける[co_await式](/lang/cpp20/coroutines.md)の動作を制御する。
プログラマが本関数を直接利用することは想定されていない。


## 効果
- (1) :
    - [`same_as`](/reference/concepts/same_as.md)`<`[`inline_scheduler`](../../inline_scheduler.md)`, `[`scheduler_type`](../../task.md)`> == true`ならば、[`as_awaitable`](../../as_awaitable.md)`(std::forward<Sender>(sndr), *this)`を返す。
    - そうでなければ、[`as_awaitable`](../../as_awaitable.md)`(`[`affine_on`](../../affine_on.md.nolink)`(std::forward<Sender>(sndr), SCHED(*this)), *this)`を返す。
- (2) : 以下と等価

    ```cpp
    return await_transform(just(exchange(SCHED(*this), scheduler_type(sch.scheduler))), *this);
    ```
    * just[link ../../just.md]
    * scheduler_type[link ../../task.md]
    * scheduler[link ../../change_coroutine_scheduler.md.nolink]
    * exchange[link /reference/utility/exchange.md]


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
- [`execution::affine_on`](../../affine_on.md.nolink)
- [`execution::inline_scheduler`](../../inline_scheduler.md)
- [`execution::change_coroutine_scheduler`](../../change_coroutine_scheduler.md.nolink)


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
