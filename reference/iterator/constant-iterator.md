# constant-iterator
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class It>
  concept constant-iterator =
    input_iterator<It> && same_as<iter_const_reference_t<It>, iter_reference_t<It>>;
}
```
* iter_const_reference_t[link /reference/iterator/iter_const_reference_t.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]

## 概要

`constant-iterator`はイテレータ型`It`が定数イテレータであることを表す説明専用のコンセプトである。定数イテレータは、間接参照を通してその要素を変更することができない。

## バージョン
### 言語
- C++23

## 参照

- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
