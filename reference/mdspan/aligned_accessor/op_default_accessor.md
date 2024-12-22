# operator default_accessor
* mdspan[meta header]
* function template[meta id-type]
* std[meta namespace]
* aligned_accessor[meta class]
* cpp26[meta cpp]

```cpp
template<class OtherElementType>
  constexpr operator default_accessor<OtherElementType>() const noexcept;
```
* default_accessor[link ../default_accessor.md]

## 概要
[`default_accessor`](../default_accessor.md)型への変換演算子


## テンプレートパラメータ制約
[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<element_type(*)[], OtherElementType(*)[]>`が`true`であること


## 効果
`return {};`と等価


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
- [P2897R7 `aligned_accessor`: An mdspan accessor expressing pointer over-alignment](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2897r7.html)
