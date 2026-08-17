# u8streampos
* iosfwd[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  using u8streampos = fpos<char_traits<char8_t>::state_type>;
}
```
* fpos[link /reference/ios/fpos.md]
* char_traits[link /reference/string/char_traits.md]

`u8streampos`は、`char8_t`を要素とするストリーム上の位置を表す型であり、[`fpos`](/reference/ios/fpos.md)`<`[`char_traits`](/reference/string/char_traits.md)`<char8_t>::state_type>`の別名である。

`char8_t`を要素とする各入出力ストリームクラスのメンバ型`pos_type`は、この型となる。

この型は、`char8_t`型とともにC++20で追加された。


## 関連項目
- [`fpos`](/reference/ios/fpos.md): ストリーム上の位置を表現するクラステンプレート
- [`streampos`](type-streampos.md): `char`を要素とするストリーム上の位置を表す型
