# simd-complex-value-type
* [meta exposition-only]
* simd[meta header]
* type-alias[meta id-type]
* std::simd[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class V>
  using simd-complex-value-type = typename V::value_type::value_type;
}
```

## 概要
`simd-complex-value-type`は、複素数を要素とする[`basic_vec`](basic_vec.md)の、実数部・虚数部の型を表す説明専用の型エイリアスである。

要素型が`std::complex<U>`のとき、`simd-complex-value-type<V>`は`U`（`V::value_type::value_type`）となる。[`real`](real.md)・[`imag`](imag.md)・[`norm`](norm.md)・[`arg`](arg.md)などの戻り値型（実数型の[`basic_vec`](basic_vec.md)）を表すために使用され、説明専用コンセプト[`simd-complex`](simd-complex.md)の定義にも用いられる。

## バージョン
### 言語
- C++26

## 関連項目
- [`std::simd::simd-complex`](simd-complex.md)
- [`std::simd::real`](real.md)
- [`std::simd::imag`](imag.md)

## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
