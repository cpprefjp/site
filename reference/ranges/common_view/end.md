# end
* ranges[meta header]
* std::ranges[meta namespace]
* common_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto end();      // (1) C++20
constexpr auto end() const
  requires range<const V>; // (2) C++20
```

## 概要

番兵を取得する。

## 効果

- (1) :
    ```cpp
    if constexpr (random_access_range<V> && sized_range<V>)
      return ranges::begin(base_) + ranges::size(base_);
    else
      return common_iterator<iterator_t<V>, sentinel_t<V>>(ranges::end(base_));
    ```
  
- (2) :
    ```cpp
    if constexpr (random_access_range<const V> && sized_range<const V>)
      return ranges::begin(base_) + ranges::size(base_);
    else
      return common_iterator<iterator_t<const V>, sentinel_t<const V>>(ranges::end(base_));
    ```


## 例
```cpp example
#include <ranges>
#include <vector>
#include <algorithm>
#include <iostream>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5};
  
  // common_rangeではないviewを作成
  auto taken = vec | std::views::take(3);
  
  // common_viewでラップ
  std::ranges::common_view cv(taken);
  
  // begin()とend()が同じ型を返す
  auto begin = cv.begin();
  auto end = cv.end();
  static_assert(std::same_as<decltype(begin), decltype(end)>);
  
  // レガシーアルゴリズムに渡せる
  std::for_each(begin, end, [](int n) {
    std::cout << n << " ";
  });
  std::cout << std::endl;
}
```
* end[color ff0000]
* begin[link begin.md]
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