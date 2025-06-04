# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* slide_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<class R>
  slide_view(R&&, range_difference_t<R>) -> slide_view<views::all_t<R>>;
}
```

## 概要
`slide_view`クラステンプレートの型推論補助。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <type_traits>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5, 6};
  
  // slide_viewの型を明示的に指定する必要がない
  std::ranges::slide_view sv{v, 3};
  
  // 推論された型を確認
  static_assert(std::same_as<
    decltype(sv),
    std::ranges::slide_view<std::ranges::ref_view<std::vector<int>>>
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
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 3 [mark verified]
