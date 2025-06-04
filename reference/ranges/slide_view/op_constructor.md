# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* slide_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
slide_view()
  requires default_initializable<V> = default; // (1) C++23

constexpr explicit
slide_view(V base, range_difference_t<V> n);   // (2) C++23
```

## 概要

`slide_view`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ。元となるRangeを値初期化する。
- (2) : 元となるRangeとスライドサイズを受け取るコンストラクタ。

## 効果

- (1) : `base_`と`n_`を値初期化する。
- (2) : `base_(std::move(base))`、`n_(n)`で初期化する。

ここで、`base_`は元となるRangeを保持するメンバ変数、`n_`はスライドサイズを保持するメンバ変数である。

## 事前条件

- (2) : `n > 0`

## 例
```cpp example
#include <ranges>
#include <vector>
#include <print>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5, 6};
  
  // デフォルトコンストラクタ
  std::ranges::slide_view<std::views::all_t<std::vector<int>>> sv1{};
  
  // 元となるRangeとスライドサイズを指定
  std::ranges::slide_view sv2{v, 3};
  
  std::println("{}", sv2);
}
```

### 出力
```
[[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6]]
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