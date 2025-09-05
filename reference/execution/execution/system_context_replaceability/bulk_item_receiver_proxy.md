# bulk_item_receiver_proxy
* execution[meta header]
* class[meta id-type]
* std::execution::system_context_replaceability[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution::system_context_replaceability {
  struct bulk_item_receiver_proxy : receiver_proxy { see below };
}
```
* receiver_proxy[link receiver_proxy.md]

## 概要
`bulk_item_receiver_proxy`は、[`receiver_proxy`](receiver_proxy.md)から派生したクラス。
[`bulk_chunked`](../bulk_chunked.md)および[`bulk_unchunked`](../bulk_unchunked.md)のカスタマイズで用いられ、異なる反復に対応する[`parallel_scheduler_backend`](parallel_scheduler_backend.md)実装から通知も受信する。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `virtual void execute(size_t, size_t) noexcept = 0;` | 要素範囲の作業ハンドラ | C++26 |


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


## 参照
- [P2079R10 Parallel scheduler](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2079r10.html)
