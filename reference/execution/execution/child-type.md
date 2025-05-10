# child-type
* execution[meta header]
* std::execution[meta namespace]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Sndr, size_t I = 0>
  using child-type = decltype(declval<Sndr>().template get<I+2>());  // exposition only
}
```
* template get[link product-type.md]

## 概要
[Senderアルゴリズム型](basic-sender.md)`Sndr`の子Sender型を取得する説明専用のエイリアステンプレート。


## バージョン
### 言語
- C++26

## 関連項目
- [`execution::schedule_from`](schedule_from.md.nolink)
- [`execution::into_variant`](into_variant.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
