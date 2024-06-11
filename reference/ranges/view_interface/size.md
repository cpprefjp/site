# size
* ranges[meta header]
* std::ranges[meta namespace]
* view_interface[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto size()
  requires forward_range<D> && sized_sentinel_for<sentinel_t<D>, iterator_t<D>>;                   // (1)

constexpr auto size() const
  requires forward_range<const D> && sized_sentinel_for<sentinel_t<const D>, iterator_t<const D>>; // (2)
```
* forward_range[link ../forward_range.md]
* sentinel_t[link ../sentinel_t.md]
* iterator_t[link ../iterator_t.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]

## 概要
Rangeの大きさを取得する。

## テンプレートパラメータ制約
[`view_interface`](../view_interface.md)`<D>`に対して、

- (1): `D`が[`forward_range`](../forward_range.md)であり、`D`のイテレータ`I`と番兵`S`が[`sized_sentinel_for`](/reference/iterator/sized_sentinel_for.md)を満たすこと。
- (2): `const D`が[`forward_range`](../forward_range.md)であり、`const D`のイテレータ`I`と番兵`S`が[`sized_sentinel_for`](/reference/iterator/sized_sentinel_for.md)を満たすこと。

## 戻り値
(1)、(2)共に、以下と等価：

```cpp
ranges::end(derived()) - ranges::begin(derived());
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
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
