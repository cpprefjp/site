# data-type
* [meta exposition-only]
* execution[meta header]
* std::execution[meta namespace]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Sndr>
  using data-type = decltype(declval<Sndr>().template get<1>());  // exposition only
}
```
* template get[link product-type.md]

## 概要
[Senderアルゴリズム型](basic-sender.md)`Sndr`のデータ型を取得する説明専用のエイリアステンプレート。


## バージョン
### 言語
- C++26

## 関連項目
- [`execution::read_env`](read_env.md)
- [`execution::write_env`](write_env.md)
- [`execution::schedule_from`](schedule_from.md)
- [`execution::then`](then.md)
- [`execution::let_value`](let_value.md)
- [`execution::bulk`](bulk.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
