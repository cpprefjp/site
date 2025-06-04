# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* owning_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class R>
  owning_view(R&&) -> owning_view<R>;
}
```

## 概要
`owning_view`クラステンプレートの型推論補助。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <type_traits>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};
  
  // owning_viewの型を明示的に指定する必要がない
  std::ranges::owning_view ov{std::move(v)};
  
  // 推論された型を確認
  static_assert(std::same_as<
    decltype(ov),
    std::ranges::owning_view<std::vector<int>>
  >);
}
```
* std::ranges::owning_view[color ff0000]

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
