# size
* ranges[meta header]
* std::ranges[meta namespace]
* stride_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto size()
  requires sized_range<V>;       // (1) C++23

constexpr auto size() const
  requires sized_range<const V>; // (2) C++23
```

## 概要

要素数を取得する。

## 効果

以下と等価：

```cpp
return to-unsigned-like(div-ceil(ranges::distance(base_), stride_));
```
* to-unsigned-like[italic]
* div-ceil[italic]

ここで、`to-unsigned-like`は説明専用の関数であり、整数型を対応する符号なし整数型に変換する。`div-ceil(x, y)`は`x`を`y`で割った切り上げを計算する説明専用の関数である。

## 備考

元のRangeの要素数を歩幅で割った切り上げが要素数となる。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {0, 1, 2, 3, 4, 5, 6, 7, 8}; // 9要素
  
  // 歩幅3のstride_view
  std::ranges::stride_view sv1{v, 3};
  std::cout << "stride_view(9 elements, stride 3): " << sv1.size() << " elements" << std::endl;
  
  // 歩幅4のstride_view
  std::ranges::stride_view sv2{v, 4};
  std::cout << "stride_view(9 elements, stride 4): " << sv2.size() << " elements" << std::endl;
}
```
* size[color ff0000]

### 出力
```
stride_view(9 elements, stride 3): 3 elements
stride_view(9 elements, stride 4): 3 elements
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