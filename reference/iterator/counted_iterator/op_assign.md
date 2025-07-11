# operator=
* iterator[meta header]
* std[meta namespace]
* counted_iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
template<class I2>
  requires assignable_from<I&, const I2&>
constexpr counted_iterator& operator=(const counted_iterator<I2>& x);
```
* assignable_from[link /reference/concepts/assignable_from.md]

## 概要

`counted_iterator`オブジェクトをコピー代入する。

## 効果

`I`の値`current`メンバ変数、カウントの値を`length`メンバ変数に保持するとする。

`current`を`x.current`から、`length`を`x.length`からコピー代入する。

## 戻り値

`*this`

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 8 [mark verified]

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
