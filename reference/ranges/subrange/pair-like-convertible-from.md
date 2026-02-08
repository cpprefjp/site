# pair-like-convertible-from
* [meta exposition-only]
* ranges[meta header]
* concept[meta id-type]
* std::ranges[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  // C++20
  template<class T, class U, class V>
    concept pair-like-convertible-from = // 説明専用コンセプト
      !range<T> && pair-like<T> &&
      constructible_from<T, U, V> &&
      convertible-to-non-slicing<U, tuple_element_t<0, T>> &&
      convertible_to<V, tuple_element_t<1, T>>;

  // C++23
  template<class T, class U, class V>
    concept pair-like-convertible-from = // 説明専用コンセプト
      !range<T> && !is_reference_v<T> && pair-like<T> &&
      constructible_from<T, U, V> &&
      convertible-to-non-slicing<U, tuple_element_t<0, T>> &&
      convertible_to<V, tuple_element_t<1, T>>;
}
```
* pair-like[link /reference/tuple/pair-like.md]
* convertible-to-non-slicing[link convertible-to-non-slicing.md]
* constructible_from[link /reference/concepts/constructible_from.md]
* tuple_element_t[link /reference/tuple/tuple_element.md]
* is_reference_v[link /reference/type_traits/is_reference.md]
* convertible-to-non-slicing[italic]
* pair-like[italic]
* pair-like-convertible-from[italic]

## 概要
`pair-like-convertible-from`は、型`T`が型`U`と`V`から構築出来る[`pair-like`](/reference/tuple/pair-like.md)であり、かつ`U`がスライシングを起こさないということを表す説明専用コンセプトである。[`ranges::subrange`](../subrange.md)での定義に使用され、`U`にはイテレータの型が、`V`にはセンチネルの型が渡される。


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`ranges::subrange`](../subrange.md)
- [`uses-nonqualification-pointer-conversion`](uses-nonqualification-pointer-conversion.md)
- [`convertible-to-non-slicing`](convertible-to-non-slicing.md)

## 参照
- [P2165R4 Compatibility between `tuple`, `pair` and *tuple-like* objects](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2165r4.pdf)
