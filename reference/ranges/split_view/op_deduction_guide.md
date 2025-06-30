# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* split_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class R, class P>
  split_view(R&&, P&&)
    -> split_view<views::all_t<R>, views::all_t<P>>; // (1) C++20

  template<forward_range R>
  split_view(R&&, range_value_t<R>)
    -> split_view<views::all_t<R>, single_view<range_value_t<R>>>; // (2) C++20
}
```

## 概要

[`split_view`](../split_view.md)クラステンプレートの型推論補助。

- (1) : 元のRangeとパターンが暗黙的に[all view](../all.md)でラップされる
- (2) : 元のRangeが[all view](../all.md)、区切り要素が[`single_view`](../single_view.md)でラップされる

## 例
```cpp example
#include <ranges>
#include <string>
#include <concepts>

int main() {
  std::string_view text = "hello,world,split";
  std::string_view delimiter = ",";

  std::ranges::split_view r1{text, delimiter};
  static_assert(std::same_as<
    decltype(r1),
    std::ranges::split_view<
      std::string_view,
      std::string_view
    >
  >);

  std::ranges::split_view r2{
    std::string{"hello,world,split"},
    std::string{","}
  };
  static_assert(std::same_as<
    decltype(r2),
    std::ranges::split_view<
      std::ranges::owning_view<std::string>,
      std::ranges::owning_view<std::string>
    >
  >);
}
```

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]