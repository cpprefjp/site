# end
* ranges[meta header]
* std::ranges[meta namespace]
* stride_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto end()
  requires (!simple-view<V>); // (1) C++23

constexpr auto end() const
  requires range<const V>;    // (2) C++23
```

## 概要

番兵またはイテレータを取得する。

## 効果

`common_range<V>`の場合：
- (1) : `return iterator<false>(this, ranges::end(base_));`
- (2) : `return iterator<true>(this, ranges::end(base_));`

それ以外の場合：
- (1) : `return default_sentinel;`
- (2) : `return default_sentinel;`

ここで、`iterator`は説明専用のイテレータクラスである。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <print>

int main() {
  std::vector<int> v = {0, 1, 2, 3, 4, 5, 6, 7, 8};
  
  std::ranges::stride_view sv{v, 3};
  
  // イテレータ範囲で全要素を出力
  for (auto it = sv.begin(); it != sv.end(); ++it) {
    std::println("{}", *it);
  }
}
```
* end[color ff0000]
* begin[link begin.md]

### 出力
```
0
3
6
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 13.2 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 4 [mark verified]

## 参照
- [N4950 26.7.32 Stride view](https://timsong-cpp.github.io/cppwp/n4950/range.stride)
