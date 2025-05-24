# operator []
* ranges[meta header]
* std::ranges[meta namespace]
* view_interface[meta class]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
template<random_access_range R = D>
constexpr decltype(auto) operator[](range_difference_t<R> n)       // (1)

template<random_access_range R = const D>
constexpr decltype(auto) operator[](range_difference_t<R> n) const // (2)
```
* random_access_range[link ../random_access_range.md]
* range_difference_t[link ../range_difference_t.md]

## 概要
Rangeの要素にアクセスする。

## テンプレートパラメータ制約
`R`が[`random_access_range`](../random_access_range.md)であること。

## 戻り値
(1), (2)共に、以下と等価：

```cpp
ranges::begin(derived())[n];
```
* ranges::begin[link ../begin.md]
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
