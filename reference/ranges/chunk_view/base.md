# base
* ranges[meta header]
* std::ranges[meta namespace]
* chunk_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr V base() const &
  requires copy_constructible<V>; // (1) C++23

constexpr V base() &&;            // (2) C++23
```

## 概要

メンバ変数として保持している、元となるRangeを取得する。

## 効果

- (1) : `return base_;`
- (2) : `return std::move(base_);`

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5, 6};
  
  std::ranges::chunk_view cv{v, 2};
  
  // (1) const左辺値参照版
  const auto& base1 = cv.base();
  std::cout << "base size: " << base1.size() << std::endl;
  
  // (2) 右辺値参照版 
  auto base2 = std::move(cv).base();
  std::cout << "moved base size: " << base2.size() << std::endl;
}
```
* base[color ff0000]

### 出力
```
base size: 6
moved base size: 6
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 14.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 3 [mark verified]

## 参照
- [N4950 26.7.29 Chunk view](https://timsong-cpp.github.io/cppwp/n4950/range.chunk)