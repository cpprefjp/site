# operator=
* iterator[meta header]
* std[meta namespace]
* move_sentinel[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
template<class S2>
  requires assignable_from<S&, const S2&>
constexpr move_sentinel& operator=(const move_sentinel<S2>& s);
```
* assignable_from[link /reference/concepts/assignable_from.md]

## 概要

`move_sentinel`オブジェクトをコピー代入する。

## 効果

`S`の番兵オブジェクトを`last`というメンバ変数に保持しているとすると、以下と等価

```cpp
last = s.last;
return *this;
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 7 [mark verified]

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
