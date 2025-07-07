# operator*
* iterator[meta header]
* std[meta namespace]
* common_iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
decltype(auto) operator*();
decltype(auto) operator*() const requires dereferenceable<const I>;
```
* dereferenceable[link /reference/iterator/dereferenceable.md]

## 概要
イテレータを間接参照する。

## 事前条件

[`holds_alternative`](/reference/variant/holds_alternative.md)`<I>(v_) == true`

## 戻り値

`I, S`の値のどちらかを[`variant<I, S>`](/reference/variant/variant.md)型のメンバ変数`v_`に保持しているとして、以下と等価。

`return *get<I>(v_);`

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <ranges>

int main() {
  auto seq = std::views::iota(1) | std::views::take(5);

  // common_iteratorを通すことでイテレータ型と番兵型を合わせる
  using CI = std::common_iterator<std::ranges::iterator_t<decltype(seq)>, std::ranges::sentinel_t<decltype(seq)>>;

  CI ci{std::ranges::begin(seq)};
  
  std::cout << *ci << std::endl;
  
  ++ci;
  
  std::cout << *ci << std::endl;
}
```
* *ci[color ff0000]
* views::iota[link /reference/ranges/iota_view.md]
* views::take[link /reference/ranges/take_view.md]

### 出力
```
1
2
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 9 [mark verified]

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
