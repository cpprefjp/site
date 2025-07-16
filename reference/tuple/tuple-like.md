# tuple-like
* tuple[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template <typename T>
  concept tuple-like = see below; // 説明専用コンセプト
}
```


## 概要
`tuple-like`は型`T`が[`tuple`](tuple.md)のような型であることを表現する説明専用コンセプトである。なお、[`pair`](/reference/utility/pair.md)のような型を表現する[`pair-like`](pair-like.md)も存在する。

[`array`](/reference/array/array.md)、[`pair`](/reference/utility/pair.md)、[`tuple`](tuple.md)、[`ranges::subrange`](/reference/ranges/subrange.md)らの互換性を高める（相互に構築・比較などが出来るようにする）ためなどに使用される。


## 要件
[`std::remove_cvref_t<T>`](/reference/type_traits/remove_cvref.md)が次の特殊化であること。

- [`array`](/reference/array/array.md)
- [`pair`](/reference/utility/pair.md)
- [`tuple`](tuple.md)
- [`ranges::subrange`](/reference/ranges/subrange.md)


## 備考
将来的に`std::get()`やそれに近しいカスタマイゼーションポイントオブジェクト（CPO）が定義されれば、`tuple-like`のモデルになる型は広がる可能性があるとされている。


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`pair-like`](pair-like.md)


## 参照
- [P2165R4 Compatibility between `tuple`, `pair` and *tuple-like* objects](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2165r4.pdf)
