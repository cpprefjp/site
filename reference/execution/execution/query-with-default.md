# query-with-default
* [meta exposition-only]
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
template<class Tag, class Env, class Default>
constexpr decltype(auto) query-with-default(
  Tag, const Env& env, Default&& value) noexcept(see below);
```

<!-- see https://github.com/cpprefjp/site/pull/1672 -->

## 概要
`query-with-default`は、Senderアルゴリズム動作仕様定義で用いられる説明専用の関数テンプレートである。

説明用の式`e`を、適格であるならば`Tag()(env)`とする。そうでなければ、`static_cast<Default>(`[`std::forward`](/reference/utility/forward.md)`<Default>(value))`とする。


## 戻り値
`e`を返す。


## 備考
noexcept節の式は`noexcept(e)`となる。


## バージョン
### 言語
- C++26


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
