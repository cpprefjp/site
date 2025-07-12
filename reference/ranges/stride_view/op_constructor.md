# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* stride_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
stride_view()
  requires default_initializable<V> = default;     // (1) C++23

constexpr explicit
stride_view(V base, range_difference_t<V> stride); // (2) C++23
```

## 概要

`stride_view`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ。元となるRangeを値初期化する。
- (2) : 元となるRangeと歩幅を受け取るコンストラクタ。

## 事前条件

- (2) : `stride > 0`


## 効果

- (1) : `base_`と`stride_`を値初期化する。
- (2) : `base_(std::move(base))`、`stride_(stride)`で初期化する。

ここで、`base_`は元となるRangeを保持するメンバ変数、`stride_`は歩幅を保持するメンバ変数である。


## 例
```cpp example
#include <ranges>
#include <vector>
#include <print>

int main() {
  std::vector<int> v = {0, 1, 2, 3, 4, 5, 6, 7, 8};
  
  // デフォルトコンストラクタ
  std::ranges::stride_view<std::views::all_t<std::vector<int>>> sv1{};
  
  // 元となるRangeと歩幅を指定
  std::ranges::stride_view sv2{v, 3};
  
  std::println("{}", sv2);
}
```
* std::ranges::stride_view[color ff0000]
* std::views::all_t[link ../all.md]

### 出力
```
[0, 3, 6]
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
