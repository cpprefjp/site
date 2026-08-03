# explicitly-convertible-to
* [meta exposition-only]
* simd[meta header]
* concept[meta id-type]
* std::simd[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class From, class To>
  concept explicitly-convertible-to =
    requires {
      static_cast<To>(declval<From>());
    };
}
```
* declval[link /reference/utility/declval.md]

## 概要
`explicitly-convertible-to`は、型`From`の値が型`To`へ明示的に変換可能（`static_cast<To>`が適格）であることを表す説明専用のコンセプトである。

[`basic_vec`](basic_vec.md)の変換コンストラクタなど、要素型どうしの明示的な変換を要求する箇所のテンプレートパラメータ制約として使用される。

## バージョン
### 言語
- C++26

## 関連項目
- [`std::simd::basic_vec`](basic_vec.md)

## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
