# pair-like
* tuple[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  namespace ranges {
    // C++20
    template<class T>
    concept pair-like = // 説明専用コンセプト
      !is_reference_v<T> && requires(T t) {
        typename tuple_size<T>::type; // tuple_size<T> が完全型であることを明確にする
        requires derived_from<tuple_size<T>, integral_constant<size_t, 2>>;
        typename tuple_element_t<0, remove_const_t<T>>;
        typename tuple_element_t<1, remove_const_t<T>>;
        { get<0>(t) } -> convertible_to<const tuple_element_t<0, T>&>;
        { get<1>(t) } -> convertible_to<const tuple_element_t<1, T>&>;
      };
  }

  // C++23 以降
  template <typename T>
  concept pair-like // 説明専用コンセプト
    = tuple-like<T> && tuple_size_v<remove_cvref_t<T>> == 2;
}
```
* tuple_element_t[link tuple_element.md]
* tuple_size[link tuple_size.md]
* tuple_size_v[link tuple_size.md]
* is_reference_v[link /reference/type_traits/is_reference.md]
* integral_constant[link /reference/type_traits/integral_constant.md]
* remove_const_t[link /reference/type_traits/remove_const.md]
* remove_cvref_t[link /reference/type_traits/remove_cvref.md]
* convertible_to[link /reference/concepts/convertible_to.md]
* tuple-like[link tuple-like.md]

## 概要
`pair-like`は型`T`が[`pair`](/reference/utility/pair.md)のような型であることを表現する説明専用コンセプトである。C++23 では[`tuple-like`](tuple-like.md)の追加に伴って定義が変更された。

[`ranges::subrange`](/reference/ranges/subrange.md)での[`operator PairLike`](/reference/ranges/subrange/op_pairlike.md)の定義など、[`<ranges>`](/reference/ranges.md)での定義に使用されている。

C++23 以降では[`array`](/reference/array/array.md)、[`pair`](/reference/utility/pair.md)、[`tuple`](tuple.md)、[`ranges::subrange`](/reference/ranges/subrange.md)らの互換性を高める（相互に構築・比較などが出来るようにする）ためにも使用される。


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`tuple-like`](tuple-like.md)


## 参照
- [P2165R4 Compatibility between `tuple`, `pair` and *tuple-like* objects](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2165r4.pdf)
