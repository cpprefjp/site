# single-sender
* [meta exposition-only]
* execution[meta header]
* type-alias[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
template<class Sndr, class... Env>
concept single-sender = sender_in<Sndr, Env...> &&
  requires {
    typename single-sender-value-type<Sndr, Env...>;
  };
```
* sender_in[link sender_in.md]
* single-sender-value-type[link single-sender-value-type.md]

## 概要
`single-sender`は、実行制御ライブラリの仕様定義で用いられる説明専用のエイリアステンプレートである。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::as_awaitable`](as_awaitable.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
