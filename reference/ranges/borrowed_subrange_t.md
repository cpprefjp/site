# borrowed_subrange_t
* ranges[meta header]
* std::ranges[meta namespace]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<range R>
  using borrowed_subrange_t = conditional_t<borrowed_range<R>, subrange<iterator_t<R>>, dangling>;
}
```
* conditional_t[link /reference/type_traits/conditional.md]
* borrowed_range[link borrowed_range.md]
* subrange[link subrange.md.nolink]
* iterator_t[link iterator_t.md]
* dangling[link dangling.md]

## 概要

任意の範囲型`R`の部分範囲の型を取得する。ただし、`R`が[`borrowed_range`](borrowed_range.md)ではない場合、[`dangling`](dangling.md)になる。

## 例
```cpp example
```
* std::ranges::# borrowed_subrange_t[color ff0000]

### 出力
```
```

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
