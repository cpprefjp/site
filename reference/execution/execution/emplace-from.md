# emplace-from
* execution[meta header]
* std::execution[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
template<callable Fun>
  requires is_nothrow_move_constructible_v<Fun>
struct emplace-from {
  Fun fun;  // exposition only
  using type = call-result-t<Fun>;

  constexpr operator type() && noexcept(nothrow-callable<Fun>) {
    return std::move(fun)();
  }

  constexpr type operator()() && noexcept(nothrow-callable<Fun>) {
    return std::move(fun)();
  }
};
```
* is_nothrow_move_constructible_v[link /reference/type_traits/is_nothrow_move_constructible.md]
* call-result-t[link call-result-t.md.nolink]
* nothrow-callable[link /reference/functional/nothrow-callable.md.nolink]
* std::move[link /reference/utility/move.md]

## 概要
`emplace-from`は、Senderアルゴリズム動作仕様定義で用いられる説明専用のクラステンプレートである。


## バージョン
### 言語
- C++26

## 関連項目
- [`execution::let_value`](let_value.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
