# decayed-tuple
* execution[meta header]
* std::execution[meta namespace]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class... Ts>
  using decayed-tuple = tuple<decay_t<Ts>...>;  // exposition only
}
```

## 概要
`decayed-tuple`は、型パラメータパック`Ts`から[decay](/reference/type_traits/decay.md)結果を要素型とする[`tuple`](/reference/tuple/tuple.md)型を作成する説明専用のエイリアステンプレートである。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::value_types_of_t`](value_types_of_t.md)
- [`this_thread::sync_wait`](../this_thread/sync_wait.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
