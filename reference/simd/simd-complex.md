# simd-complex
* [meta exposition-only]
* simd[meta header]
* concept[meta id-type]
* std::simd[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class V>
  concept simd-complex =
    simd-vec-type<V> &&
    same_as<typename V::value_type, complex<simd-complex-value-type<V>>>;
}
```
* simd-complex-value-type[link /reference/simd/simd-complex-value-type.md]
* simd-vec-type[link simd-vec-type.md]
* complex[link /reference/complex/complex.md]

## 概要
`simd-complex`は、型`V`が[`basic_vec`](basic_vec.md)の特殊化（[`simd-vec-type`](simd-vec-type.md)）であり、かつその要素型が[`std::complex`](/reference/complex/complex.md)の特殊化であることを表す説明専用のコンセプトである。

要素の実数部・虚数部の型は、説明専用の`simd-complex-value-type<V>`（`V::value_type::value_type`）で表される。このコンセプトは、[`real`](real.md)・[`imag`](imag.md)・[`arg`](arg.md)・[`conj`](conj.md)などの複素数用の関数のテンプレートパラメータ制約として使用される。

## バージョン
### 言語
- C++26

## 関連項目
- [`std::simd::simd-vec-type`](simd-vec-type.md)
- [`std::simd::real`](real.md)
- [`std::simd::imag`](imag.md)

## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
