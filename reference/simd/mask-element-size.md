# mask-element-size
* [meta exposition-only]
* simd[meta header]
* variable[meta id-type]
* std::simd[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class T>
  constexpr std::size_t mask-element-size = /*see below*/;
}
```

## 概要
`mask-element-size`は、[`basic_mask`](basic_mask.md)の要素1つが対応するバイトサイズを表す説明専用の変数テンプレートである。

`mask-element-size<basic_mask<Bytes, Abi>>`の値は`Bytes`となる。説明専用コンセプト[`simd-mask-type`](simd-mask-type.md)の定義に使用される。

## バージョン
### 言語
- C++26

## 関連項目
- [`std::simd::basic_mask`](basic_mask.md)
- [`std::simd::simd-mask-type`](simd-mask-type.md)

## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
