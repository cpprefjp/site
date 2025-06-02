# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class R, class Pred>
  take_while_view(R&&, Pred) -> take_while_view<views::all_t<R>, Pred>;
}
```

## 概要

[`take_while_view`](../take_while_view.md)クラステンプレートの型推論補助。

この推論補助によって、元のRangeが暗黙的に[all view](../all.md)でラップされる。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <concepts>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
  auto pred = [](int x) { return x < 6; };

  std::ranges::take_while_view r1{vec, pred};
  static_assert(std::same_as<
    decltype(r1),
    std::ranges::take_while_view<std::ranges::ref_view<std::vector<int>>, decltype(pred)>
  >);

  std::ranges::take_while_view r2{std::vector<int>{1, 2, 3, 4, 5}, pred};
  static_assert(std::same_as<
    decltype(r2),
    std::ranges::take_while_view<std::ranges::owning_view<std::vector<int>>, decltype(pred)>
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