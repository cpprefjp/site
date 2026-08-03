# simd-floating-point
* [meta exposition-only]
* simd[meta header]
* concept[meta id-type]
* std::simd[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class V>
  concept simd-floating-point =
    simd-vec-type<V> && floating_point<typename V::value_type>;
}
```
* simd-vec-type[link simd-vec-type.md]
* floating_point[link /reference/concepts/floating_point.md]

## 概要
`simd-floating-point`は、型`V`が[`basic_vec`](basic_vec.md)の特殊化（[`simd-vec-type`](simd-vec-type.md)）であり、かつその要素型が浮動小数点数型（[`std::floating_point`](/reference/concepts/floating_point.md)のモデル）であることを表す説明専用のコンセプトである。

## バージョン
### 言語
- C++26

## 関連項目
- [`std::simd::simd-vec-type`](simd-vec-type.md)
- [`std::simd::simd-integral`](simd-integral.md)
- [`std::simd::math-floating-point`](math-floating-point.md)

## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
