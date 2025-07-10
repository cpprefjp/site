# begin
* ranges[meta header]
* std::ranges[meta namespace]
* slide_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto begin()
  requires (!(simple-view<V> && slide-caches-nothing<const V>)); // (1) C++23

constexpr auto begin() const
  requires slide-caches-nothing<const V>; // (2) C++23
```
* slide-caches-nothing[italic]

## 概要

先頭要素を指すイテレータを取得する。

## 効果

`forward_range<V>`の場合：

- (1), (2) : `return iterator<false>(ranges::begin(base_), ranges::end(base_), n_);`

それ以外の場合：

- (1) : `return iterator<false>(this);`
- (2) : `return iterator<true>(this);`

ここで、`iterator`は説明専用のイテレータクラスであり、`slide-caches-nothing<V>`は`forward_range<V>`かつ`V`が`random_access_range`または`sized_range`であることを表す説明専用のコンセプトである。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <print>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5, 6};
  
  std::ranges::slide_view sv{v, 3};
  
  auto it = sv.begin();
  
  // 最初のスライドを出力
  std::println("{}", *it);
}
```
* begin[color ff0000]

### 出力
```
[1, 2, 3]
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
