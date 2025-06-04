# stride
* ranges[meta header]
* std::ranges[meta namespace]
* stride_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr range_difference_t<V> stride() const noexcept; // (1) C++23
```

## 概要

メンバ変数として保持している、歩幅を取得する。

## 効果

- (1) : `return stride_;`

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {0, 1, 2, 3, 4, 5, 6, 7, 8};
  
  std::ranges::stride_view sv{v, 3};
  
  // 歩幅を取得
  std::cout << "stride: " << sv.stride() << std::endl;
}
```
* stride[color ff0000]

### 出力
```
stride: 3
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