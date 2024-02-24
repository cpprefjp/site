# initial_suspend
* generator[meta header]
* function[meta id-type]
* std[meta namespace]
* generator::promise_type[meta class]
* cpp23[meta cpp]

```cpp
suspend_always initial_suspend() const noexcept;
```
* suspend_always[link /reference/coroutine/suspend_always.md]

## 概要
ジェネレータコルーチンの[初期サスペンドポイント](/lang/cpp20/coroutines.md)を制御するAwaitableオブジェクトを返す。
プログラマが本関数を直接利用することは想定されていない。


## 戻り値
[`suspend_always{}`](/reference/coroutine/suspend_always.md)


## 例外
投げない


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
