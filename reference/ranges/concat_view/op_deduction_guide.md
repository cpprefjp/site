# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::ranges {
  template<class... Rs>
  concat_view(Rs&&...) -> concat_view<views::all_t<Rs>...>;
}
```

## 概要

[`concat_view`](../concat_view.md)クラステンプレートの型推論補助。

この推論補助によって、渡されたRangeが暗黙的に[all view](../all.md)でラップされる。

## 例
```cpp example
#include <concepts>
#include <ranges>
#include <array>
#include <vector>

int main() {
  std::vector<int> v1{1, 2, 3};
  std::vector<int> v2{4, 5};
  std::array<int, 3> a{6, 7, 8};

  std::ranges::concat_view r1{v1, v2, a};
  static_assert(std::same_as<
    decltype(r1),
    std::ranges::concat_view<
      std::ranges::ref_view<std::vector<int>>,
      std::ranges::ref_view<std::vector<int>>,
      std::ranges::ref_view<std::array<int, 3>>
    >
  >);

  std::ranges::concat_view r2{
    std::vector<int>{1, 2, 3},
    std::vector<int>{4, 5},
    std::array<int, 3>{6, 7, 8}
  };
  static_assert(std::same_as<
    decltype(r2),
    std::ranges::concat_view<
      std::ranges::owning_view<std::vector<int>>,
      std::ranges::owning_view<std::vector<int>>,
      std::ranges::owning_view<std::array<int, 3>>
    >
  >);
}
```

### 出力
```
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 20 [mark noimpl]
- [GCC](/implementation.md#gcc): 15 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 14 [mark noimpl]
