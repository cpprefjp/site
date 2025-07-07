# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* filter_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class R, class Pred>
  filter_view(R&&, Pred) -> filter_view<views::all_t<R>, Pred>;
}
```
* filter_view[link ../filter_view.md]

## 概要

[`filter_view`](../filter_view.md)クラステンプレートの型推論補助。

この推論補助によって、元のRangeが暗黙的に[all view](../all.md)でラップされる。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <concepts>

int main() {
  std::vector<int> vec = {1, 2, 3, 4};

  auto pred = [](int i) { return i % 2 == 0; };

  std::ranges::filter_view v1{vec, pred};
  
  static_assert(std::same_as<
    decltype(v1),
    std::ranges::filter_view<std::ranges::ref_view<std::vector<int>>>
  >);

  std::ranges::filter_view v2{std::vector<int>{1, 2}, pred};
  
  static_assert(std::same_as<
    decltype(v2),
    std::ranges::filter_view<std::ranges::owning_view<std::vector<int>>>
  >);
}
```
* owning_view[link /reference/ranges/owning_view.md]
* filter_view[link ../filter_view.md]

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

## 参照
- [N4861 24.7.4 Filter view](https://timsong-cpp.github.io/cppwp/n4861/range.filter)
- [N4950 26.7.8 Filter view](https://timsong-cpp.github.io/cppwp/n4950/range.filter)
