# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* take_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class R>
  take_view(R&&, range_difference_t<R>) -> take_view<views::all_t<R>>;
}
```

## 概要

[`take_view`](../take_view.md)クラステンプレートの型推論補助。

この推論補助によって、元のRangeが暗黙的に[all view](../all.md)でラップされる。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <concepts>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

  std::ranges::take_view r1{vec, 5};
  static_assert(std::same_as<
    decltype(r1),
    std::ranges::take_view<std::ranges::ref_view<std::vector<int>>>
  >);

  std::ranges::take_view r2{std::vector<int>{1, 2, 3, 4, 5}, 3};
  static_assert(std::same_as<
    decltype(r2),
    std::ranges::take_view<std::ranges::owning_view<std::vector<int>>>
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
