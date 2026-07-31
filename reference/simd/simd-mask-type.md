# simd-mask-type
* [meta exposition-only]
* simd[meta header]
* concept[meta id-type]
* std::simd[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class V>
  concept simd-mask-type =
    same_as<V, basic_mask<mask-element-size<V>, typename V::abi_type>> &&
    is_default_constructible_v<V>;
}
```
* mask-element-size[link /reference/simd/mask-element-size.md]
* basic_mask[link basic_mask.md]
* is_default_constructible_v[link /reference/type_traits/is_default_constructible.md]

## 概要
`simd-mask-type`は、型`V`が[`basic_mask`](basic_mask.md)の特殊化であることを表す説明専用のコンセプトである。

`V`が、対応する要素サイズ（説明専用の`mask-element-size<V>`）と自身の`abi_type`から構築される`basic_mask`と同じ型であり、かつデフォルト構築可能である場合にモデルとなる。

## バージョン
### 言語
- C++26

## 関連項目
- [`std::simd::basic_mask`](basic_mask.md)
- [`std::simd::simd-vec-type`](simd-vec-type.md)

## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
