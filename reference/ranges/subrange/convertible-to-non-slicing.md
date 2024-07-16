# convertible-to-non-slicing
* ranges[meta header]
* concept[meta id-type]
* std::ranges[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class From, class To>
    concept convertible-to-non-slicing = // 説明専用コンセプト
      convertible_to<From, To> &&
      !uses-nonqualification-pointer-conversion<decay_t<From>, decay_t<To>>;
}
```
* convertible_to[link /reference/concepts/convertible_to.md]
* uses-nonqualification-pointer-conversion[link uses-nonqualification-pointer-conversion.md]
* decay_t[link /reference/type_traits/decay.md]
* convertible-to-non-slicing[italic]
* uses-nonqualification-pointer-conversion[italic]

## 概要
`convertible-to-non-slicing`は、型`From`から型`To`へ、スライシングを起こさずに変換できることを表す説明専用コンセプトである。[`ranges::subrange`](../subrange.md)での定義に使用され、`From`と`To`にはイテレータの型が渡される。


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
- [`pair-like-convertible-from`](pair-like-convertible-from.md)


## 参照
- [LWG 3282 `subrange` converting constructor should disallow derived to base conversions](https://cplusplus.github.io/LWG/issue3282)
- [LWG 3470 `convertible-to-non-slicing` seems to reject valid case](https://cplusplus.github.io/LWG/issue3470)

