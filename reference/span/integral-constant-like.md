# integral-constant-like
* [meta exposition-only]
* span[meta header]
* concept[meta id-type]
* cpp26[meta cpp]

```cpp
template<class T>
concept integral-constant-like =  // exposition only
  is_integral_v<remove_cvref_t<decltype(T::value)>> &&
  !is_same_v<bool, remove_cvref_t<decltype(T::value)>> &&
  convertible_to<T, decltype(T::value)> &&
  equality_comparable_with<T, decltype(T::value)> &&
  bool_constant<T() == T::value>::value &&
  bool_constant<static_cast<decltype(T::value)>(T()) == T::value>::value;
```
* is_integral_v[link /reference/type_traits/is_integral.md]
* is_same_v[link /reference/type_traits/is_same.md]
* remove_cvref_t[link /reference/type_traits/remove_cvref.md]
* bool_constant[link /reference/type_traits/bool_constant.md]
* equality_comparable_with[link /reference/concepts/equality_comparable.md]

## 概要
`integral-constant-like`は、型`T`が整数定数型[`std::integral_constant`](/reference/type_traits/integral_constant.md)と互換があることを表す説明専用コンセプトである。


## バージョン
### 言語
- C++26


## 参照
- [P2630R4 Submdspan](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2630r4.html)
- [P3029R1 Better `mdspan`'s CTAD](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3029r1.html)
- [LWG Issue 4486. `integral-constant-like` and `constexpr-wrapper-like` exposition-only concept duplication](https://cplusplus.github.io/LWG/issue4486)
    - C++26で、`decltype(T::value)`に`remove_cvref_t`を適用するよう修正され、`<span>`と`<simd>`で重複していた制約が説明専用コンセプト`constexpr-wrapper-like`へ集約された
- [LWG Issue 4351. `integral-constant-like` needs more `remove_cvref_t`](https://cplusplus.github.io/LWG/issue4351)
    - C++26で、`bool`型を除外する制約`!is_same_v<bool, ...>`でも`remove_const_t`ではなく`remove_cvref_t`を用いるよう修正された（参照修飾された`bool`定数が誤って許容されるのを防ぐもの）
