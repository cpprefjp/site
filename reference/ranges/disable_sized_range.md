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

`disable_sized_range`は、[`sized_range`](sized_range.md.nolink)を無効化するカスタマイゼーションポイントである。

[`sized_range`](sized_range.md.nolink)コンセプトの構文要件を満たすが意味論要件を満たさないような型`T`があるとき、`disable_sized_range<T>`が`true`となるように特殊化することで[`sized_range`](sized_range.md.nolink)を無効化する。

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
