# change_coroutine_scheduler
* execution[meta header]
* class template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<scheduler Sch>
  struct change_coroutine_scheduler {
    using type = remove_cvref_t<Sch>;
    type scheduler;
  };

  template<scheduler Sch>
  change_coroutine_scheduler(Sch) -> change_coroutine_scheduler<Sch>;
}
```
* scheduler[link scheduler.md]

## 概要
タスク[`execution::task`](task.md)を戻り値型とする[コルーチン](/lang/cpp20/coroutines.md)において、`co_await`式でタスク[Scheduler](scheduler.md)変更を表現するタグ型。

```cpp
co_await change_coroutine_scheduler{sch}
```

タスクコルーチンにおいて後続の非同期処理を実行するタスク[Scheduler](scheduler.md)を`sch`に変更する。同`co_await`式は変更前のタスクSchedulerを返す。

詳細仕様は[`task::promise_type::await_transform`](./task/promise_type/await_transform.md)を参照のこと。


## 例
```cpp example
#include <execution>
#include <print>
namespace ex = std::execution;

ex::task<> work()
{
  // sch0 := 本コルーチン(Sender)を開始したScheduler
  // shc1 := co_await式で利用する別Scheduler（並列Schedulerを利用）
  std::println("run on Scheduler#0");
  ex::scheduler auto sch1 = ex::get_parallel_scheduler();

  co_await (ex::schedule(sch1) | ex::then([]{
    // Scheduler sch1上で非同期処理を実行
    std::println("run on Scheduler#1");
  }));
  // コルーチンタスクのデフォルト動作:
  //   co_await式はScheduler Affinityを維持するため
  //   コルーチン後続処理は元Scheduler上で実行される
  std::println("run on Scheduler#0");
 
  // 本コルーチンのタスクSchedulerをinline_schedulerへ変更
  co_await ex::change_coroutine_scheduler{ex::inline_scheduler{}};

  co_await (ex::schedule(sch) | ex::then([]{
    // Scheduler sch1上で非同期処理を実行
    std::println("run on Scheduler#1");
  }));
  // inline_scheduler動作:
  //   co_await式のScheduler Affinity維持を抑止するため
  //   同式中で変更したScheduler上でコルーチン後続処理が実行される
  std::println("run on Scheduler#1");
}

int main()
{
  std::this_thread::sync_wait(work());
}
```
* ex::change_coroutine_scheduler[color ff0000]
* ex::task[link task.md]
* ex::scheduler[link scheduler.md]
* ex::then[link then.md]
* ex::get_parallel_scheduler[link get_parallel_scheduler.md]
* ex::inline_scheduler[link inline_scheduler.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]

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
- [`execution::task`](task.md)
- [`execution::inline_scheduler`](inline_scheduler.md)


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
- C++now 2025, [Getting The Lazy Task Done](https://schedule.cppnow.org/wp-content/uploads/2025/03/Getting_The_Lazy_Task_Done.pdf)
