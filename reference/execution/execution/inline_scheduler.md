# inline_scheduler
* execution[meta header]
* class[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  class inline_scheduler {
    class inline-sender; // exposition only
    template <receiver R>
    class inline-state;  // exposition only

  public:
    using scheduler_concept = scheduler_tag;

    constexpr inline-sender schedule() noexcept { return {}; }
    constexpr bool operator==(const inline_scheduler&) const noexcept = default;
  };
}
```
* scheduler_tag[link scheduler.md]
* receiver[link receiver.md]
* inline-sender[italic]
* inline-state[italic]

## 概要
`inline_scheduler`は、インラインでタスクを実行する[Scheduler](scheduler.md)である。

[`schedule`](schedule.md)操作により得られる[Sender](sender.md)と[Receiver](receiver.md)を[接続(connect)](connect.md)した[OperationState](operation_state.md)は、[開始(start)](start.md)したスレッド上で即座に[値完了](set_value.md)する。

戻り値型[`task<T, E>`](task.md)を持つタスクコルーチンのScheduler型として利用すると、コルーチン内で[`co_await`式](/lang/cpp20/coroutines.md)から再開(resume)時のスケジューリング操作を回避できる（動作詳細は[`await_transform`](task/promise_type/await_transform.md)を参照）。


## クラス仕様
`inline_scheduler`型の全オブジェクトは等しい。`inline_scheduler`型の部分式`sch`、[クエリオブジェクト](../queryable.md)`q`、部分式のパック`args`としたとき、式`sch.query(q, args...)`は`inline-attrs<`[`set_value_t`](set_value.md)`>.query(q, args...)`と等価な式となる。

説明専用のクラス`inline-sender`を[`sender`](sender.md)を満たす型とする。[`completion_signatures_of_t`](completion_signatures_of_t.md)`<inline-sender>`は、[`completion_signatures`](completion_signatures.md)`<`[`set_value_t`](set_value.md)`()>`となる。

説明用の`sndr`を`inline-sender`型の式とする。`CS`を[`completion_signatures`](completion_signatures.md)`<`[`set_value_t`](set_value.md)`()>`としたとき、`rcvr`を[`receiver-of`](receiver-of.md)`<decltype((rcvr)), CS>`が`true`となる式とする。式[`connect`](connect.md)`(sndr, rcvr)`の型は`inline-state<`[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<decltype((rcvr))>>`であり、式`((void)sndr, auto(rcvr))`が潜在的に例外送出(potentially-throwing)するときに限って潜在的に例外送出する。

説明用の`o`を`inline-state<Rcvr>`型の非const左辺値とし、`REC(o)`を`o`を返す[接続(connect)](connect.md)呼び出しへ渡した式`rcvr`で初期化された`Rcvr`型の非const左辺値参照とする。

- `REC(o)`が参照するオブジェクトは、`o`が参照するオブジェクトの生存期間(lifetime)で有効である。
- 式[`start`](start.md)`(o)`は、[`set_value`](set_value.md)`(`[`std::move`](/reference/utility/move.md)`(REC(o)))`と等価。

### 説明専用クラステンプレート`inline-attrs`
```cpp
template<class Tag>
struct inline-attrs {
  see below
};
```
部分式`env`としたとき、`inline-attrs<Tag>{}.query(`[`get_completion_scheduler`](get_completion_scheduler.md)`<Tag>, env)`は[`get_scheduler`](get_scheduler.md)`(env)`と等価な式となる。

部分式`env`としたとき、`inline-attrs<Tag>{}.query(`[`get_completion_domain`](get_completion_domain.md)`<Tag>, env)`は[`get_domain`](get_domain.md)`(env)`と等価な式となる。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `(constructor)` | コンストラクタ | C++26 |
| `(destructor)` | デストラクタ | C++26 |
| `schedule` | [スケジュールSender](schedule.md)を返す | C++26 |

## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `scheduler_concept` | [`scheduler_tag`](scheduler.md) | C++26 |


## 例
```cpp example
#include <execution>
#include <thread>
#include <print>
namespace ex = std::execution;

// ex::task用のカスタム環境
struct TaskEnv {
  using start_scheduler_type = ex::inline_scheduler;
};

ex::task<void> f(ex::scheduler auto sch)
{
  std::println("step1 main#{}", std::this_thread::get_id());

  // スケジューラを変更してサブタスクを実行
  co_await (ex::schedule(sch) | ex::then([]{
    std::println("step2 worker#{}", std::this_thread::get_id());
  }));

  // デフォルト(task_scheduler)タスクコルーチンのco_await式では、
  // Scheduler Affinity動作により元のスケジューラ上で処理が継続する。
  std::println("step3 main#{}", std::this_thread::get_id());
}

ex::task<void, TaskEnv> g(ex::scheduler auto sch)
{
  std::println("step1 main#{}", std::this_thread::get_id());

  // スケジューラを変更してサブタスクを実行
  co_await (ex::schedule(sch) | ex::then([]{
    std::println("step2 worker#{}", std::this_thread::get_id());
  }));

  // inline_schedulerを持つタスクコルーチンのco_await式では、
  // コルーチンの再開(resume)時に再スケジューリングが行われない。
  // このためco_await式内で変更したスケジューラが引き継がれる。
  std::println("step3 worker#{}", std::this_thread::get_id());
}

int main()
{
  // ワーカースレッドを開始
  ex::run_loop loop;
  std::jthread worker{[&]{
    loop.run();
  }};
  auto sch = loop.get_scheduler();

  std::println("task_scheduler(default)");
  std::this_thread::sync_wait( f(sch) );

  std::println("inline_scheduler");
  std::this_thread::sync_wait( g(sch) );

  loop.finish();
}
```
* ex::inline_scheduler[color ff0000]
* ex::task[link task.md]
* ex::scheduler[link scheduler.md]
* ex::schedule[link schedule.md]
* ex::then[link then.md]
* ex::run_loop[link run_loop.md]
* run()[link run_loop/run.md]
* get_scheduler()[link run_loop/get_scheduler.md]
* finish()[link run_loop/finish.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]

### 出力例
```
task_scheduler(default)
step1 main#124468393588544
step2 worker#124468391311040
step3 main#124468393588544
inline_scheduler
step1 main#124468393588544
step2 worker#124468391311040
step3 worker#124468391311040
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
- [`execution::task`](task.md)


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
- [P3826R5 Fix Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3826r5.html)
- [P4159R0 Make `sender_in` and `receiver_of` exposition-only](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p4159r0.html)
- C++now 2025, [Getting The Lazy Task Done](https://schedule.cppnow.org/wp-content/uploads/2025/03/Getting_The_Lazy_Task_Done.pdf)
