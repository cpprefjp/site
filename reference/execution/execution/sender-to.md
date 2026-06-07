# sender-to
* [meta exposition-only]
* execution[meta header]
* concept[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Sndr, class Rcvr>
  concept sender-to =
    sender_in<Sndr, env_of_t<Rcvr>> &&
    receiver-of<Rcvr, completion_signatures_of_t<Sndr, env_of_t<Rcvr>>> &&
    requires (Sndr&& sndr, Rcvr&& rcvr) {
      connect(std::forward<Sndr>(sndr), std::forward<Rcvr>(rcvr));
    };
}
```
* sender_in[link sender_in.md]
* env_of_t[link env_of_t.md]
* receiver-of[link receiver-of.md]
* completion_signatures_of_t[link completion_signatures_of_t.md]
* connect[link connect.md]

## 概要
`sender-to`は、[Sender型](sender.md)`Sndr`が[Receiver型](receiver.md)`Rcvr`と接続可能であることを表す説明専用のコンセプトである。


## バージョン
### 言語
- C++26


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P4159R0 Make `sender_in` and `receiver_of` exposition-only](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p4159r0.html)
