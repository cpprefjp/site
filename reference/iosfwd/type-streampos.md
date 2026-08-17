# streampos
* iosfwd[meta header]
* std[meta namespace]
* type-alias[meta id-type]

```cpp
namespace std {
  using streampos = fpos<char_traits<char>::state_type>;
}
```
* fpos[link /reference/ios/fpos.md]
* char_traits[link /reference/string/char_traits.md]

`streampos`は、`char`を要素とするストリーム上の位置を表す型であり、[`fpos`](/reference/ios/fpos.md)`<`[`char_traits`](/reference/string/char_traits.md)`<char>::state_type>`の別名である。

`char`を要素とする各入出力ストリームクラスのメンバ型`pos_type`は、この型となる。


## 関連項目
- [`fpos`](/reference/ios/fpos.md): ストリーム上の位置を表現するクラステンプレート
- [`streamoff`](/reference/ios/type-streamoff.md): ストリーム上の位置のオフセットを表す型
