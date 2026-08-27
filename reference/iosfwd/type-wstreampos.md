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


## 参照
- [LWG Issue 1414. Fixing remaining dead links to `POS_T` and `OFF_T`](https://cplusplus.github.io/LWG/issue1414)
    - C++11で、この型が満たすべき要件の参照先が、存在しない`POS_T`から`pos_type`の規定へ修正された
