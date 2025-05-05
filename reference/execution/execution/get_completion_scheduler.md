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
完了タグ`completion-tag`には、[`set_value_t`](set_value.md), [`set_error_t`](set_error.md), [`set_stopped_t`](set_stopped.md)のいずれかを指定する。

コア定数式[`forwarding_query`](../forwarding_query.md)`(get_completion_scheduler<completion-tag>)`は`true`値を返す。


### 完了Scheduler
完了Scheduler(completion scheduler)は、非同期操作の完了操作を実行するための実行リソース（例：CPUスレッド）と関連付けられた[Scheduler](scheduler.md)である。

非同期操作の完了操作は、下記いずれかの完了関数呼び出しが該当する。

- 値完了関数 [`execution::set_value`](set_value.md)
- エラー完了関数 [`execution::set_error`](set_error.md) 
- 停止完了関数 [`execution::set_stopped`](set_stopped.md)


## 効果
呼び出し式`get_completion_scheduler<completion-tag>(q)`は下記と等価であり、式が適格ならば[`scheduler`](scheduler.md)を満たす型の値となる。

- 引数`q`がconst修飾された`cq`を用いて、式`cq.query(get_completion_scheduler<completion-tag>)`が適格であればその値。
- そうでなければ、呼び出し式は不適格となる。


## 例外
投げない


## カスタマイゼーションポイント
const修飾[クエリ可能オブジェクト](../queryable.md)`cq`に対して式`cq.query(get_completion_scheduler<completion-tag>)`が呼び出される。
このとき、`noexcept(cq.query(get_completion_scheduler<completion-tag>)) == true`であること。


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
* ex::then[link then.md.nolink]

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
