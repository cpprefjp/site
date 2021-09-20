# empty
* ranges[meta header]
* std::ranges[meta namespace]
* view_interface[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr bool empty()
  requires forward_range<D>;       // (1)

constexpr bool empty() const
  requires forward_range<const D>; // (2)
```
* forward_range[link ../forward_range.md]

## 概要
Rangeが空かどうかを判定する。

## テンプレートパラメータ制約
[`view_interface`](../view_interface.md)`<D>`に対して、

- (1): `D`が[`forward_range`](../forward_range.md)であること。
- (2): `const D`が[`forward_range`](../forward_range.md)であること。

## 戻り値
(1)、(2)共に、以下と等価：

```cpp
ranges::begin(derived()) == ranges::end(derived())
```
* ranges::begin[link ../begin.md]
* ranges::end[link ../end.md]
* derived[link derived.md]

## 計算量
償却定数時間

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
