# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* adjacent_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
adjacent_view()
  requires default_initializable<V> = default;  // (1) C++23

constexpr explicit
adjacent_view(V base);                          // (2) C++23
```

## 概要

- (1) : デフォルトコンストラクタ
- (2) : 元となるRangeを受け取るコンストラクタ

## 効果

- (1) : `base_`をデフォルト構築する
- (2) : `base_`を`std::move(base)`で初期化する

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  // (1) デフォルトコンストラクタ
  std::ranges::adjacent_view<std::ranges::empty_view<int>, 2> av1;
  
  // (2) 元となるRangeを受け取るコンストラクタ
  std::vector<int> v = {1, 2, 3, 4, 5};
  std::ranges::adjacent_view<std::views::all_t<std::vector<int>&>, 3> av2(v);
  
  for (auto [a, b, c] : av2) {
    std::cout << a << ", " << b << ", " << c << std::endl;
  }
}
```
* std::ranges::adjacent_view[color ff0000]

### 出力
```
1, 2, 3
2, 3, 4
3, 4, 5
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 19 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 7 [mark verified]

## 参照
- [N4950 26.7.27 Adjacent view](https://timsong-cpp.github.io/cppwp/n4950/range.adjacent)