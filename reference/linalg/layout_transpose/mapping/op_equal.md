# operator==
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* layout_transpose::mapping[meta class]
* cpp26[meta cpp]

```cpp
template<class OtherExtents>
friend constexpr bool
  operator==(const mapping& x, const mapping<OtherExtents>& y);

//operator==により、以下のオーバーロードが使用可能になる        
template<class OtherExtents>
friend constexpr bool
  operator!=(const mapping& x, const mapping<OtherExtents>& y);
```

## 概要
`mapping`の等値比較を行う。


## テンプレートパラメータ制約
式`x.nested-mapping_ == y.nested-mapping_`が適格、かつ結果が`bool`に変換可能であること。


## 戻り値
`x.nested-mapping_ == y.nested-mapping_`


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
