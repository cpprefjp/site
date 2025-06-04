# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* zip_transform_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<class F, class... Rs>
  zip_transform_view(F, Rs&&...) ->
    zip_transform_view<F, views::all_t<Rs>...>;
}
```

## 概要
`zip_transform_view`クラステンプレートの型推論補助。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <list>
#include <type_traits>

int main() {
  std::vector<int> v = {1, 2, 3};
  std::list<char> l = {'a', 'b', 'c'};
  
  auto f = [](int n, char c) { return std::pair{n * 10, c}; };
  
  // zip_transform_viewの型を明示的に指定する必要がない
  std::ranges::zip_transform_view ztv{f, v, l};
  
  // 推論された型を確認
  static_assert(std::same_as<
    decltype(ztv),
    std::ranges::zip_transform_view<
      decltype(f),
      std::ranges::ref_view<std::vector<int>>,
      std::ranges::ref_view<std::list<char>>
    >
  >);
}
```
* std::ranges::zip_transform_view[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 19 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]
