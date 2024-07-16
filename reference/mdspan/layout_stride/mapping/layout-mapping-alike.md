# layout-mapping-alike
* mdspan[meta header]
* concept[meta id-type]
* std[meta namespace]
* layout_stride::mapping[meta class]
* cpp23[meta cpp]

```cpp
template<class T>
  constexpr bool is-extents = false;                              // exposition only
template<class IndexType, size_t... Args>
  constexpr bool is-extents<extents<IndexType, Args...>> = true;  // exposition only

template<class M>
concept layout-mapping-alike = requires {  // exposition only
  requires is-extents<typename M::extents_type>;
  { M::is_always_strided() } -> same_as<bool>;
  { M::is_always_exhaustive() } -> same_as<bool>;
  { M::is_always_unique() } -> same_as<bool>;
  bool_constant<M::is_always_strided()>::value;
  bool_constant<M::is_always_exhaustive()>::value;
  bool_constant<M::is_always_unique()>::value;
};
```
* bool_constant[link /reference/type_traits/bool_constant.md]

## 概要
`layout-mapping-alike`は、`layout_stride::mapping`動作仕様定義で用いられる説明専用コンセプトである。


## バージョン
### 言語
- C++23


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
