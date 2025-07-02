# enable_borrowed_range
* ranges[meta header]
* std::ranges[meta namespace]
* variable[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class T>
  inline constexpr bool enable_borrowed_range<empty_view<T>> = true;
}
```

## 概要

`empty_view`に対する[`enable_borrowed_range`](../enable_borrowed_range.md)の特殊化。

`empty_view`は常に空であり、要素への参照を返すことがないため、安全に借用可能である。

## 備考

この特殊化により、`empty_view`は[`borrowed_range`](../borrowed_range.md)コンセプトを満たすようになる。

## 例
```cpp example
#include <ranges>
#include <type_traits>

int main() {
  // empty_viewはborrowed_rangeである
  static_assert(std::ranges::borrowed_range<std::ranges::empty_view<int>>);
  
  // enable_borrowed_rangeがtrueに設定されている
  static_assert(std::ranges::enable_borrowed_range<std::ranges::empty_view<int>>);
}
```
* std::ranges::borrowed_range[link ../borrowed_range.md]
* std::ranges::enable_borrowed_range[link ../enable_borrowed_range.md]

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

## 参照
- [N4861 24.7.8 Empty view](https://timsong-cpp.github.io/cppwp/n4861/range.empty)