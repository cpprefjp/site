# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* adjacent_transform_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
adjacent_transform_view() = default;     // (1) C++23

constexpr explicit
adjacent_transform_view(V base, F fun);  // (2) C++23
```

## 概要

- (1) : デフォルトコンストラクタ
- (2) : 元となるRangeと変換関数を受け取るコンストラクタ

## 効果

- (1) : `fun_`と`inner_`をデフォルト構築する
- (2) : `fun_`を`std::move(fun)`で初期化し、`inner_`を`std::move(base)`で初期化する

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  // (1) デフォルトコンストラクタ
  std::ranges::adjacent_transform_view<
    std::ranges::empty_view<int>,
    decltype([](int, int) { return 0; }),
    2
  > atv1;
  
  // (2) 元となるRangeと変換関数を受け取るコンストラクタ
  std::vector<int> v = {1, 2, 3, 4, 5};
  auto diff = [](int x, int y) { return y - x; };
  std::ranges::adjacent_transform_view<std::views::all_t<std::vector<int>&>, decltype(diff), 2> atv2(v, diff);
  
  for (int d : atv2) {
    std::cout << d << " ";
  }
  std::cout << std::endl;
}
```
* std::ranges::adjacent_transform_view[color ff0000]
* std::ranges::empty_view[link ../empty_view.md]

### 出力
```
1 1 1 1 
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 20 [mark noimpl]
- [GCC](/implementation.md#gcc): 15 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 14 [mark noimpl]

## 参照
- [N4950 26.7.28 Adjacent transform view](https://timsong-cpp.github.io/cppwp/n4950/range.adjacent.transform)