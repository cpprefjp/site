# data
* ranges[meta header]
* std::ranges[meta namespace]
* view_interface[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto data()
  requires contiguous_iterator<iterator_t<D>>;  // (1)

constexpr auto data() const
  requires range<const D> && contiguous_iterator<iterator_t<const D>>; // (2)
```

## 概要
Rangeの要素へのポインタを取得する。

## テンプレートパラメータ制約
[`view_interface`](../view_interface.md)`<D>`に対して、

- (1): `D`のイテレータが[`contiguous_iterator`](/reference/iterator/contiguous_iterator.md)であること。
- (2): `const D`が[`range`](../range.md)かつ`const D`のイテレータが[`contiguous_iterator`](/reference/iterator/contiguous_iterator.md)であること。

## 戻り値
(1), (2)共に、以下と等価：

```cpp
to_address(ranges::begin(derived()));
```
* to_address[link /reference/memory/to_address.md]
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
