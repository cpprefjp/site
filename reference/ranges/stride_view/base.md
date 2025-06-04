# base
* ranges[meta header]
* std::ranges[meta namespace]
* stride_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr V base() const & requires copy_constructible<V>; // (1) C++23
constexpr V base() &&;                                     // (2) C++23
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
  std::vector<int> v = {0, 1, 2, 3, 4, 5, 6, 7, 8};
  
  std::ranges::stride_view sv{v, 3};
  
  // (1) const左辺値参照版
  const auto& base1 = sv.base();
  std::cout << "base size: " << base1.size() << std::endl;
  
  // (2) 右辺値参照版 
  auto base2 = std::move(sv).base();
  std::cout << "moved base size: " << base2.size() << std::endl;
}
```
* base[color ff0000]

### 出力
```
base size: 9
moved base size: 9
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