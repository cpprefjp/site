# base
* iterator[meta header]
* std[meta namespace]
* counted_iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr I base() const & requires copy_constructible<I>;  // (1)
constexpr I base() &&;  // (2)
```
* copy_constructible[link /reference/concepts/copy_constructible.md]

## 概要

メンバ変数として保持している、元のイテレータを取得する。

## 戻り値

- (1) : 元のイテレータをコピーして返す。
- (2) : 元のイテレータをムーブして返す。

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 8

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
