# is-integer-like
* iterator[meta header]
* std[meta namespace]
* variable[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T>
  inline constexpr bool is-integer-like = /*see below*/;

  template<class T>
  inline constexpr bool is-signed-integer-like = /*see below*/;
}
```

## 概要

これらの説明専用の変数テンプレートは、任意の型`T`が符号付/なし整数型そのものあるいはそれと同様に扱える型である場合に`true`を示すものである。

これは標準ライブラリ内において、イテレータの差分型（`difference_type`）としてユーザー定義の整数型の使用を許可するためにコンセプトの文脈で使用される。

## バージョン
### 言語
- C++20

## 関連項目

- [`weakly_incrementable`](weakly_incrementable.md)
- [`iota_view`](/reference/ranges/iota_view.md.nolink)

## 参照

- [P1522R1 Iterator Difference Type and Integer Overflow](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1522r1.pdf)
