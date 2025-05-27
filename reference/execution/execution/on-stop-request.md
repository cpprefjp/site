# on-stop-request
* execution[meta header]
* class[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
struct on-stop-request {
  inplace_stop_source& stop-src;  // exposition only
  void operator()() noexcept { stop-src.request_stop(); }
};
```
* inplace_stop_source[link /reference/stop_token/inplace_stop_source.md]
* request_stop()[link /reference/stop_token/inplace_stop_source/request_stop.md]

## 概要
`on-stop-request`は、Senderアルゴリズム動作仕様定義で用いられる説明専用のクラステンプレートである。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::when_all`](when_all.md)
- [`execution::split`](split.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
