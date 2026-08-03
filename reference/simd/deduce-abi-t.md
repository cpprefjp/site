# deduce-abi-t
* [meta exposition-only]
* simd[meta header]
* type-alias[meta id-type]
* std::simd[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class T, simd-size-type N>
  using deduce-abi-t = /*see below*/;
}
```
* simd-size-type[link simd-size-type.md]

## 概要
`deduce-abi-t`は、要素型`T`と要素数`N`から、対応するABIタグを導出する説明専用の型エイリアスである。

`T`が[「vectorizable type」](/reference/simd.md#vectorizable-type)であり、`N`が`0`より大きく処理系定義の最大値以下である場合、`deduce-abi-t<T, N>`はABIタグ型を表す。このとき[`simd-size-v`](simd-size-v.md)`<T, deduce-abi-t<T, N>>`は`N`に等しく、`basic_vec<T, deduce-abi-t<T, N>>`は有効な特殊化となる。条件を満たさない場合は未規定の型を表す。

要素数`N`を指定する[`vec`](basic_vec.md)`<T, N>`・[`mask`](basic_mask.md)の別名定義に使用される。`N`の最大値は`T`ごとに異なりうるが、64以上であることが保証される。

## バージョン
### 言語
- C++26

## 関連項目
- [`std::simd::basic_vec`](basic_vec.md)
- [`std::simd::simd-size-v`](simd-size-v.md)
- [`std::simd::native-abi`](native-abi.md)

## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
