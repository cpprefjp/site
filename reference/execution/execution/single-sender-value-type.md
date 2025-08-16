# single-sender-value-type
* execution[meta header]
* type-alias[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
template<class Sndr, class... Env>
using single-sender-value-type = see below;  // exposition only
```

## 概要
`single-sender-value-type`は、実行制御ライブラリの仕様定義で用いられる説明専用のエイリアステンプレートである。

型`Sndr`と型パック`Env`に対して、`CS`を[`completion_signatures_of_t`](completion_signatures_of_t.md)`<Sndr, Env...>`とする。`CS`が不適格または`sizeof...(Env) > 1`のとき、`single-sender-value-type<Sndr, Env...>`は不適格となる。

そうでなければ、`single-sender-value-type<Sndr, Env...>`は下記のエイリアスとなる。

- [`gather-signatures`](gather-signatures.md)`<`[`set_value_t`](set_value.md)`, CS,` [`decay_t`](/reference/type_traits/decay.md)`,` [`type_identity_t`](/reference/type_traits/type_identity.md)`>`が適格であるならば、その型。
- そうではなく、[`gather-signatures`](gather-signatures.md)`<`[`set_value_t`](set_value.md)`, CS,` [`tuple`](/reference/tuple/tuple.md)`,` [`variant`](/reference/variant/variant.md)`>`が`variant<tuple<>>`もしくは`variant<>`ならば、`void`型。
- そうではなく、[`gather-signatures`](gather-signatures.md)`<`[`set_value_t`](set_value.md)`, CS,` [`decayed-tuple`](decayed-tuple.md)`,` [`type_identity_t`](/reference/type_traits/type_identity.md)`>`が適格であるならば、その型。
- そうでなければ、`single-sender-value-type<Sndr, Env...>`は不適格。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::stopped_as_optional`](stopped_as_optional.md)
- [`execution::as_awaitable`](as_awaitable.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
