# floating_point
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  concept floating_point = is_floating_point_v<T>;
}
```
* is_floating_point_v[link /reference/type_traits/is_floating_point.md]

## 概要
`floating_point`は、任意の型`T`が浮動小数点数型であることを表す要件である。


## 参照
- [P0631R8 Math Constants](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0631r8.pdf)
