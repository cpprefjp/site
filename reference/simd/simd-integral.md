# simd-integral
* [meta exposition-only]
* simd[meta header]
* concept[meta id-type]
* std::simd[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class V>
  concept simd-integral =
    simd-vec-type<V> && integral<typename V::value_type>;
}
```
* simd-vec-type[link simd-vec-type.md]
* integral[link /reference/concepts/integral.md]

## 概要
`simd-integral`は、型`V`が[`basic_vec`](basic_vec.md)の特殊化（[`simd-vec-type`](simd-vec-type.md)）であり、かつその要素型が整数型（[`std::integral`](/reference/concepts/integral.md)のモデル）であることを表す説明専用のコンセプトである。

このコンセプトは、gather／scatterのインデックスや、bit操作系の関数のテンプレートパラメータ制約として使用される。

## バージョン
### 言語
- C++26

## 関連項目
- [`std::simd::simd-vec-type`](simd-vec-type.md)
- [`std::simd::simd-floating-point`](simd-floating-point.md)

## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
