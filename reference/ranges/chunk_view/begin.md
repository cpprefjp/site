# begin
* ranges[meta header]
* std::ranges[meta namespace]
* chunk_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr outer-iterator begin();       // (1) C++23

constexpr outer-iterator begin() const
  requires forward_range<const V>;      // (2) C++23
```
* outer-iterator[italic]

## 概要

先頭要素を指すイテレータを取得する。

## 効果

- (1) : 以下と等価
    ```cpp
    V& r = base_;
    auto first = ranges::begin(r);
    if constexpr (forward_range<V>) {
      return outer-iterator<false>(this, std::move(first));
    } else {
      current_ = first;
      remainder_ = n_;
      return outer-iterator<false>(this);
    }
    ```

- (2) : 以下と等価
    ```cpp
    return outer-iterator<true>(this, ranges::begin(base_));
    ```

ここで、`outer-iterator`は説明専用のイテレータクラスであり、`current_`と`remainder_`は`chunk_view`の説明専用のメンバ変数である。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <print>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8};
  
  std::ranges::chunk_view cv{v, 3};
  
  auto it = cv.begin();
  
  // 最初のチャンクを出力
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
- [GCC](/implementation.md#gcc): 14.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 3 [mark verified]

## 参照
- [N4950 26.7.29 Chunk view](https://timsong-cpp.github.io/cppwp/n4950/range.chunk)
