# math-floating-point
* [meta exposition-only]
* simd[meta header]
* concept[meta id-type]
* std::simd[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class T>
  concept math-floating-point =
    simd-floating-point<deduced-vec-t<T>>;
}
```
* deduced-vec-t[link /reference/simd/deduced-vec-t.md]
* simd-floating-point[link simd-floating-point.md]

## 概要
`math-floating-point`は、型`T`から導出されるデータ並列型（説明専用の`deduced-vec-t<T>`）が、浮動小数点数を要素とする[`basic_vec`](basic_vec.md)（[`simd-floating-point`](simd-floating-point.md)）であることを表す説明専用のコンセプトである。

`deduced-vec-t<T>`は、`T`が[`basic_vec`](basic_vec.md)であればそのまま`T`を、`T`が浮動小数点数のスカラー型であれば対応する要素数1の`basic_vec`を表す。これにより、[`exp`](exp.md)・[`sin`](sin.md)・[`sqrt`](sqrt.md)などの数学関数を、データ並列型とスカラーの両方で共通のインタフェースとして呼び出せる。`std::simd`の数学関数のほとんどは、このコンセプトをテンプレートパラメータ制約として使用する。

## バージョン
### 言語
- C++26

## 関連項目
- [`std::simd::simd-floating-point`](simd-floating-point.md)
- [`std::simd::simd-vec-type`](simd-vec-type.md)

## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
