# end
* ranges[meta header]
* std::ranges[meta namespace]
* adjacent_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto end()
  requires (!simple-view<V>);                              // (1) C++23

constexpr auto end() const
  requires range<const V>;                                 // (2) C++23
```

## 概要

番兵を取得する。

## 効果

`common_range<V>`が`true`の場合：

- (1) : `return iterator<false>(as-sentinel{ranges::end(base_)}, ranges::begin(base_), ranges::end(base_));`
- (2) : `return iterator<true>(as-sentinel{ranges::end(base_)}, ranges::begin(base_), ranges::end(base_));`

それ以外の場合：

- (1) : `return sentinel<false>(ranges::end(base_));`
- (2) : `return sentinel<true>(ranges::end(base_));`

ここで、`iterator`と`sentinel`は`adjacent_view`の内部で定義される説明専用のクラスであり、`as-sentinel`は説明専用の空クラスである。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};
  
  std::ranges::adjacent_view<std::views::all_t<std::vector<int>&>, 3> av(v);
  
  auto begin = av.begin();
  auto end = av.end();
  
  // 全要素を出力
  for (auto it = begin; it != end; ++it) {
    auto [a, b, c] = *it;
    std::cout << a << ", " << b << ", " << c << std::endl;
  }
}
```
* end[color ff0000]
* begin[link begin.md]

### 出力
```
1, 2, 3
2, 3, 4
3, 4, 5
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 19 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 7 [mark verified]

## 参照
- [N4950 26.7.27 Adjacent view](https://timsong-cpp.github.io/cppwp/n4950/range.adjacent)