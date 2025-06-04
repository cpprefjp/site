# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* enumerate_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<class R>
  enumerate_view(R&&) -> enumerate_view<views::all_t<R>>;
}
```

## 概要
`enumerate_view`クラステンプレートの型推論補助。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <type_traits>

int main() {
  std::vector<char> v = {'a', 'b', 'c'};
  
  // enumerate_viewの型を明示的に指定する必要がない
  std::ranges::enumerate_view ev{v};
  
  // 推論された型を確認
  static_assert(std::same_as<
    decltype(ev),
    std::ranges::enumerate_view<std::ranges::ref_view<std::vector<char>>>
  >);
}
```
* std::ranges::enumerate_view[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 7 [mark verified]
