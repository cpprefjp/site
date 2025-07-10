# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* join_with_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<class R, class P>
  join_with_view(R&&, P&&) -> join_with_view<views::all_t<R>, views::all_t<P>>;
}
```

## 概要

[`join_with_view`](../join_with_view.md)クラステンプレートの型推論補助。

この推論補助によって、元のRangeとパターンが暗黙的に[all view](../all.md)でラップされる。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <string>
#include <concepts>

int main() {
  std::vector<std::string> words = {"hello", "world", "join"};
  std::string delimiter = "-";

  std::ranges::join_with_view r1{words, delimiter};
  static_assert(std::same_as<
    decltype(r1),
    std::ranges::join_with_view<
      std::ranges::ref_view<std::vector<std::string>>,
      std::ranges::ref_view<std::string>
    >
  >);

  std::ranges::join_with_view r2{
    std::vector<std::string>{"a", "b", "c"},
    std::string{"--"}
  };
  static_assert(std::same_as<
    decltype(r2),
    std::ranges::join_with_view<
      std::ranges::owning_view<std::vector<std::string>>,
      std::ranges::owning_view<std::string>
    >
  >);
}
```

### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
