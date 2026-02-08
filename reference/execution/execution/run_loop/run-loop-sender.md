# run-loop-sender
* [meta exposition-only]
* execution[meta header]
* std::execution[meta namespace]
* run_loop[meta class]
* class[meta id-type]
* cpp26[meta cpp]

```cpp
class run-loop-sender;  // exposition only
```

## 概要
`run-loop-sender`は、[`get_scheduler`メンバ関数](get_scheduler.md)が返す[`run-loop-scheduler`](run-loop-scheduler.md)動作仕様の説明で利用される説明専用のクラスである。

## クラス仕様
- `run-loop-sender`型は[`sender`](../sender.md)のモデルである。
- [`completion_signatures_of_t`](../completion_signatures_of_t.md)`<run-loop-sender>`は[`completion_signatures`](../completion_signatures.md)`<`[`set_value_t`](../set_value.md)`(),` [`set_error_t`](../set_error.md)`(`[`exception_ptr`](/reference/exception/exception_ptr.md)`),` [`set_stopped_t`](../set_stopped.md)`()>`
- `run-loop-sender`インスタンスは、関連付けられた[`run_loop`](../run_loop.md)インスタンスの生存期間(lifetime)終了まで有効。
- 説明用の式`sndr`の型を`run-loop-sender`、`CS`が上記[`completion_signatures`](../completion_signatures.md)の特殊化であるとき[`receiver_of`](../receiver_of.md)`<decltype((rcvr)), CS>`が`true`となる式`rcvr`としたとき、
    - 式[`connect`](../connect.md)`(sndr, rcvr)`の型は[`run-loop-opstate`](run-loop-opstate.md)`<`[`decay_t`](/reference/type_traits/decay.md)`<decltype((rcvr))>>`であり、潜在的な例外送出(potentially-throwing)は式`(void(sndr), auto(rcvr))`に従う。
    - 完了タグ`C`を[`set_value_t`](../set_value.md)または[`set_stopped_t`](../set_stopped.md)としたとき、式[`get_completion_scheduler`](../get_completion_scheduler.md)`<C>(`[`get_env`](../get_env.md)`(sndr))`の潜在的な例外送出は`sndr`に従う。式の型は[`run-loop-scheduler`](run-loop-scheduler.md)となり、そのインスタンスは同一`sndr`から取得された場合に等しくなる。


## バージョン
### 言語
- C++26


## 関連項目
- [`get_scheduler`](get_scheduler.md)
- [`run-loop-scheduler`](run-loop-scheduler.md)
- [`execution::sender`](../sender.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
