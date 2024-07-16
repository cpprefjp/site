# 推論補助
* ranges[meta header]
* std::ranges[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class W, class Bound>
    requires (!is-integer-like<W> || !is-integer-like<Bound> ||
              (is-signed-integer-like<W> == is-signed-integer-like<Bound>))
  iota_view(W, Bound) -> iota_view<W, Bound>;
}
```
* iota_view[link ../iota_view.md]
* is-integer-like[link /reference/iterator/is_integer_like.md]
* is-signed-integer-like[link /reference/iterator/is_integer_like.md]

## 概要
[`iota_view`](../iota_view.md)クラステンプレートの型推論補助。

## 例
```cpp example
#include <ranges>
#include <concepts>

int main()
{
  std::ranges::iota_view iota{0, 10};
  static_assert(std::same_as<
    decltype(iota),
    std::ranges::iota_view<int, int>
  >);
}
```
* std::ranges::iota_view[link ../iota_view.md]
* std::same_as[link /reference/concepts/same_as.md]

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
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)

