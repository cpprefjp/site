# query_parallel_scheduler_backend
* execution[meta header]
* function[meta id-type]
* std::execution::system_context_replaceability[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution::system_context_replaceability {
  shared_ptr<parallel_scheduler_backend> query_parallel_scheduler_backend();
}
```
* parallel_scheduler_backend[link parallel_scheduler_backend.md]

## 概要
[並列Scheduler](../parallel_scheduler.md)の実装オブジェクトを返す。


## 効果
[`parallel_scheduler_backend`](parallel_scheduler_backend.md)インタフェースを実装したオブジェクトを指す非ヌル[`shared_ptr`](/reference/memory/shared_ptr.md)を返す。


## 備考
この関数は置換可能(replaceable)である。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::parallel_scheduler`](../parallel_scheduler.md)
- [`execution::system_context_replaceability::parallel_scheduler_backend`](parallel_scheduler_backend.md)


## 参照
- [P2079R10 Parallel scheduler](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2079r10.html)
