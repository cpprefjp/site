# native-abi
* [meta exposition-only]
* simd[meta header]
* type-alias[meta id-type]
* std::simd[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class T>
  using native-abi = /*see below*/;
}
```

## 概要
`native-abi`は、要素型`T`に対する既定のABIタグを表す説明専用の型エイリアスである。値は処理系定義であり、`basic_vec<T, native-abi<T>>`は有効な特殊化となる。

対象システムにおいて、要素型`T`のデータ並列実行が最も効率的になるABIタグが選ばれることが意図されている。ISA拡張を持つアーキテクチャでは、コンパイラフラグによって`native-abi<T>`が指す型が変わることがある。

要素数を指定しない場合の[`vec`](basic_vec.md)・[`mask`](basic_mask.md)の既定ABIとして使用される。

## バージョン
### 言語
- C++26

## 関連項目
- [`std::simd::basic_vec`](basic_vec.md)
- [`std::simd::deduce-abi-t`](deduce-abi-t.md)

## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
