# get_parallel_scheduler
* execution[meta header]
* function[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  parallel_scheduler get_parallel_scheduler();
}
```
* parallel_scheduler[link parallel_scheduler.md]

## 概要
システムの[並列Scheduler](parallel_scheduler.md)を取得する。


## 効果
説明用の`eb`を[`system_context_replaceability::query_parallel_scheduler_backend()`](system_context_replaceability/query_parallel_scheduler_backend.md.nolink)の結果とする。

もし`eb == nullptr`ならば、[`terminate`](/reference/exception/terminate.md)を呼び出す。そうでなければ、`eb`に関連付けられた[`parallel_scheduler`](parallel_scheduler.md)オブジェクトを返す。


## 例
```cpp example
#include <execution>
namespace ex = std::execution;

int main()
{
  ex::scheduler auto sch = ex::get_parallel_scheduler();
}
```
* ex::get_parallel_scheduler[color ff0000]
* ex::scheduler[link scheduler.md]

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
- [`execution::parallel_scheduler`](parallel_scheduler.md)
- [`execution::system_context_replaceability`](system_context_replaceability.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P2079R10 Parallel scheduler](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2079r10.html)
