# empty
* ranges[meta header]
* std::ranges[meta namespace]
* view_interface[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr bool empty()
  requires sized_range<D> || forward_range<D>;       // (1)

constexpr bool empty() const
  requires sized_range<const D> || forward_range<const D>; // (2)
```

## 概要
Rangeが空かどうかを判定する。

## テンプレートパラメータ制約
[`view_interface`](../view_interface.md)`<D>`に対して、

- (1): `D`が[`sized_range`](../sized_range.md)もしくは[`forward_range`](../forward_range.md)であること。
- (2): `const D`が[`sized_range`](../sized_range.md)もしくは[`forward_range`](../forward_range.md)であること。

## 戻り値
(1), (2)共に、以下と等価：

```cpp
ranges::begin(derived()) == ranges::end(derived())
```
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
- [LWG Issue 3715. `view_interface::empty` is overconstrained](https://cplusplus.github.io/LWG/issue3715)
