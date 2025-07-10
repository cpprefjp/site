# begin
* ranges[meta header]
* std::ranges[meta namespace]
* adjacent_transform_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto begin();      // (1) C++23

constexpr auto begin() const
  requires range<const InnerView> &&
           regular_invocable<const F&, REPEAT(range_reference_t<const V>, N)...>; // (2) C++23
```
* REPEAT[italic]

## 概要

先頭を指すイテレータを取得する。

## 効果

- (1) : `return iterator<false>(*this, inner_.begin());`
- (2) : `return iterator<true>(*this, inner_.begin());`

ここで、`iterator`は`adjacent_transform_view`の内部で定義される説明専用のイテレータクラスであり、`InnerView`は説明専用の[`adjacent_view`](../adjacent_view.md)`<V, N>`である。

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
  
  auto it = atv.begin();
  
  // 最初の要素（隣接する2要素の差）
  std::cout << *it << std::endl;  // 2 - 1 = 1
  
  // 次の要素へ
  ++it;
  std::cout << *it << std::endl;  // 3 - 2 = 1
}
```
* begin[color ff0000]

### 出力
```
1
1
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
