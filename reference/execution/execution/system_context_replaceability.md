# system_context_replaceability
* execution[meta header]
* std::execution[meta namespace]
* namespace[meta id-type]
* cpp26[meta cpp]

名前空間 `std::execution::system_context_replaceability` では、[並列Scheduler](parallel_scheduler.md)動作をユーザが差し替えるためのインタフェースを定義する。

```cpp
namespace std::execution::system_context_replaceability {
  …
}
```

[並列Scheduler](parallel_scheduler.md)をユーザ実装で置き換える場合、下記が必要となる。

- [`system_context_replaceability::parallel_scheduler_backend`](system_context_replaceability/parallel_scheduler_backend.md)インターフェースをバックエンドにもつ並列Schedulerを実装する。
- 処理系の手順に従って、[`system_context_replaceability::query_parallel_scheduler_backend`](system_context_replaceability/query_parallel_scheduler_backend.md)シンボルを自前バックエンド実装を返す関数で置き換える。


| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`receiver_proxy`](system_context_replaceability/receiver_proxy.md) | バックエンド実装用のReceiverプロキシ (class) | C++26 |
| [`bulk_item_receiver_proxy`](system_context_replaceability/bulk_item_receiver_proxy.md) | バックエンド実装用のバルク処理Receiverプロキシ (class) | C++26 |
| [`parallel_scheduler_backend`](system_context_replaceability/parallel_scheduler_backend.md) | 並列Schedulerバックエンド (class) | C++26 |
| [`query_parallel_scheduler_backend`](system_context_replaceability/query_parallel_scheduler_backend.md) | 並列Schedulerバックエンドを問い合わせ (function) | C++26 |


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::parallel_scheduler`](parallel_scheduler.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P2079R10 Parallel scheduler](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2079r10.html)
