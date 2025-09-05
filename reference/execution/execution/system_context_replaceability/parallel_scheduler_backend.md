# parallel_scheduler_backend
* execution[meta header]
* class[meta id-type]
* std::execution::system_context_replaceability[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution::system_context_replaceability {
  struct parallel_scheduler_backend;
}
```

## 概要
`parallel_scheduler_backend`は、[並列Scheduler](../parallel_scheduler.md)バックエンド実装者向けのインタフェースを定義する。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(destructor)`](parallel_scheduler_backend/op_destructor.md) | デストラクタ | C++26 |
| [`schedule`](parallel_scheduler_backend/schedule.md) | [`schedule`](../schedule.md)アルゴリズム動作カスタマイズ | C++26 |
| [`schedule_bulk_chunked`](parallel_scheduler_backend/schedule_bulk_chunked.md) | [`bulk_chunked`](../bulk_chunked.md)アルゴリズム動作カスタマイズ | C++26 |
| [`schedule_bulk_unchunked`](parallel_scheduler_backend/schedule_bulk_unchunked.md) | [`bulk_unchunked`](../bulk_unchunked.md)アルゴリズム動作カスタマイズ | C++26 |


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
- [`execution::system_context_replaceability::query_parallel_scheduler_backend`](query_parallel_scheduler_backend.md)


## 参照
- [P2079R10 Parallel scheduler](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2079r10.html)
