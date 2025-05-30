# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class R, class F>
  transform_view(R&&, F) -> transform_view<views::all_t<R>, F>;
}
```

## 概要

[`transform_view`](../transform_view.md)クラステンプレートの型推論補助。

この推論補助によって、元のRangeが暗黙的に[all view](../all.md)でラップされる。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <concepts>

int main() {
  std::vector<int> vec = {1, 2, 3, 4};
  auto fun = [](int i) { return i * 2; };

  std::ranges::transform_view r1{vec, fun};
  static_assert(std::same_as<
    decltype(r1),
    std::ranges::transform_view<std::ranges::ref_view<std::vector<int>>, decltype(fun)>
  >);

  std::ranges::transform_view r2{std::vector<int>{1, 2}, fun};
  static_assert(std::same_as<
    decltype(r2),
    std::ranges::transform_view<std::ranges::owning_view<std::vector<int>>, decltype(fun)>
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
