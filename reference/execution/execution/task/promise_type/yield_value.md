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
* with_error[link ../../with_error.md.nolink]

# 概要
タスクコルーチンにおける[co_yield式](/lang/cpp20/coroutines.md)の動作を制御する。
プログラマが本関数を直接利用することは想定されていない。


## 適格要件
[`std::move`](/reference/utility/move.md)`(err.error)`が、[`error_types`](../../task.md)の[`set_error_t`](../../set_error.md)引数型のうち正確に1つに変換可能であること。そのような型を`Cerr`とする。


## 戻り値
呼び出し元コルーチンをサスペンドし、[`set_error`](../../set_error.md)`(`[`std::move`](/reference/utility/move.md)`(RCVR(*this)), Cerr(`[`std::move`](/reference/utility/move.md)`(err.error)))`を呼び出すことで`STATE(*this)`に関連付けられた非同期操作を完了させるメンバ関数をもつ、未規定な型のAwaitableオブジェクトを返す。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::with_error`](../../with_error.md.nolink)


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
