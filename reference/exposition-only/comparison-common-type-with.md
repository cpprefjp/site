# comparison-common-type-with
* [meta exposition-only]
* exposition-only[meta header]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T, class U, class C = common_reference_t<const T&, const U&>>
  concept comparison-common-type-with-impl =
    same_as<common_reference_t<const T&, const U&>,
            common_reference_t<const U&, const T&>> &&
    requires {
      requires convertible_to<const T&, const C&> ||
               convertible_to<T, const C&>;
      requires convertible_to<const U&, const C&> ||
               convertible_to<U, const C&>;
    };

  template<class T, class U>
  concept comparison-common-type-with =
    comparison-common-type-with-impl<remove_cvref_t<T>, remove_cvref_t<U>>;
}
```
* common_reference_t[link /reference/type_traits/common_reference.md]
* same_as[link /reference/concepts/same_as.md]
* convertible_to[link /reference/concepts/convertible_to.md]
* remove_cvref_t[link /reference/type_traits/remove_cvref.md]

## 概要
`comparison-common-type-with`は、2つの型`T`と`U`がムーブオンリー型であっても共通の上位型（common supertype）を持つことを判定するための説明専用コンセプトである。

[`common_reference_with`](/reference/concepts/common_reference_with.md)と似ているが、`const T&`からの変換だけでなく`T`（右辺値）からの変換も許可する点が異なる。これにより、コピーができずムーブのみ可能な型であっても、比較コンセプト（[`equality_comparable_with`](/reference/concepts/equality_comparable.md), [`totally_ordered_with`](/reference/concepts/totally_ordered.md), [`three_way_comparable_with`](/reference/compare/three_way_comparable.md)）を満たすことが可能になる。


## 備考
- このコンセプトはC++23で導入されたが、C++20への欠陥報告（DR）として扱われる


## バージョン
### 言語
- C++20（C++23で追加、C++20にDR適用）


## 参照
- [P2404R3 Move-only types for `equality_comparable_with`, `totally_ordered_with`, and `three_way_comparable_with`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2404r3.pdf)
