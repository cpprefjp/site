# simd-size-v
* [meta exposition-only]
* simd[meta header]
* variable[meta id-type]
* std::simd[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class T, class Abi>
  constexpr simd-size-type simd-size-v = /*see below*/;
}
```
* simd-size-type[link simd-size-type.md]

## 概要
`simd-size-v`は、[`basic_vec`](basic_vec.md)`<T, Abi>`の幅（要素数）を表す説明専用の変数テンプレートである。

`basic_vec<T, Abi>`が有効な特殊化であればその要素数を、そうでなければ`0`を表す。

## バージョン
### 言語
- C++26

## 関連項目
- [`std::simd::basic_vec`](basic_vec.md)
- [`std::simd::simd-size-type`](simd-size-type.md)
- [`std::simd::mask-size-v`](mask-size-v.md)
- [`std::simd::deduce-abi-t`](deduce-abi-t.md)

## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
