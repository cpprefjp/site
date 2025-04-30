# get_scheduler
* execution[meta header]
* std::execution[meta namespace]
* run_loop[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
run-loop-scheduler get_scheduler();
```
* run-loop-scheduler[link run-loop-scheduler.md]

## 概要
`run_loop`上で実行する[Scheduler](../scheduler.md)を返す。


## 戻り値
`run_loop`インスタンス上で作業を[スケジュール](../schedule.md)する[`run-loop-scheduler`](run-loop-scheduler.md)インスタンスを返す。


## 例
```cpp example
#include <cassert>
#include <concepts>
#include <execution>
namespace ex = std::execution;

int main()
{
  ex::run_loop loop;
  ex::scheduler auto sch = loop.get_scheduler();

  // スケジュールSenderを作成
  ex::sender auto sndr = ex::schedule(sch);

  // スケジュールSenderの完了シグネチャ集合を確認
  auto sigs = ex::get_completion_signatures(sndr);
  static_assert(std::same_as<decltype(sigs),
    ex::completion_signatures<ex::set_value_t(),
                              ex::set_error_t(std::exception_ptr),
                              ex::set_stopped_t()>>);

  // スケジュールSender属性の値完了スケジューラを確認
  auto compl_sch = ex::get_completion_scheduler<ex::set_value_t>(ex::get_env(sndr));
  assert(compl_sch == sch);
}
```
* get_scheduler()[color ff0000]
* ex::run_loop[link ../run_loop.md]
* ex::scheduler[link ../scheduler.md]
* ex::sender[link ../sender.md]
* ex::schedule[link ../schedule.md]
* ex::get_completion_signatures[link ../get_completion_signatures.md]
* ex::completion_signatures[link ../completion_signatures.md]
* ex::set_value_t[link ../set_value.md]
* ex::set_error_t[link ../set_error.md]
* ex::set_stopped_t[link ../set_stopped.md]
* ex::get_completion_scheduler[link ../get_completion_scheduler.md]
* ex::get_env[link ../get_env.md]

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
- [`run-loop-scheduler`](run-loop-scheduler.md)
- [`run-loop-sender`](run-loop-sender.md)
- [`execution::schedule`](../schedule.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
