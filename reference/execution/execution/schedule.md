# schedule
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct schedule_t { unspecified };
  inline constexpr schedule_t schedule{};
}
```
* unspecified[italic]

## 概要
`schedule`は、[Scheduler](scheduler.md)からスケジュール[Sender](sender.md)を取得するSenderファクトリである。

### スケジュールSender
`schedule(sch)`式の結果はスケジュールSender(schedule sender)と呼ばれる。

スケジュールSenderより生成される[非同期操作](operation_state.md)を開始すると、Schedulerに関連付けられた実行リソース上で空の[値完了関数](set_value.md)を呼び出す。
スケジュールSenderの[値完了Scheduler](get_completion_scheduler.md)は、`schedule(sch)`式の引数に指定した[Scheduler](scheduler.md)`sch`に等しい。


## 効果
呼び出し式`schedule(sch)`は式`sch.schedule()`と等価であり、式の型は[`sender`](sender.md)を満たすこと。

式[`get_completion_scheduler`](get_completion_scheduler.md)`<`[`set_value_t`](set_value.md)`>(`[`get_env`](get_env.md)`(sch.schedule())) == sch`が不適格もしくは`false`となる場合、呼び出し式`schedule(sch)`の動作は未定義となる。


## カスタマイゼーションポイント
[Scheduler](scheduler.md)`sch`に対して、式`sch.schedule()`が呼び出される。


## 例
```cpp example
#include <print>
#include <thread>
#include <execution>
namespace ex = std::execution;

int main()
{
  ex::run_loop loop;
  std::jthread worker{[&]{
    std::println("start worker#{}", std::this_thread::get_id());
    loop.run();
  }};

  ex::scheduler auto sch = loop.get_scheduler();
  ex::sender auto sndr =
    ex::schedule(sch)
    | ex::then([]{
      std::println("on worker#{}", std::this_thread::get_id());
      return 42;
    });

  std::println("main#{}", std::this_thread::get_id());

  auto [val] = std::this_thread::sync_wait(std::move(sndr)).value();
  std::println("val={}", val);

  loop.finish();
}
```
* ex::schedule[color ff0000]
* ex::scheduler[link scheduler.md]
* ex::sender[link sender.md]
* ex::then[link then.md]
* ex::run_loop[link run_loop.md]
* get_scheduler()[link run_loop/get_scheduler.md]
* run()[link run_loop/run.md]
* finish()[link run_loop/finish.md]
* std::move[link /reference/utility/move.md]
* std::this_thread::get_id()[link /reference/thread/this_thread/get_id.md]

### 出力例
```
main#134276695947072
start worker#134276691527232
on worker#134276691527232
val=42
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
- [`execution::get_completion_scheduler`](get_completion_scheduler.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
