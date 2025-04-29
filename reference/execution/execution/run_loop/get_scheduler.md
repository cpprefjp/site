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
#include <execution>
namespace ex = std::execution;

int main()
{
  ex::run_loop loop;
  ex::scheduler auto sch = loop.get_scheduler();
}
```
* get_scheduler()[color ff0000]
* ex::run_loop[link ../run_loop.md]
* ex::scheduler[link ../scheduler.md]

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
- [`execution::schedule`](../schedule.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
