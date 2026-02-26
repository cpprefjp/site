# operator=
* iterator[meta header]
* std[meta namespace]
* common_iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
template<class I2, class S2>
  requires convertible_to<const I2&, I> && convertible_to<const S2&, S> &&
           assignable_from<I&, const I2&> && assignable_from<S&, const S2&>
common_iterator& operator=(const common_iterator<I2, S2>& x);
```
* assignable_from[link /reference/concepts/assignable_from.md]

## 概要

`common_iterator`オブジェクトをコピー代入する。

## 堅牢化された事前条件

`x.v_.`[`valueless_by_exception`](/reference/variant/variant/valueless_by_exception.md)`() == false`であること。

## 効果

`I, S`の値のどちらかを[`variant<I, S>`](/reference/variant/variant.md)型のメンバ変数`v_`に保持しており、`i = x.v_.`[`index()`](/reference/variant/variant/index.md)として、次のどちらか

- `i == v_.index()`が`true`である場合 : `get<i>(v_) = get<i>(x.v_)`
- それ以外の場合 : `v_.`[`emplace`](/reference/variant/variant/emplace.md)`<i>(get<i>(x.v_))`

## 戻り値

`*this`

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 9 [mark verified]

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [P3697R1 Minor additions to C++26 standard library hardening](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3697r1.html)
- [P3878R1 Standard library hardening should not use the 'observe' semantic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3878r1.html)
