# cend
* ranges[meta header]
* std::ranges[meta namespace]
* view_interface[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto cend()
  requires input_range<D>;       // (1)

constexpr auto cend() const
  requires input_range<const D>; // (2)
```
* input_range[link ../input_range.md]

## 概要

Rangeの定数イテレータに対応する番兵を取得する。

## 戻り値

(1)、(2)共に、以下と等価

```cpp
return ranges::cend(derived());
```
* ranges::cend[link ../cend.md]
* derived[link derived.md]

## 計算量
償却定数時間

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]

## 参照

- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
