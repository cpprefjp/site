# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<class R>
  as_const_view(R&&) -> as_const_view<views::all_t<R>>;
}
```
* as_const_view[link ../as_const_view.md]
* all_t[link /reference/ranges/all.md]

## 概要

[`as_const_view`](../as_const_view.md)クラステンプレートの型推論補助。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <concepts>

int main() {
  std::vector<int> vec = {1, 2, 3, 4};

  std::ranges::as_const_view v1{vec};
  
  static_assert(std::same_as<
    decltype(v1),
    std::ranges::as_const_view<std::ranges::ref_view<std::vector<int>>>
  >);

  std::ranges::as_const_view v2{std::vector<int>{1, 2}};
  
  static_assert(std::same_as<
    decltype(v2),
    std::ranges::as_const_view<std::ranges::owning_view<std::vector<int>>>
  >);
}
```
* ref_view[link /reference/ranges/ref_view.md]
* owning_view[link /reference/ranges/owning_view.md]

### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]

## 参照

- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)

