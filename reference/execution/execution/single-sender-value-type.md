# single-sender-value-type
* execution[meta header]
* type-alias[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
template<class Sndr, class Env>
using single-sender-value-type = see below;  // exposition only
```
* see below[italic]

## 概要
`single-sender-value-type`は、実行制御ライブラリの仕様定義で用いられる説明専用のエイリアステンプレートである。

型`Sndr`と`Env`に対して、`single-sender-value-type<Sndr, Env>`は下記のエイリアスとなる。

- [`value_types_of_t`](value_types_of_t.md)`<Sndr, Env,` [`decay_t`](/reference/type_traits/decay.md)`,` [`type_identity_t`](/reference/type_traits/type_identity.md)`>`が適格であるならば、その型。
- そうではなく、[`value_types_of_t`](value_types_of_t.md)`<Sndr, Env,` [`tuple`](/reference/tuple/tuple.md)`,` [`variant`](/reference/variant/variant.md)`>`が`variant<tuple<>>`もしくは`variant<>`ならば、`void`型。
- [`value_types_of_t`](value_types_of_t.md)`<Sndr, Env,` [`decayed-tuple`](decayed-tuple.md)`,` [`type_identity_t`](/reference/type_traits/type_identity.md)>`が適格であるならば、その型。
- そうでなければ、`single-sender-value-type<Sndr, Env>`は不適格。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::stopped_as_optional`](stopped_as_optional.md)
- [`sender-awaitable`](sender-awaitable.md.nolink)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
