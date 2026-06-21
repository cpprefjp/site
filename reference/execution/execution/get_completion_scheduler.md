# get_completion_scheduler
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class CPO>
  struct get_completion_scheduler_t { unspecified };

  template<class CPO>
  constexpr get_completion_scheduler_t<CPO> get_completion_scheduler{};
}
```
* unspecified[italic]

## 概要
`get_completion_scheduler<completion-tag>`は、[Sender](sender.md)の[属性](get_env.md)から指定完了タグに関連付けられた完了Schedulerを取得する[クエリオブジェクト](../queryable.md)である。

コア定数式[`forwarding_query`](../forwarding_query.md)`(get_completion_scheduler<completion-tag>)`は`true`値を返す。


### 完了Scheduler
完了Scheduler(completion scheduler)は、非同期操作の完了操作を実行するための実行リソース（例：CPUスレッド）と関連付けられた[Scheduler](scheduler.md)である。

非同期操作の完了操作は、下記いずれかの完了関数呼び出しが該当する。

- 値完了関数 [`execution::set_value`](set_value.md)
- エラー完了関数 [`execution::set_error`](set_error.md) 
- 停止完了関数 [`execution::set_stopped`](set_stopped.md)


## 効果
`completion-fn`を完了関数、`completion-tag`を完了関数に関連付けられた完了タグ、`args`と`envs`を部分式のパック、式`sndr`を[`sender`](sender.md)`<decltype((sndr))>`が`true`かつ`get_completion_scheduler<completion-tag>(`[`get_env`](get_env.md)`(sndr), envs...)`となる式、`sch`を[Scheduler](scheduler.md)とする。

式`sch1`とパック`envs`に対して、式`sch2`を[`TRY-QUERY`](../queryable.md)`(sch, get_completion_scheduler<completion-tag>, envs...)`とする。`sch2`が不適格もしくは`sch1`と`sch2`が同一型かつ等しいとき、式`RECURSE-QUERY(sch1, envs...)`を`sch1`と等価な式とする。そうでなければ、式`RECURSE-QUERY(sch2, envs...)`と透過な式とする。

式`q`とパック`envs`に対して、完了タグ`completion-tag`が[`set_value_t`](set_value.md)／[`set_error_t`](set_error.md)／ [`set_stopped_t`](set_stopped.md)のいずれでもなければ、呼び出し式`get_completion_scheduler<completion-tag>(q, envs...)`は不適格となる。
そうでなければ、呼び出し式は下記と等価。

- `envs...`が1回だけ評価されることを除いて、適格ならば下記の式

    ```cpp
    MANDATE-NOTHROW(RECURSE-QUERY(
      TRY-QUERY(q, get_completion_scheduler<completion-tag>, envs...), envs...))
    ```
    * MANDATE-NOTHROW[link MANDATE-NOTHROW.md]
    * TRY-QUERY[link ../queryable.md]

- そうではなく、`envs...`が1回だけ評価されることを除いて、型`q`が[`scheduler`](scheduler.md)を満たしかつ`envs`が空のパックでないとき、`auto(q)`
- そうでなければ、呼び出し式`get_completion_scheduler<completion-tag>(q, envs...)`は不適格となる。

`get_completion_scheduler<completion-tag>(q, envs...)`が適格ならば、その型は[Scheduler](scheduler.md)を満たすべき。


## 例外
投げない


## カスタマイゼーションポイント
const修飾[クエリ可能オブジェクト](../queryable.md)`cq`に対して式`cq.query(get_completion_scheduler<completion-tag>)`が呼び出される。
このとき、`noexcept(cq.query(get_completion_scheduler<completion-tag>)) == true`であること。

型`Tag`、式`sndr`、パック`envs`に対して、`CS`を[`completion_signatures_of_t`](completion_signatures_of_t.md)`<`[`decay_t`](/reference/type_traits/decay.md)`<decltype((sndr))>, decltype((envs))...>`とする。`get_completion_scheduler<Tag>(`[`get_env`](get_env.md)`(sndr), envs...)`と`CS`が両者とも適格、かつ`CS().`[`count-of`](completion_signatures.md)`(Tag()) == 0`が`true`のとき、プログラムは不適格となる。

`sndr`と[Receiver](receiver.md)`rcvr`を接続して作成された非同期操作が完了関数`completion-fn(rcvr, args...)`を評価するとき、その評価が`sch`と関連付けられた実行リソースの実行エージェント上で行われない場合、動作は未定義となる。


## 例
```cpp
#include <execution>
namespace ex = std::execution;

int main()
{
  ex::run_loop loop;
  ex::scheduler auto loop_sch = loop.get_scheduler();

  // schedule(loop_sch)の完了Schedulerはloop_schに等しい
  ex::sender auto snd0 = ex::schedule(loop_sch);
  auto sch0 = ex::get_completion_scheduler<ex::set_value_t>(ex::get_env(snd0));
  assert(sch0 == loop_sch);

  // 完了Schedulerは接続されたSenderへと引き継がれる
  ex::sender auto snd1 = snd0 | ex::then([]{ return 42; });
  auto sch1 = ex::get_completion_scheduler<ex::set_value_t>(ex::get_env(snd1));
  assert(sch1 == loop_sch);

#if 0
  // just Senderは完了Schedulerを持たない
  ex::sender auto snd2 = ex::just(42);
  auto sch2 = ex::get_completion_scheduler<ex::set_value_t>(ex::get_env(snd2));
#endif
}
```
* ex::get_completion_scheduler[color ff0000]
* ex::run_loop[link run_loop.md]
* ex::scheduler[link scheduler.md]
* ex::sender[link sender.md]
* ex::schedule[link schedule.md]
* ex::set_value_t[link set_value.md]
* ex::get_env[link get_env.md]
* ex::then[link then.md]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::scheduler`](scheduler.md)
- [`execution::schedule`](schedule.md)
- [`execution::set_value`](set_value.md)
- [`execution::set_error`](set_error.md)
- [`execution::set_stopped`](set_stopped.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3826R5 Fix Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3826r5.html)
