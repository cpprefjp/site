# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* zip_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
zip_view() = default;      // (1) C++23

constexpr explicit
zip_view(Views... views);  // (2) C++23
```

## 概要

- (1) : デフォルトコンストラクタ
- (2) : zipする各Rangeを受け取るコンストラクタ

## 効果

- (1) : `views_`をデフォルト構築する
- (2) : `views_`を`std::move(views)...`で初期化する

## 例
```cpp example
#include <ranges>
#include <vector>
#include <list>
#include <iostream>

int main() {
  // (1) デフォルトコンストラクタ
  std::ranges::zip_view<std::ranges::empty_view<int>, std::ranges::empty_view<char>> zv1;
  
  // (2) 各Rangeを受け取るコンストラクタ
  std::vector<int> v = {1, 2, 3};
  std::list<char> l = {'a', 'b', 'c', 'd'};
  std::ranges::zip_view zv2(v, l);
  
  for (auto [n, c] : zv2) {
    std::cout << n << ", " << c << std::endl;
  }
}
```
* std::ranges::zip_view[color ff0000]
* std::ranges::empty_view[link ../empty_view.md]

### 出力
```
1, a
2, b
3, c
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 13.2 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 5 [mark verified]

## 参照
- [N4950 26.7.25 Zip view](https://timsong-cpp.github.io/cppwp/n4950/range.zip)