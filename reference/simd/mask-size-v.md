# mask-size-v
* [meta exposition-only]
* simd[meta header]
* variable[meta id-type]
* std::simd[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<std::size_t Bytes, class Abi>
  constexpr simd-size-type mask-size-v = /*see below*/;
}
```
* simd-size-type[link simd-size-type.md]

## 概要
`mask-size-v`は、[`basic_mask`](basic_mask.md)`<Bytes, Abi>`の幅（要素数）を表す説明専用の変数テンプレートである。

`basic_mask<Bytes, Abi>`が有効な特殊化であればその要素数を、そうでなければ`0`を表す。

## バージョン
### 言語
- C++26

## 関連項目
- [`std::simd::basic_mask`](basic_mask.md)
- [`std::simd::simd-size-v`](simd-size-v.md)
- [`std::simd::mask-element-size`](mask-element-size.md)

## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
