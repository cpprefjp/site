# unhandled_exception
* execution[meta header]
* std::execution[meta namespace]
* task::promise_type[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
void unhandled_exception();
```

## 概要
タスクコルーチンから送出された例外を処理する。
プログラマが本関数を直接利用することは想定されていない。


## 効果
完了シグネチャ[`set_error_t`](../../set_error.md)`(`[`exception_ptr`](/reference/exception/exception_ptr.md)`)`が[`error_types`](../../task.md)の要素でないとき、[`terminate()`](/reference/exception/terminate.md)を呼び出す。そうでなければ、`errors`に[`current_exception()`](/reference/exception/current_exception.md)を格納する。


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
- [LWG4415. `task::promise_type::uncaught_exception` seems to be misnamed](https://cplusplus.github.io/LWG/issue4415)
