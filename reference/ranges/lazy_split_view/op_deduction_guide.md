# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* lazy_split_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class R, class P>
  lazy_split_view(R&&, P&&)
    -> lazy_split_view<
         views::all_t<R>,
         views::all_t<P>
       >;                  // (1) C++20

  template<input_range R>
  lazy_split_view(R&&, range_value_t<R>)
    -> lazy_split_view<
         views::all_t<R>,
         single_view<range_value_t<R>>
       >;                  // (2) C++20
}
```
* single_view[link /reference/ranges/single_view.md]

## 概要

[`lazy_split_view`](../lazy_split_view.md)クラステンプレートの型推論補助。

- (1) : 元のRangeとパターンが暗黙的に[all view](../all.md)でラップされる
- (2) : 元のRangeが[all view](../all.md)、区切り要素が[`single_view`](../single_view.md)でラップされる


## 例
```cpp example
#include <ranges>
#include <vector>
#include <concepts>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9};
  std::vector<int> pattern = {4, 5};

  // Rangeとパターン
  std::ranges::lazy_split_view r1{v, pattern};
  static_assert(std::same_as<
    decltype(r1),
    std::ranges::lazy_split_view<
      std::ranges::ref_view<std::vector<int>>,
      std::ranges::ref_view<std::vector<int>>
    >
  >);

  // Rangeと区切り要素
  std::ranges::lazy_split_view r2{v, 5};
  static_assert(std::same_as<
    decltype(r2),
    std::ranges::lazy_split_view<
      std::ranges::ref_view<std::vector<int>>,
      std::ranges::single_view<int>
    >
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
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]