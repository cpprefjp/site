# class-type
* execution[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class T>
  concept class-type = decays-to<T, T> && is_class_v<T>;  // exposition only
}
```
* decays-to[link decays-to.md]
* is_class_v[link /reference/type_traits/is_class.md]

## 概要
`class-type`は、型`T`がクラス型であることを表す説明専用のコンセプトである。


## バージョン
### 言語
- C++26


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
