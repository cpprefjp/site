# size
* ranges[meta header]
* std::ranges[meta namespace]
* chunk_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto size() requires sized_range<V>;             // (1) C++23

constexpr auto size() const requires sized_range<const V>; // (2) C++23
```
* sized_range[link ../sized_range.md]

## 概要

要素数（チャンク数）を取得する。

## 効果

以下と等価：

```cpp
return to-unsigned-like(div-ceil(ranges::distance(base_), n_));
```
* to-unsigned-like[italic]
* div-ceil[italic]

ここで、`to-unsigned-like`は説明専用の関数であり、整数型を対応する符号なし整数型に変換する。`div-ceil(x, y)`は`x`を`y`で割った切り上げを計算する説明専用の関数である。

## 備考

元のRangeの要素数を`n`で割った切り上げがチャンク数となる。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8};
  
  // 3要素ずつのチャンクに分割
  std::ranges::chunk_view cv1{v, 3};
  std::cout << "chunk_view(8 elements, chunk size 3): " << cv1.size() << " chunks" << std::endl;
  
  // 5要素ずつのチャンクに分割
  std::ranges::chunk_view cv2{v, 5};
  std::cout << "chunk_view(8 elements, chunk size 5): " << cv2.size() << " chunks" << std::endl;
}
```
* size[color ff0000]

### 出力
```
chunk_view(8 elements, chunk size 3): 3 chunks
chunk_view(8 elements, chunk size 5): 2 chunks
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