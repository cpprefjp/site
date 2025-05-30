# forwarding-query
* execution[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class T>
  concept forwarding-query = forwarding_query(T{});  // exposition only
}
```
* forwarding_query[link forwarding_query.md]

## 概要
`forwarding_query`は、型`T`が[クエリ可能アダプタを通じて転送可能](forwarding_query.md)か否かを確認する説明専用のコンセプトである。


## バージョン
### 言語
- C++26


## 関連項目
- [`forwarding_query`](forwarding_query.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
