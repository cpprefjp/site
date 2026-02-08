# is-mapping-of
* [meta exposition-only]
* mdspan[meta header]
* variable[meta id-type]
* cpp23[meta cpp]

```cpp
template<class Layout, class Mapping>
constexpr bool is-mapping-of =  // exposition only
  is_same_v<typename Layout::template mapping<typename Mapping::extents_type>, Mapping>;
```
* is_same_v[link /reference/type_traits/is_same.md]


## 概要
`is-mapping-of`は、`Mapping`が`Layout`の[レイアウトマッピング](LayoutMapping.md)か否かを判定する説明専用変数テンプレートである。


## バージョン
### 言語
- C++23


## 関連項目
- [LayoutMappingPolicy](LayoutMappingPolicy.md)
- [LayoutMapping](LayoutMapping.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
