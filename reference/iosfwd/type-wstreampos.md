# wstreampos
* iosfwd[meta header]
* std[meta namespace]
* type-alias[meta id-type]

```cpp
namespace std {
  using wstreampos = fpos<char_traits<wchar_t>::state_type>;
}
```
* fpos[link /reference/ios/fpos.md]
* char_traits[link /reference/string/char_traits.md]

`wstreampos`は、`wchar_t`を要素とするストリーム上の位置を表す型であり、[`fpos`](/reference/ios/fpos.md)`<`[`char_traits`](/reference/string/char_traits.md)`<wchar_t>::state_type>`の別名である。

`wchar_t`を要素とする各入出力ストリームクラスのメンバ型`pos_type`は、この型となる。


## 関連項目
- [`fpos`](/reference/ios/fpos.md): ストリーム上の位置を表現するクラステンプレート
- [`streampos`](type-streampos.md): `char`を要素とするストリーム上の位置を表す型
