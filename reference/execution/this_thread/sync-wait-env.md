# sync-wait-env
* execution[meta header]
* class template[meta id-type]
* std::this_thread[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::this_thread {
  struct sync-wait-env {
    execution::run_loop* loop;  // exposition only

    auto query(execution::get_scheduler_t) const noexcept {
      return loop->get_scheduler();
    }

    auto query(execution::get_delegation_scheduler_t) const noexcept {
      return loop->get_scheduler();
    }
  };
}
```
* execution::run_loop[link ../execution/run_loop.md]
* execution::get_scheduler_t[link ../execution/get_scheduler.md]
* execution::get_delegation_scheduler_t[link ../execution/get_delegation_scheduler.md]
* get_scheduler()[link ../execution/run_loop/get_scheduler.md]

## 概要
`sync-wait-env`は、Senderアルゴリズム動作仕様定義で用いられる説明専用のクラステンプレートである。

Senderコンシューマ[`sync_wait`](sync_wait.md)、[`sync_wait_with_variant`](sync_wait_with_variant.md)動作において[Receiver](../execution/receiver.md)の[環境](../queryable.md)として利用される。


## バージョン
### 言語
- C++26


## 関連項目
- [`this_thread::sync_wait`](sync_wait.md)
- [`this_thread::sync_wait_with_variant`](sync_wait_with_variant.md)
- [`execution::run_loop`](../execution/run_loop.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
