# forwarding_query
* execution[meta header]
* cpo[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  struct forwarding_query_t { unspecified };
  inline constexpr forwarding_query_t forwarding_query{};
}
```
* unspecified[italic]

## 概要
`forwarding_query`は、対象[クエリオブジェクト](queryable.md)に対してクエリ可能アダプタを通じて転送可能か否かを確認するクエリオブジェクトである。


### 説明専用の式 `FWD-ENV`
説明用の[クエリ可能オブジェクト](queryable.md)`env`、[クエリオブジェクト](queryable.md)`q`、パック式`as`に対して、式`FWD-ENV(env)`は下記の通り定義される。

- `forwarding_query(q) == false`ならば、式`FWD-ENV(env).query(q, as...)`は不適格となる。
- そうでなければ、式`FWD-ENV(env)`は式`env.query(q, as...)`と等価であり、その型は[`queryable`](queryable.md)を満たす。


## 効果
説明用の式`q`を`Q`型の[クエリオブジェクト](queryable.md)としたとき、呼び出し式`forwarding_query(q)`は下記と等価であり、`bool`型の値となる。

- 式`q.query(forwarding_query)`が適格であれば、同式の`bool`値。
    - `q`がコア定数式ならば、`q.query(forwarding_query)`もコア定数式となる。
- そうではなく、[`derived_from`](/reference/concepts/derived_from.md)`<Q, forwarding_query_t> == true`ならば`true`
- そうでなければ、`false`


## カスタマイゼーションポイント
[クエリ可能オブジェクト](queryable.md)`q`に対して式`q.query(forwarding_query)`が呼び出される。
このとき`noexcept(q.query(forwarding_query)) == true`であること。


## 備考
下記[クエリオブジェクト](queryable.md)に対する問い合わせは、`FWD-ENV`経由で転送される。

- `forwarding_query`自身
- [`get_allocator`](get_allocator.md)
- [`get_stop_token`](get_stop_token.md)
- [`execution::get_domain`](execution/get_domain.md)
- [`execution::get_scheduler`](execution/get_scheduler.md)
- [`execution::get_delegation_scheduler`](execution/get_delegation_scheduler.md)
- [`execution::get_completion_scheduler`](execution/get_completion_scheduler.md)

下記[クエリオブジェクト](queryable.md)に対する問い合わせは、`FWD-ENV`経由で転送されない。

- [`execution::get_env`](execution/get_env.md)
- [`executoin::get_forward_progress_guarantee`](executionget_forward_progress_guarantee.md.nolink)


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`impls-for`](execution/impls-for.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
