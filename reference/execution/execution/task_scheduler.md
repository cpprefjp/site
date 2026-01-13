# task_scheduler
* execution[meta header]
* class[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  class task_scheduler;
}
```

## 概要
`task_scheduler`は、任意の[Scheduler](scheduler.md)型を型消去して保持するSchedulerである。

実行制御ライブラリのタスクコルーチン戻り値型[`task<T, E>`](task.md)において、環境`E`のデフォルトScheduler型として利用される。

`task_scheduler`は[`scheduler`](scheduler.md)のモデルである。


## クラス仕様
`task_scheduler`クラスは、下記の説明専用メンバ変数を持つ。

- `sch_` : [`shared_ptr`](/reference/memory/shared_ptr.md)`<void>`型

`task_scheduler`型のオブジェクト`s`に対して、`SCHED(s)`を`s.sch_`が所有するポインタが指すオブジェクトとする。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](task_scheduler/op_constructor.md) | コンストラクタ | C++26 |
| `(destructor)` | デストラクタ | C++26 |
| [`operator=`](task_scheduler/op_assign.md) | 代入演算子 | C++26 |
| [`schedule`](task_scheduler/schedule.md) | [スケジュールSender](schedule.md)を返す | C++26 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `scheduler_concept` | [`scheduler_t`](scheduler.md) | C++26 |

### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](task_scheduler/op_equal.md) | 等値比較 | C++26 |
| `operator!=` | 非等値比較 (`==`により使用可能) | C++26 |


## 例
```cpp example
#include <cassert>
#include <execution>
namespace ex = std::execution;

int main()
{
  ex::task_scheduler sch1{ ex::get_parallel_scheduler() };
  ex::task_scheduler sch2{ ex::inline_scheduler{} };
  assert(sch1 != sch2);
}
```
* ex::task_scheduler[color ff0000]
* ex::get_parallel_scheduler[link get_parallel_scheduler.md]
* ex::inline_scheduler[link inline_scheduler.md]

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
- [`execution::task`](task.md)


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
- [LWG4446. Bad phrasing for `SCHED(s)`](https://cplusplus.github.io/LWG/issue4446)
