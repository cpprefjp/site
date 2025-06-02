# end
* ranges[meta header]
* std::ranges[meta namespace]
* concat_view[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr auto end()
  requires (!simple-view<Views> || ...);       // (1) C++26

constexpr auto end() const
  requires (range<const Views> && ...);        // (2) C++26
```

## 概要
番兵を取得する。

## 戻り値
- (1), (2) : `concat_view`の番兵を返す

## 例

```cpp example
#include <print>
#include <ranges>
#include <array>
#include <vector>

int main() {
  std::vector<int> v1{1, 2, 3};
  std::vector<int> v2{4, 5};
  std::array<int, 3> a{6, 7, 8};

  std::ranges::concat_view r{v1, v2, a};

  auto it = r.begin();
  auto end_it = r.end();
  while (it != end_it) {
    std::print("{} ", *it);
    ++it;
  }
  std::println();
}
```
* end[color ff0000]
* begin[link begin.md]

### 出力

```
1 2 3 4 5 6 7 8
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 20 [mark noimpl]
- [GCC](/implementation.md#gcc): 15 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 14 [mark noimpl]
