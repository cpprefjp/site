# fmt-maybe-const
* format[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class R, class charT>
  using fmt-maybe-const =
    conditional_t<const-formattable-range<R, charT>, const R, R>;
}
```
* const-formattable-range[link const-formattable-range.md]
* conditional_t[link /reference/type_traits/conditional.md]

## 概要
`fmt-maybe-const`は、[`formatter::format()`](/reference/format/formatter/format.md)関数のパラメータ型として使用するための(const) Range型を取得する、型の別名である。


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2286R8 Formatting Ranges](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2286r8.html)
