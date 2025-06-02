# begin
* ranges[meta header]
* std::ranges[meta namespace]
* common_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto begin();                              // (1)
constexpr auto begin() const requires range<const V>; // (2)
```
* range[link ../range.md]

## 概要

先頭を指すイテレータを取得する。

## 効果

- (1) :
  ```cpp
  if constexpr (random_access_range<V> && sized_range<V>)
    return ranges::begin(base_);
  else
    return common_iterator<iterator_t<V>, sentinel_t<V>>(ranges::begin(base_));
  ```
  * random_access_range[link ../random_access_range.md]
  * sized_range[link ../sized_range.md]
  * common_iterator[link /reference/iterator/common_iterator.md]
  * iterator_t[link ../iterator_t.md]
  * sentinel_t[link ../sentinel_t.md]
  * ranges::begin[link ../begin.md]

- (2) :
  ```cpp
  if constexpr (random_access_range<const V> && sized_range<const V>)
    return ranges::begin(base_);
  else
    return common_iterator<iterator_t<const V>, sentinel_t<const V>>(ranges::begin(base_));
  ```
  * random_access_range[link ../random_access_range.md]
  * sized_range[link ../sized_range.md]
  * common_iterator[link /reference/iterator/common_iterator.md]
  * iterator_t[link ../iterator_t.md]
  * sentinel_t[link ../sentinel_t.md]
  * ranges::begin[link ../begin.md]

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5};
  
  // common_rangeではないviewを作成
  auto taken = vec | std::views::take(3);
  static_assert(!std::ranges::common_range<decltype(taken)>);
  
  // common_viewでラップ
  std::ranges::common_view cv(taken);
  static_assert(std::ranges::common_range<decltype(cv)>);
  
  // begin()とend()が同じ型を返す
  auto it = cv.begin();
  auto end = cv.end();
  static_assert(std::same_as<decltype(it), decltype(end)>);
  
  // イテレータを使用
  for (; it != end; ++it) {
    std::cout << *it << " ";
  }
  std::cout << std::endl;
}
```
* begin[color ff0000]
* end[link end.md]
* std::ranges::common_range[link ../common_range.md]
* std::ranges::common_view[link ../common_view.md]
* std::views::take[link ../take_view.md]

### 出力
```
1 2 3 
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
- [N4861 24.7.5.1 Overview](https://timsong-cpp.github.io/cppwp/n4861/range.common.view)