# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* cache_latest_view[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::ranges {
  template<class R>
  cache_latest_view(R&&) -> cache_latest_view<views::all_t<R>>;
}
```

## 概要
`cache_latest_view`クラステンプレートの型推論補助。


## 例
```cpp example
#include <ranges>
#include <vector>
#include <concepts>

int main() {
  std::vector<int> v = {1, 2, 3};

  // 推論補助によりテンプレート引数を明示的に指定する必要がない
  std::ranges::cache_latest_view view{v};

  static_assert(std::same_as<
    decltype(view),
    std::ranges::cache_latest_view<std::ranges::ref_view<std::vector<int>>>
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
- [Clang](/implementation.md#clang): 21 [mark verified]
- [GCC](/implementation.md#gcc): 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]
