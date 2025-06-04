# size
* ranges[meta header]
* std::ranges[meta namespace]
* slide_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto size()
  requires sized_range<V>;       // (1) C++23

constexpr auto size() const
  requires sized_range<const V>; // (2) C++23
```

## 概要

要素数（スライド数）を取得する。

## 効果

以下と等価：

```cpp
auto sz = ranges::distance(base_);
if (sz < n_) return 0;
return to-unsigned-like(sz - n_ + 1);
```
* to-unsigned-like[italic]

ここで、`to-unsigned-like`は説明専用の関数であり、整数型を対応する符号なし整数型に変換する。

## 備考

元のRangeの要素数が`n`より小さい場合は0を返し、そうでなければ`sz - n + 1`を返す。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5, 6};
  
  // サイズ3のスライド
  std::ranges::slide_view sv1{v, 3};
  std::cout << "slide_view(6 elements, slide size 3): " << sv1.size() << " slides" << std::endl;
  
  // サイズ6のスライド
  std::ranges::slide_view sv2{v, 6};
  std::cout << "slide_view(6 elements, slide size 6): " << sv2.size() << " slides" << std::endl;
  
  // サイズ7のスライド（元より大きい）
  std::ranges::slide_view sv3{v, 7};
  std::cout << "slide_view(6 elements, slide size 7): " << sv3.size() << " slides" << std::endl;
}
```
* size[color ff0000]

### 出力
```
slide_view(6 elements, slide size 3): 4 slides
slide_view(6 elements, slide size 6): 1 slides
slide_view(6 elements, slide size 7): 0 slides
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 3 [mark verified]

## 参照
- [N4950 26.7.31 Slide view](https://timsong-cpp.github.io/cppwp/n4950/range.slide)