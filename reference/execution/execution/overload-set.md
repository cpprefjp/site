# overload-set
* execution[meta header]
* class template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
template<class... Fns>
struct overload-set : Fns... {
  using Fns::operator()...;
};
```

## 概要
`overload-set`は、Senderアルゴリズム動作仕様定義で用いられる説明専用のクラステンプレートである。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::then`](then.md)
- [`execution::let_value`](let_value.md)
- [`execution::bulk`](bulk.md)


## 参照
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
