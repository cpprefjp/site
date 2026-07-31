# real-type
* [meta exposition-only]
* simd[meta header]
* std::simd[meta namespace]
* basic_vec[meta class]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class T, class Abi>
  class basic_vec {
    using real-type = /*see below*/;
  };
}
```

## 概要
`real-type`は、[`basic_vec`](../basic_vec.md)の説明専用のメンバ型エイリアスである。

要素型`T`が[`std::complex`](/reference/complex/complex.md)の特殊化のとき、`real-type`は[`rebind_t`](../rebind.md)`<typename T::value_type, basic_vec<T, Abi>>`（要素型を`complex<U>`から実数型`U`に置き換えた[`basic_vec`](../basic_vec.md)）と同じ型を表す。それ以外の場合は、未規定の非配列オブジェクト型を表す。

複素数を要素とする[`basic_vec`](../basic_vec.md)の実部・虚部を扱う[コンストラクタ](op_constructor.md)や、[`real`](real.md)・[`imag`](imag.md)メンバ関数の引数型・戻り値型として使用される。

## バージョン
### 言語
- C++26

## 関連項目
- [`std::simd::basic_vec`](../basic_vec.md)
- [`std::simd::basic_vec::real`](real.md)
- [`std::simd::basic_vec::imag`](imag.md)
- [`std::simd::rebind`](../rebind.md)

## 参照
- [P2663R7 Interleaved complex values support in std::simd](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2663r7.html)
    - 複素数を要素とする`basic_vec`のサポートが追加された
