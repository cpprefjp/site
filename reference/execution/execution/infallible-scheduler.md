# infallible-scheduler
* [meta exposition-only]
* execution[meta header]
* concept[meta id-type]
* cpp26[meta cpp]

```cpp
template <class Sch, class Env>
concept infallible-scheduler =
  scheduler<Sch> &&
  (same_as<completion_signatures<set_value_t()>,
           completion_signatures_of_t<decltype(schedule(declval<Sch>())), Env>> ||
   (!unstoppable_token<stop_token_of_t<Env>> &&
    (same_as<completion_signatures<set_value_t(), set_stopped_t()>,
             completion_signatures_of_t<decltype(schedule(declval<Sch>())), Env>> ||
     same_as<completion_signatures<set_stopped_t(), set_value_t()>,
             completion_signatures_of_t<decltype(schedule(declval<Sch>())), Env>>)));
```
* scheduler[link scheduler.md]
* schedule[link schedule.md]
* completion_signatures[link completion_signatures.md]
* completion_signatures_of_t[link completion_signatures_of_t.md]
* set_value_t[link set_value.md]
* set_stopped_t[link set_stopped.md]
* stop_token_of_t[link ../stop_token_of_t.md]
* unstoppable_token[link /reference/stop_token/unstoppable_token.md]

## 概要
`infallible-scheduler`は、[`schedule`](schedule.md)による非同期操作が停止要求されない限り[`set_value`](set_value.md)によってのみ完了する[`Scheduler`](scheduler.md)型の要件を定義する説明専用のコンセプトである。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::scheduler`](scheduler.md)
- [`execution::affine`](affine.md)


## 参照
- [P3941R4 Scheduler Affinity](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3941r4.html)
