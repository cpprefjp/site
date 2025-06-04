# end
* ranges[meta header]
* std::ranges[meta namespace]
* adjacent_transform_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto end();      // (1) C++23

constexpr auto end() const
  requires range<const InnerView> &&
           regular_invocable<const F&, REPEAT(range_reference_t<const V>, N)...>; // (2) C++23
```
* REPEAT[italic]

## 概要

番兵を取得する。

## 効果

`common_range<InnerView>`が`true`の場合：

- (1) : `return iterator<false>(*this, inner_.end());`
- (2) : `return iterator<true>(*this, inner_.end());`

それ以外の場合：

- (1) : `return sentinel<false>(inner_.end());`
- (2) : `return sentinel<true>(inner_.end());`

ここで、`iterator`と`sentinel`は`adjacent_transform_view`の内部で定義される説明専用のクラスであり、`InnerView`は説明専用の[`adjacent_view`](../adjacent_view.md)`<V, N>`である。

## 備考
- `REPEAT(T, N)` をT型のN個のパックとする。


## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};
  
  auto diff = [](int x, int y) { return y - x; };
  std::ranges::adjacent_transform_view<std::views::all_t<std::vector<int>&>, decltype(diff), 2> atv(v, diff);
  
  auto begin = atv.begin();
  auto end = atv.end();
  
  // 全要素を出力
  for (auto it = begin; it != end; ++it) {
    std::cout << *it << " ";
  }
  std::cout << std::endl;
}
```
* end[color ff0000]
* begin[link begin.md]

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