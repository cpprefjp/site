# get
* variant[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <size_t I, class... Types>
  constexpr variant_alternative_t<I, variant<Types...>>&
    get(variant<Types...>& v);                                   // (1)

  template <size_t I, class... Types>
  constexpr variant_alternative_t<I, variant<Types...>>&&
    get(variant<Types...>&& v);                                  // (2)

  template <size_t I, class... Types>
  constexpr const variant_alternative_t<I, variant<Types...>>&
    get(const variant<Types...>& v);                             // (3)

  template <size_t I, class... Types>
  constexpr const variant_alternative_t<I, variant<Types...>>&&
    get(const variant<Types...>&& v);                            // (4)

  template <class T, class... Types>
  constexpr T& get(variant<Types...>& v);                        // (5)

  template <class T, class... Types>
  constexpr T&& get(variant<Types...>&& v);                      // (6)

  template <class T, class... Types>
  constexpr const T& get(const variant<Types...>& v);            // (7)

  template <class T, class... Types>
  constexpr const T&& get(const variant<Types...>&& v);          // (8)
}
```
* size_t[link /reference/cstddef/size_t.md]
* variant_alternative_t[link /reference/variant/variant_alternative.md]

## 概要
`variant`オブジェクトから、指定したインデックスもしくは型の値を取得する。

- (1) : 非`const`左辺値の`variant`オブジェクトから、候補型のインデックスを指定して値を取得する
- (2) : 非`const`右辺値の`variant`オブジェクトから、候補型のインデックスを指定して値を取得する
- (3) : `const`左辺値の`variant`オブジェクトから、候補型のインデックスを指定して値を取得する
- (4) : `const`右辺値の`variant`オブジェクトから、候補型のインデックスを指定して値を取得する
- (5) : 非`const`左辺値の`variant`オブジェクトから、候補型を指定して値を取得する
- (6) : 非`const`右辺値の`variant`オブジェクトから、候補型を指定して値を取得する
- (7) : `const`左辺値の`variant`オブジェクトから、候補型を指定して値を取得する
- (8) : `const`右辺値の`variant`オブジェクトから、候補型を指定して値を取得する


## 要件
- (1), (2), (3), (4) : `I < sizeof...(Types)`であること。そうでなければプログラムは不適格となる
- (5), (6), (7), (8) : `Types...`内に型`T`が正確にひとつ含まれること。そうでなければプログラムは不適格となる


## 戻り値
- (1), (2), (3), (4) : [`v.index()`](index.md)と`I`が等値である場合、`variant`オブジェクトに保持されている`I`番目の候補型の値を返す。そうでなければ、[`std::bad_variant_access`](/reference/variant/bad_variant_access.md.nolink)例外を送出する
- (5), (6), (7), (8) : `v`が`T`型の値を保持している場合、その値への参照を返す。そうでなければ、[`std::bad_variant_access`](/reference/variant/bad_variant_access.md.nolink)例外を送出する


## 例外
- (1), (2), (3), (4) : 指定したインデックスの型が`v`オブジェクトに保持されていない場合、[`std::bad_variant_access`](/reference/variant/bad_variant_access.md.nolink)例外を送出する
- (5), (6), (7), (8) : 指定した型が`v`オブジェクトに保持されていない場合、[`std::bad_variant_access`](/reference/variant/bad_variant_access.md.nolink)例外を送出する


## 例
```cpp example
```

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
