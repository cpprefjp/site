# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* cartesian_product_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<class... Rs>
  cartesian_product_view(Rs&&...) -> cartesian_product_view<views::all_t<Rs>...>;
}
```

## 概要
`cartesian_product_view`クラステンプレートの型推論補助。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <list>
#include <type_traits>

int main() {
  std::vector<int> v = {1, 2};
  std::list<char> l = {'a', 'b'};
  
  // cartesian_product_viewの型を明示的に指定する必要がない
  std::ranges::cartesian_product_view cv{v, l};
  
  // 推論された型を確認
  static_assert(std::same_as<
    decltype(cv),
    std::ranges::cartesian_product_view<
      std::ranges::ref_view<std::vector<int>>,
      std::ranges::ref_view<std::list<char>>
    >
  >);
}
```
* std::ranges::cartesian_product_view[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 13.2 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 7 [mark verified]
