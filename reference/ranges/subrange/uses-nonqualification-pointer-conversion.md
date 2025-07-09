# uses-nonqualification-pointer-conversion
* ranges[meta header]
* concept[meta id-type]
* std::ranges[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class From, class To>
    concept uses-nonqualification-pointer-conversion =  // 説明専用コンセプト
      is_pointer_v<From> && is_pointer_v<To> &&
      !convertible_to<remove_pointer_t<From>(*)[], remove_pointer_t<To>(*)[]>;
}
```
* is_pointer_v[link /reference/type_traits/is_pointer.md]
* remove_pointer_t[link /reference/type_traits/remove_pointer.md]
* uses-nonqualification-pointer-conversion[italic]

## 概要
`uses-nonqualification-pointer-conversion`は、直接変換できない型同士のポインタの変換が必要かどうかを表す。[`ranges::subrange`](../subrange.md)の定義において、`ranges::subrange<const T* const*>`を`T*[]`から構築するなどの時に必要になるポインタの変換を許容するために使用される。


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
- [`convertible-to-non-slicing`](convertible-to-non-slicing.md)
- [`pair-like-convertible-from`](pair-like-convertible-from.md)


## 参照
- [LWG 3470 `convertible-to-non-slicing` seems to reject valid case](https://cplusplus.github.io/LWG/issue3470)
