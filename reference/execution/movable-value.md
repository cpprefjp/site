# movable-value
* [meta exposition-only]
* execution[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class T>
  concept movable-value =  // exposition only
    move_constructible<decay_t<T>> &&
    constructible_from<decay_t<T>, T> &&
    (!is_array_v<remove_reference_t<T>>);
}
```
* constructible_from[link /reference/concepts/constructible_from.md]
* is_array_v[link /reference/type_traits/is_array.md]

## 概要
`movable-value`は、型`T`がムーブ構築可能な値であることを表す説明専用のコンセプトである。


## バージョン
### 言語
- C++26


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
