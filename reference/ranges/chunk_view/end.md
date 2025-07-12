# end
* ranges[meta header]
* std::ranges[meta namespace]
* chunk_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr default_sentinel_t end() const noexcept;                 // (1) C++23

constexpr auto end() requires forward_range<V> && common_range<V>; // (2) C++23

constexpr auto end() const
  requires forward_range<const V> && common_range<const V>;        // (3) C++23
```

## 概要

番兵またはイテレータを取得する。

## 効果

- (1) : `return default_sentinel;`
- (2) : 以下と等価
    ```cpp
    auto missing = (n_ - ranges::distance(base_) % n_) % n_;
    return outer-iterator<false>(this, ranges::end(base_), missing);
    ```

- (3) : 以下と等価
    ```cpp
    auto missing = (n_ - ranges::distance(base_) % n_) % n_;
    return outer-iterator<true>(this, ranges::end(base_), missing);
    ```

ここで、`outer-iterator`は説明専用のイテレータクラスである。

## 備考

`missing`は、最後のチャンクを`n_`個の要素にするために必要な不足要素数を表す。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <print>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8};
  
  std::ranges::chunk_view cv{v, 3};
  
  // イテレータ範囲で全チャンクを出力
  for (auto it = cv.begin(); it != cv.end(); ++it) {
    std::println("{}", *it);
  }
}
```
* end[color ff0000]
* begin[link begin.md]

### 出力
```
[1, 2, 3]
[4, 5, 6]
[7, 8]
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 14.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 3 [mark verified]

## 参照
- [N4950 26.7.29 Chunk view](https://timsong-cpp.github.io/cppwp/n4950/range.chunk)
