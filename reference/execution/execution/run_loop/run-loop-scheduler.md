# run-loop-scheduler
* [meta exposition-only]
* execution[meta header]
* std::execution[meta namespace]
* run_loop[meta class]
* class[meta id-type]
* cpp26[meta cpp]

```cpp
class run-loop-scheduler;  // exposition only
```

## 概要
`run-loop-scheduler`は、[`get_scheduler`メンバ関数](get_scheduler.md)の戻り値型として利用される説明専用のクラスである。


## クラス仕様
- `run-loop-scheduler`型は[`scheduler`](../scheduler.md)のモデルとなる未規定の型。
- `run-loop-scheduler`インスタンスは、同インスタンスを取得した[`run_loop`](../run_loop.md)インスタンスの生存期間(lifetime)終了まで有効。
- 2個の`run-loop-scheduler`インスタンスは、同一[`run_loop`](../run_loop.md)インスタンスから取得された場合に限って等しい。
- 説明用の式`sch`の型が`run-loop-scheduler`であるとき、式[`schedule`](../schedule.md)`(sch)`は型[`run-loop-sender`](run-loop-sender.md)となり、式`sch`が潜在的に例外送出しない(not potentially-throwing)ならばそれに従う。


## バージョン
### 言語
- C++26


## 関連項目
- [`get_scheduler`](get_scheduler.md)
- [`execution::scheduler`](../scheduler.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
