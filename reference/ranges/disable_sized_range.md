# disable_sized_range
* ranges[meta header]
* std::ranges[meta namespace]
* variable[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class>
  inline constexpr bool disable_sized_range = false;
}
```

## 概要

`disable_sized_range`は、[`sized_range`](sized_range.md)を無効化するカスタマイゼーションポイントである。

[`sized_range`](sized_range.md)コンセプトの構文要件を満たすが意味論要件を満たさないような型`T`があるとき、`disable_sized_range<T>`が`true`となるように特殊化することで[`ranges::size`](size.md)の引数にできないようにして、[`sized_range`](sized_range.md)を無効化する。

具体的には、大きさを求めることはできるが、その計算量が償却定数にならないようなRangeが該当する。

## 例

(執筆中)

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
