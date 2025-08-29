# try_query
* execution[meta header]
* std::execution::system_context_replaceability[meta namespace]
* receiver_proxy[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<class P, class-type Query>
optional<P> try_query(Query q) noexcept;
```
* class-type[link ../../../class-type.md]
* optional[link /reference/optional/optional.md]

## 概要
[`parallel_scheduler`](../../parallel_scheduler.md)バックエンド実装側から[Receiver](../../receiver.md)環境にアクセスするための補助関数。


## 適格要件
`P`はcv修飾された非配列オブジェクト型。


## 戻り値
説明用の`env`を`*this`が表現する[Receiver](../../receiver.md)の環境とする。
下記を満たす場合は[`nullopt`](/reference/optional/nullopt_t.md)を返す。そうでなければ、`q(env)`を返す。

- `Query`が実装定義でサポートされるクエリ集合のメンバではない、または
- `P`が実装定義でサポートされる`Query`の結果型集合のメンバではない、または
- 式`q(env)`が適格でないか、cv修飾された`P`型を持たない。


## 例外
投げない


## 備考
[`get_stop_token_t`](../../../get_stop_token.md)は実装定義でサポートるクエリ集合に含まれ、[`inplace_stop_token`](/reference/stop_token/inplace_stop_token.md)は`get_stop_token_t`の実装定義でサポートされる結果型集合のメンバである。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::parallel_scheduler`](../../parallel_scheduler.md)
- [`execution::system_context_replaceability::parallel_scheduler_backend`](../parallel_scheduler_backend.md)


## 参照
- [P2079R10 Parallel scheduler](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2079r10.html)
