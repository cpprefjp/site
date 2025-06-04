# size
* ranges[meta header]
* std::ranges[meta namespace]
* adjacent_view[meta class]
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

説明専用の変数 `n` を `ranges::size(base_)` とする。

- (1)、(2) : `n` が `N` 未満なら `0` を返す。それ以外なら `n - (N - 1)` を返す。

## 備考

元のRangeのサイズが`N`未満の場合、`adjacent_view`は空となる。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};
  
  std::ranges::adjacent_view<std::views::all_t<std::vector<int>&>, 3> av(v);
  
  // サイズは元のサイズ(5) - (N(3) - 1) = 3
  std::cout << "size: " << av.size() << std::endl;
  
  // const版も動作する
  const auto& cav = av;
  std::cout << "const size: " << cav.size() << std::endl;
  
  // 元のRangeが小さい場合
  std::vector<int> v2 = {1, 2};
  std::ranges::adjacent_view<std::views::all_t<std::vector<int>&>, 3> av2(v2);
  std::cout << "small range size: " << av2.size() << std::endl; // 0
}
```
* size[color ff0000]

### 出力
```
size: 3
const size: 3
small range size: 0
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