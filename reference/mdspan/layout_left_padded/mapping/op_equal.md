# operator==
* mdspan[meta header]
* function template[meta id-type]
* std[meta namespace]
* layout_left_padded::mapping[meta class]
* cpp26[meta cpp]

```cpp
template<class LayoutLeftPaddedMapping>
friend constexpr bool operator==(
  const mapping& x, const LayoutLeftPaddedMapping& y) noexcept;

//operator==により、以下のオーバーロードが使用可能になる        
template<class LayoutLeftPaddedMapping>
friend constexpr bool operator!=(
  const mapping& x, const LayoutLeftPaddedMapping& y) noexcept;
```

## 概要
`mapping`の等値比較を行う。


## テンプレートパラメータ制約
- [`is-layout-left-padded-mapping-of`](../../is-layout-left-padded-mapping-of.md)`<LayoutLeftPaddedMapping>`
- `LayoutLeftPaddedMapping::extents_type::`[`rank()`](../../extents/rank.md) `== rank_`


## 戻り値
- [`x.extents() == y.extents()`](../../extents/op_equal.md)かつ`rank_ < 2 || x.`[`stride`](stride.md)`(1) == y.stride(1)`のとき、`true`を返す。
- そうでなければ、`false`を返す。


## 例外
投げない


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2642R6 Padded mdspan layouts](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2642r6.pdf)
