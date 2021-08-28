# enable_borrowed_range
* ranges[meta header]
* std::ranges[meta namespace]
* variable[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class T>
  inline constexpr bool enable_borrowed_range = false;
}
```

## 概要

`enable_borrowed_range<T>`が`true`であることは、`T`が[`borrowed_range`](borrowed_range.md)であるための必要条件である。

[`borrowed_range`](borrowed_range.md)コンセプトの要件は意味論要件がメインなため、`enable_borrowed_range`を特殊化することで、明示的に`borrowed_range`であることを示すようになっている。

## 例

(執筆中)

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
