# back
* ranges[meta header]
* std::ranges[meta namespace]
* view_interface[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr decltype(auto) back()
  requires bidirectional_range<D> && common_range<D>;             // (1)

constexpr decltype(auto) back() const
  requires bidirectional_range<const D> && common_range<const D>; // (2)
```
* bidirectional_range[link ../bidirectional_range.md]
* common_range[link ../common_range.md]

## 概要
Rangeの末尾の要素を取得する。

## テンプレートパラメータ制約
[`view_interface`](../view_interface.md)`<D>`に対して、

- (1): `D`が[`bidirectional_range`](../bidirectional_range.md)かつ[`common_range`](../common_range.md)であること。
- (2): `const D`が[`bidirectional_range`](../bidirectional_range.md)かつ[`common_range`](../common_range.md)であること。

## 事前条件
`!`[`empty`](empty.md)`()`

## 戻り値
(1), (2)共に、以下と等価：

```cpp
*ranges::prev(ranges::end(derived()))
```
* ranges::end[link ../end.md]
* ranges::prev[link /reference/iterator/ranges_prev.md]
* derived[link derived.md]

## 計算量
償却定数時間

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
