# begin
* ranges[meta header]
* std::ranges[meta namespace]
* chunk_by_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr iterator begin();            // (1) C++23

constexpr const_iterator begin() const
  requires forward_range<const V>;     // (2) C++23
```
* iterator[italic]
* const_iterator[italic]

## 概要

先頭要素を指すイテレータを取得する。

## 効果

- (1) : `return iterator(*this, ranges::begin(base_));`
- (2) : `return const_iterator(*this, ranges::begin(base_));`

ここで、`iterator`と`const_iterator`は説明専用のイテレータクラスである。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <functional>
#include <print>

int main() {
  std::vector<int> v = {1, 2, 2, 3, 0, 4, 5, 2};
  
  std::ranges::chunk_by_view cv{v, std::ranges::less_equal{}};
  
  auto it = cv.begin();
  
  // 最初のチャンクを出力
  std::println("{}", *it);
}
```
* begin[color ff0000]

### 出力
```
[1, 2, 2, 3]
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 14.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 3 [mark verified]

## 参照
- [N4950 26.7.30 Chunk by view](https://timsong-cpp.github.io/cppwp/n4950/range.chunk.by)