# sender-for
* execution[meta header]
* concept[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Sndr, class Tag>
  concept sender-for =
    sender<Sndr> &&
    same_as<tag_of_t<Sndr>, Tag>;
}
```
* sender[link sender.md]
* tag_of_t[link tag_of_t.md.nolink]

## 概要
`sender-for`は、[Sender型](sender.md)`Sndr`が[Senderタグ型](tag_of_t.md.nolink)`Tag`を持つことを表す説明専用のコンセプトである。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::sender`](sender.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
