# not-a-sender
* execution[meta header]
* class[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]
* [meta exposition-only]

```cpp
struct not-a-sender {
  using sender_concept = sender_t;

  template<class Sndr>
    static consteval auto get_completion_signatures() -> completion_signatures<> {
      throw unspecified-exception();
  }
};
```
* sender_t[link sender.md]
* get_completion_signatures[link get_completion_signatures.md]
* completion_signatures[link completion_signatures.md]
* unspecified-exception[link unspecified-exception.md]

## 概要
`not-a-sender`は、Senderアルゴリズム動作仕様定義で用いられる説明専用のクラスである。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::on`](on.md)
- [`execution::stopped_as_optional`](stopped_as_optional.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
