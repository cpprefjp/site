# size
* ranges[meta header]
* std::ranges[meta namespace]
* adjacent_transform_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto size()
  requires sized_range<InnerView>;       // (1) C++23

constexpr auto size() const
  requires sized_range<const InnerView>; // (2) C++23
```

## 概要

要素数を取得する。

## 効果

- (1) : `return inner_.size();`
- (2) : `return inner_.size();`

ここで、`InnerView`は説明専用の[`adjacent_view`](../adjacent_view.md)`<V, N>`である。

## 備考

`adjacent_transform_view`のサイズは、内部で保持する`adjacent_view`のサイズと同じ。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};
  
  auto diff = [](int x, int y) { return y - x; };
  std::ranges::adjacent_transform_view<std::views::all_t<std::vector<int>&>, decltype(diff), 2> atv(v, diff);
  
  // サイズは元のサイズ(5) - (N(2) - 1) = 4
  std::cout << "size: " << atv.size() << std::endl;
  
  // const版も動作する
  const auto& catv = atv;
  std::cout << "const size: " << catv.size() << std::endl;
}
```
* size[color ff0000]
* std::ranges::adjacent_transform_view[link ../adjacent_transform_view.md]
* std::views::all_t[link ../all.md]

### 出力
```
size: 4
const size: 4
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [N4950 26.7.28 Adjacent transform view](https://timsong-cpp.github.io/cppwp/n4950/range.adjacent.transform)