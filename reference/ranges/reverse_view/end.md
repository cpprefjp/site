# end
* ranges[meta header]
* std::ranges[meta namespace]
* reverse_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr reverse_iterator<iterator_t<V>> end();  // (1) C++20

constexpr auto end() const
  requires common_range<const V>;                 // (2) C++20
```
* reverse_iterator[link /reference/iterator/reverse_iterator.md]

## 概要

番兵を取得する。

## 効果

- (1) : `return make_reverse_iterator(ranges::begin(base_));`
- (2) : `return make_reverse_iterator(ranges::begin(base_));`

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5};
  
  std::ranges::reverse_view rv(vec);
  
  auto begin = rv.begin();
  auto end = rv.end();
  
  // 逆順に全要素を出力
  for (auto it = begin; it != end; ++it) {
    std::cout << *it << " ";
  }
  std::cout << std::endl;
  
  // const版
  const auto& crv = rv;
  auto cbegin = crv.begin();
  auto cend = crv.end();
  for (auto it = cbegin; it != cend; ++it) {
    std::cout << *it << " ";
  }
  std::cout << std::endl;
}
```
* end[color ff0000]
* begin[link begin.md]

### 出力
```
5 4 3 2 1 
5 4 3 2 1 
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
- [N4861 24.7.6.1 Overview](https://timsong-cpp.github.io/cppwp/n4861/range.reverse.view)