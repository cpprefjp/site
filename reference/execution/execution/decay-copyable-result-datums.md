# decay-copyable-result-datums
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]
* [meta exposition-only]

```cpp
constexpr void decay-copyable-result-datums(auto cs) {
  cs.for-each([]<class Tag, class... Ts>(Tag(*)(Ts...)) {
    if constexpr (!(is_constructible_v<decay_t<Ts>, Ts> &&...))
      throw unspecified-exception();
  });
}
```
* for-each[link completion_signatures.md]
* is_constructible_v[link /reference/type_traits/is_constructible.md]
* unspecified-exception[link unspecified-exception.md]

## 概要
`decay-copyable-result-datums`は、Senderアルゴリズム動作仕様定義で用いられる説明専用の関数テンプレートである。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::schedule_from`](schedule_from.md)
- [`execution::when_all`](when_all.md)
- [`execution::into_variant`](into_variant.md)


## 参照
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
