# reduction-binary-operation
* [meta exposition-only]
* simd[meta header]
* concept[meta id-type]
* std::simd[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class BinaryOperation, class T>
  concept reduction-binary-operation =
    requires (const BinaryOperation binary_op, const vec<T, 1> v) {
      { binary_op(v, v) } -> same_as<vec<T, 1>>;
    };
}
```
* vec[link basic_vec.md]

## 概要
`reduction-binary-operation`は、型`BinaryOperation`が、要素型`T`のデータ並列型に対する[`reduce`](reduce.md)の二項演算として使用できることを表す説明専用のコンセプトである。

`vec<T, 1>`の2つの値で呼び出せて、結果が同じ`vec<T, 1>`型になる場合に、構文的な要件を満たす。

## モデル
`BinaryOperation`と`T`が`reduction-binary-operation<BinaryOperation, T>`のモデルとなるのは、上記の構文的要件に加えて、次を満たす場合に限る。

- `BinaryOperation`が要素ごとの二項演算であり、かつ可換であること
- `BinaryOperation`のオブジェクトを、未規定のABIタグ`Abi`をもつ`basic_vec<T, Abi>`型の2引数で呼び出せて、`basic_vec<T, Abi>`を返すこと

## バージョン
### 言語
- C++26

## 関連項目
- [`std::simd::reduce`](reduce.md)

## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
