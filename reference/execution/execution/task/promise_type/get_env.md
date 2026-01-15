# get_env
* execution[meta header]
* std::execution[meta namespace]
* task::promise_type[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
unspecified get_env() const noexcept;
```

## 概要
タスクコルーチンの[環境](../../../queryable.md)を取得する。


## 戻り値
問い合わせが以下のように転送されるオブジェクト`env`を返す。

- `env.query(`[`get_scheduler`](../../get_scheduler.md)`)`は[`scheduler_type`](../../task.md)`(SCHED(*this))`を返す。
- `env.query(`[`get_allocator`](../../../get_allocator.md)`)`は`alloc`を返す。
- `env.query(`[`get_stop_token`](../../../get_stop_token.md)`)`は`token`を返す。
- 上記以外の問い合わせ`q`と引数`a...`に対して、式が妥当かつ[`forwarding_query`](../../../forwarding_query.md)`(q)`が妥当で`true`となるとき、呼び出し`env.query(q, a...)`は`STATE(*this)`を返す。そうでなければ、`env.query(q, a...)`は不適格となる。


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


## 関連項目
- [`execution::get_env`](../../get_env.md)


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
