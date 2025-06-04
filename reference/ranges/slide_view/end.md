# end
* ranges[meta header]
* std::ranges[meta namespace]
* slide_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto end()
  requires (!(simple-view<V> && slide-caches-nothing<const V>)); // (1) C++23

constexpr auto end() const
  requires slide-caches-nothing<const V>; // (2) C++23
```
* slide-caches-nothing[italic]

## 概要

番兵またはイテレータを取得する。

## 効果

`forward_range<V>`の場合：

`common_range<V>`の場合：
- (1), (2) : `return iterator<Const>(ranges::end(base_) - min(n_ - 1, ranges::distance(base_)), ranges::end(base_), n_);`

それ以外の場合：
- (1), (2) : `return sentinel<Const>(ranges::end(base_));`

それ以外の場合（`forward_range<V>`でない場合）：
- (1), (2) : `return default_sentinel;`

ここで、`iterator`と`sentinel`は説明専用のクラスであり、`Const`は各オーバーロードに応じて`false`または`true`となる。`slide-caches-nothing<V>`は`forward_range<V>`かつ`V`が`random_access_range`または`sized_range`であることを表す説明専用のコンセプトである。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <print>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5, 6};
  
  std::ranges::slide_view sv{v, 3};
  
  // イテレータ範囲で全スライドを出力
  for (auto it = sv.begin(); it != sv.end(); ++it) {
    std::println("{}", *it);
  }
}
```
* end[color ff0000]
* begin[link begin.md]

### 出力
```
[1, 2, 3]
[2, 3, 4]
[3, 4, 5]
[4, 5, 6]
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