# sender-in-of
* execution[meta header]
* concept[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Sndr, class Env, class... Values>
  concept sender-in-of = see below;

  template<class Sndr, class... Values>
  concept sender-of = see below;
}
```

## 概要
`sender-in-of`および`sender-of`は、実行制御ライブラリの仕様定義で用いられる説明専用のコンセプトである。

説明用のエイリアステンプレート`value-signature`, コンセプト`sender-in-of-impl`, `sender-in-of`, `sender-of`を下記の通り定義する。

```cpp
namespace std::execution {
  template<class... As>
  using value-signature = set_value_t(As...);  // exposition only

  template<class Sndr, class SetValue, class... Env>
  concept sender-in-of-impl =  // exposition only
    sender_in<Sndr, Env> &&
    MATCHING-SIG(SetValue,
                 gather-signatures<set_value_t,
                                  completion_signatures_of_t<Sndr, Env...>,
                                  value-signature,
                                  type_identity_t>);

  template<class Sndr, class Env, class... Values>
  concept sender-in-of =  // exposition only
    sender-in-of-impl<Sndr, set_value_t(Values...), Env>;

  template<class Sndr, class... Values>
  concept sender-of =  // exposition only
    sender-in-of-impl<Sndr, set_value_t(Values...)>;
}
```
* set_value_t[link set_value.md]
* sender_in[link sender_in.md]
* MATCHING-SIG[link get_completion_signatures.md]
* gather-signatures[link gather-signatures.md]
* completion_signatures_of_t[link completion_signatures_of_t.md]
* type_identity_t[link /reference/type_traits/true_type.md]


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::scheduler`](scheduler.md)


## 参照
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
