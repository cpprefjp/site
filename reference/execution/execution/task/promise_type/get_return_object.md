# get_return_object
* execution[meta header]
* std::execution[meta namespace]
* task::promise_type[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
task get_return_object() noexcept;
```
* task[link ../../task.md]

## 概要
タスク[コルーチン](/lang/cpp20/coroutines.md)の戻り値[`task`](../../task.md)オブジェクトを生成する。
プログラマが本関数を直接利用することは想定されていない。


## 戻り値
説明専用の`handle`メンバ変数が[`coroutine_handle`](/reference/coroutine/coroutine_handle.md)`<`[`promise_type`](../promise_type.md)`>::`[`from_promise`](/reference/coroutine/coroutine_handle/from_promise.md)`(*this)`である[`task`](../../task.md)オブジェクト。


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
