# receiver_proxy
* execution[meta header]
* class[meta id-type]
* std::execution::system_context_replaceability[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution::system_context_replaceability {
  struct receiver_proxy;
}
```

## 概要
`receiver_proxy`は、[`parallel_scheduler_backend`](parallel_scheduler_backend.md)実装から完了操作のトリガー通知を受け取る[`Receiver`](../receiver.md)を表現する。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `virtual ~receiver_proxy() = default;` | デストラクタ | C++26 |
| `virtual void set_value() noexcept = 0;` | 値完了ハンドラ | C++26 |
| `virtual void set_error(exception_ptr) noexcept = 0;` | エラー完了ハンドラ | C++26 |
| `virtual void set_stopped() noexcept = 0;` | 停止完了ハンドラ | C++26 |
| [`try_query`](receiver_proxy/try_query.md) | クエリオブジェクト問い合わせ | C++26 |


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
