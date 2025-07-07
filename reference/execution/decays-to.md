# decays-to
* execution[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class From, class To>
  concept decays-to = same_as<decay_t<From>, To>;  // exposition only
}
```

## 概要
`decays-to`は、型`From`の[decay](/reference/type_traits/decay.md)結果が型`To`に一致することを表す説明専用のコンセプトである。


## バージョン
### 言語
- C++26


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
