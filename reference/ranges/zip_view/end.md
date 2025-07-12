# end
* ranges[meta header]
* std::ranges[meta namespace]
* zip_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto end()
  requires (!(simple-view<Views> && ...));                 // (1) C++23

constexpr auto end() const
  requires ((range<const Views> && ...) &&
            (random_access_range<const Views> && ...) &&
            (sized_range<const Views> && ...));            // (2) C++23

constexpr auto end() const
  requires (range<const Views> && ...);                    // (3) C++23
```

## 概要

番兵を取得する。

## 効果

説明専用コンセプト`zip-is-common`を用いて、

- (1) :
    - `zip-is-common<Views...>`が`false`の場合：
        - `return sentinel<false>(tuple-transform(ranges::end, views_));`
    - `(random_access_range<Views> && ...) && (sized_range<Views> && ...)`が`true`の場合：
        - `return begin() + `[`iter_difference_t`](/reference/iterator/iter_difference_t.md)`<iterator<false>>(size());`
    - それ以外の場合：
        - `return iterator<false>(tuple-transform(ranges::end, views_));`

- (2) : `return begin() + `[`iter_difference_t`](/reference/iterator/iter_difference_t.md)`<iterator<true>>(size());`

- (3) : 
```cpp
if constexpr (!zip-is-common<const Views...>) {
  return sentinel<true>(tuple-transform(ranges::end, views_));
}
else {
  return iterator<true>(tuple-transform(ranges::end, views_));
}
```

ここで、`iterator`と`sentinel`は`zip_view`の内部で定義される説明専用のクラスであり、`tuple-transform`は説明専用の関数テンプレートである。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <list>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3};
  std::list<char> l = {'a', 'b', 'c', 'd'};
  
  std::ranges::zip_view zv(v, l);
  
  auto begin = zv.begin();
  auto end = zv.end();
  
  // 全要素を出力（短い方のRangeのサイズで終わる）
  for (auto it = begin; it != end; ++it) {
    auto [n, c] = *it;
    std::cout << n << ", " << c << std::endl;
  }
}
```
* end[color ff0000]
* begin[link begin.md]

### 出力
```
1, a
2, b
3, c
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 13.2 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 5 [mark verified]

## 参照
- [N4950 26.7.25 Zip view](https://timsong-cpp.github.io/cppwp/n4950/range.zip)
