# initial_suspend
* execution[meta header]
* std::execution[meta namespace]
* task::promise_type[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
static constexpr suspend_always initial_suspend() noexcept;
```
* suspend_always[link /reference/coroutine/suspend_always.md]

## 概要
タスクコルーチンの[初期サスペンドポイント](/lang/cpp20/coroutines.md)を制御するAwaitableオブジェクトを返す。
プログラマが本関数を直接利用することは想定されていない。


## 戻り値
[`suspend_always{}`](/reference/coroutine/suspend_always.md)


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
- [LWG4349. `task` is not actually started lazily](https://cplusplus.github.io/LWG/issue4349)
