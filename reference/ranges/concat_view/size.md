# size
* ranges[meta header]
* std::ranges[meta namespace]
* concat_view[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr auto size()
  requires (sized_range<Views> && ...);        // (1) C++26

constexpr auto size() const
  requires (sized_range<const Views> && ...);  // (2) C++26
```

## 概要
連結されたすべてのRangeの要素数の合計を取得する。

## 制約
- (1) : `Views...`のすべてが[`sized_range`](../sized_range.md)であること
- (2) : `const Views...`のすべてが[`sized_range`](../sized_range.md)であること

## 戻り値
- (1), (2) : 連結されたすべてのRangeの要素数の合計を返す

## 計算量
- O(1)

## 例

```cpp example
#include <print>
#include <ranges>
#include <array>
#include <vector>
#include <iterator>

int main() {
  std::vector<int> v1{1, 2, 3};
  std::vector<int> v2{4, 5};
  std::array<int, 3> a{6, 7, 8};

  std::ranges::concat_view r{v1, v2, a};

  std::println("size: {}", r.size());
  
  // 実際の要素数を確認
  auto count = std::ranges::distance(r);
  std::println("distance: {}", count);
}
```
* size[color ff0000]

### 出力

```
size: 8
distance: 8
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 20 [mark noimpl]
- [GCC](/implementation.md#gcc): 15 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 14 [mark noimpl]
