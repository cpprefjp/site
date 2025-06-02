# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* common_view[meta class]
* deduction guide[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class R>
  common_view(R&&) -> common_view<views::all_t<R>>;
}
```
* views::all_t[link ../all.md]

## 概要
`common_view`クラステンプレートの型推論補助。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <type_traits>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5};
  
  // views::takeはcommon_rangeではない
  auto taken = vec | std::views::take(3);
  
  // common_viewの型を明示的に指定する必要がない
  std::ranges::common_view cv{taken};
  
  // 推論された型を確認
  static_assert(std::same_as<
    decltype(cv),
    std::ranges::common_view<std::ranges::take_view<std::ranges::ref_view<std::vector<int>>>>
  >);
}
```
* std::ranges::common_view[color ff0000]
* std::views::take[link ../take_view.md]
* std::ranges::take_view[link ../take_view.md]
* std::ranges::ref_view[link ../ref_view.md]

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

## 関連項目
- [`views::all`](../all.md)