# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* subrange[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<input_or_output_iterator I, sentinel_for<I> S>
  subrange(I, S) -> subrange<I, S>;

  template<input_or_output_iterator I, sentinel_for<I> S>
  subrange(I, S, make-unsigned-like-t<iter_difference_t<I>>) ->
    subrange<I, S, subrange_kind::sized>;

  template<borrowed_range R>
  subrange(R&&) ->
    subrange<iterator_t<R>, sentinel_t<R>, (sized_range<R> || sized_sentinel_for<sentinel_t<R>, iterator_t<R>>) ? subrange_kind::sized : subrange_kind::unsized>;

  template<borrowed_range R>
  subrange(R&&, make-unsigned-like-t<range_difference_t<R>>) ->
    subrange<iterator_t<R>, sentinel_t<R>, subrange_kind::sized>;
}
```
* subrange[link ../subrange.md]
* subrange_kind[link /reference/ranges/subrange_kind.md]
* input_or_output_iterator[link /reference/iterator/input_or_output_iterator.md]
* borrowed_range[link /reference/ranges/borrowed_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* sentinel_t[link /reference/ranges/sentinel_t.md]
* sized_range[link /reference/ranges/sized_range.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* make-unsigned-like-t[link /reference/type_traits/make_unsigned.md]

## 概要
[`subrange`](../subrange.md)クラステンプレートの型推論補助。


## 例
```cpp example
#include <ranges>
#include <concepts>

int main()
{
  int a[] = {1, 2, 3};
  std::ranges::subrange sub = a;
  static_assert(std::same_as<
    decltype(sub),
    std::ranges::subrange<int*, int*, std::ranges::subrange_kind::sized>
  >);
}
```

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 関連項目
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)

