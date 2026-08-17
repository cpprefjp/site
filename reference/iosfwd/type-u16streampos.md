# u16streampos
* iosfwd[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  using u16streampos = fpos<char_traits<char16_t>::state_type>;
}
```
* fpos[link /reference/ios/fpos.md]
* char_traits[link /reference/string/char_traits.md]

`u16streampos`は、`char16_t`を要素とするストリーム上の位置を表す型であり、[`fpos`](/reference/ios/fpos.md)`<`[`char_traits`](/reference/string/char_traits.md)`<char16_t>::state_type>`の別名である。

`char16_t`を要素とする各入出力ストリームクラスのメンバ型`pos_type`は、この型となる。

この型は、`char16_t`型とともにC++11で追加された。


## 関連項目
- [`fpos`](/reference/ios/fpos.md): ストリーム上の位置を表現するクラステンプレート
- [`streampos`](type-streampos.md): `char`を要素とするストリーム上の位置を表す型
