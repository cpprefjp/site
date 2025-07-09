# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* stride_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<class R>
  stride_view(R&&, range_difference_t<R>) -> stride_view<views::all_t<R>>;
}
```

## 概要
`stride_view`クラステンプレートの型推論補助。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <type_traits>

int main() {
  std::vector<int> v = {0, 1, 2, 3, 4, 5, 6, 7, 8};
  
  // stride_viewの型を明示的に指定する必要がない
  std::ranges::stride_view sv{v, 3};
  
  // 推論された型を確認
  static_assert(std::same_as<
    decltype(sv),
    std::ranges::stride_view<std::ranges::ref_view<std::vector<int>>>
  >);
}
```
* std::ranges::stride_view[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 13.2 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 4 [mark verified]
