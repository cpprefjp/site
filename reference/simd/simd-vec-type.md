# simd-vec-type
* [meta exposition-only]
* simd[meta header]
* concept[meta id-type]
* std::simd[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class V>
  concept simd-vec-type =
    same_as<V, basic_vec<typename V::value_type, typename V::abi_type>> &&
    is_default_constructible_v<V>;
}
```
* basic_vec[link basic_vec.md]
* is_default_constructible_v[link /reference/type_traits/is_default_constructible.md]

## 概要
`simd-vec-type`は、型`V`が[`basic_vec`](basic_vec.md)の特殊化であることを表す説明専用のコンセプトである。

`V`が、自身の`value_type`と`abi_type`から構築される`basic_vec<value_type, abi_type>`と同じ型であり、かつデフォルト構築可能である場合にモデルとなる。`std::simd`の多くの関数は、このコンセプト（およびこれを土台とする[`simd-floating-point`](simd-floating-point.md)・[`simd-integral`](simd-integral.md)・[`simd-complex`](simd-complex.md)）をテンプレートパラメータ制約として使用する。

## バージョン
### 言語
- C++26

## 関連項目
- [`std::simd::basic_vec`](basic_vec.md)
- [`std::simd::simd-mask-type`](simd-mask-type.md)
- [`std::simd::simd-floating-point`](simd-floating-point.md)
- [`std::simd::simd-integral`](simd-integral.md)
- [`std::simd::simd-complex`](simd-complex.md)

## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
