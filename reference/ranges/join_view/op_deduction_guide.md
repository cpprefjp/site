# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* join_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class R>
  join_view(R&&) -> join_view<views::all_t<R>>;
}
```

## 概要

[`join_view`](../join_view.md)クラステンプレートの型推論補助。

この推論補助によって、元のRangeが暗黙的に[all view](../all.md)でラップされる。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <string>
#include <concepts>

int main() {
  std::vector<std::string> words = {"hello", "world", "join"};

  std::ranges::join_view r1{words};
  static_assert(std::same_as<
    decltype(r1),
    std::ranges::join_view<std::ranges::ref_view<std::vector<std::string>>>
  >);

  std::ranges::join_view r2{std::vector<std::string>{"a", "b", "c"}};
  static_assert(std::same_as<
    decltype(r2),
    std::ranges::join_view<std::ranges::owning_view<std::vector<std::string>>>
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