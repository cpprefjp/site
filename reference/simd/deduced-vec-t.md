# deduced-vec-t
* [meta exposition-only]
* simd[meta header]
* type-alias[meta id-type]
* std::simd[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class T>
  using deduced-vec-t = /*see below*/;
}
```

## 概要
`deduced-vec-t`は、型`T`から導出されるデータ並列型を表す説明専用の型エイリアスである。

`x`を型`const T`の左辺値とするとき、`deduced-vec-t<T>`は`decltype(x + x)`のエイリアスである。これにより、次のように振る舞う。

- `T`が[`basic_vec`](basic_vec.md)であれば、その`T`自身
- `T`がスカラーの算術型であれば、それを要素型とする既定ABI（[`native-abi`](native-abi.md)）の[`basic_vec`](basic_vec.md)

数学関数（[`exp`](exp.md)・[`sin`](sin.md)など）は、この型エイリアスを引数型や戻り値型に用いることで、データ並列型とスカラーの両方を統一的に扱う。説明専用コンセプト[`math-floating-point`](math-floating-point.md)の定義にも使用される。

## バージョン
### 言語
- C++26

## 関連項目
- [`std::simd::basic_vec`](basic_vec.md)
- [`std::simd::math-floating-point`](math-floating-point.md)
- [`std::simd::native-abi`](native-abi.md)

## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
