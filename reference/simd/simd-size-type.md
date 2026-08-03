# simd-size-type
* [meta exposition-only]
* simd[meta header]
* type-alias[meta id-type]
* std::simd[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  using simd-size-type = /*see below*/;
}
```

## 概要
`simd-size-type`は、データ並列型の要素数（幅）や、要素のインデックスを表すために使用される、符号付き整数型のエイリアスである（説明専用）。

[`basic_vec`](basic_vec.md)・[`basic_mask`](basic_mask.md)の`size()`の戻り値型や、[`permute`](permute.md)のインデックス写像、[`reduce_count`](reduce_count.md)などの戻り値型として使用される。

## バージョン
### 言語
- C++26

## 関連項目
- [`std::simd::basic_vec`](basic_vec.md)
- [`std::simd::simd-size-v`](simd-size-v.md)

## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
