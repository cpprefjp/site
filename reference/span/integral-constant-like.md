# integral-constant-like
* span[meta header]
* concept[meta id-type]
* cpp26[meta cpp]

```cpp
template<class T>
concept integral-constant-like =  // exposition only
  is_integral_v<decltype(T::value)> &&
  !is_same_v<bool, remove_const_t<decltype(T::value)>> &&
  convertible_to<T, decltype(T::value)> &&
  equality_comparable_with<T, decltype(T::value)> &&
  bool_constant<T() == T::value>::value &&
  bool_constant<static_cast<decltype(T::value)>(T()) == T::value>::value;
```
* is_integral_v[link /reference/type_traits/is_integral.md]
* is_same_v[link /reference/type_traits/is_same.md]
* remove_const_t[link /reference/type_traits/remove_const.md]
* bool_constant[link /reference/type_traits/bool_constant.md]
* convertible_to[link /reference/concepts/convertible_to.md]
* equality_comparable_with[link /reference/concepts/equality_comparable.md]

## 概要
`integral-constant-like`は、型`T`が整数定数型[`std::integral_constant`](/reference/type_traits/integral_constant.md)と互換があることを表す説明専用コンセプトである。


## バージョン
### 言語
- C++26


## 参照
- [P2630R4 Submdspan](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2630r4.html)
- [P3029R1 Better `mdspan`'s CTAD](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3029r1.html)
