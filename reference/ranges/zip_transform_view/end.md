# end
* ranges[meta header]
* std::ranges[meta namespace]
* zip_transform_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto end();                          // (1) C++23

constexpr auto end() const
  requires range<const InnerView> &&
           regular_invocable<
             const F&,
             range_reference_t<const Views>...
           >;                                  // (2) C++23
```

## 概要

番兵を取得する。

## 効果

説明専用コンセプト`zip-is-common`を用いて、

`zip-is-common<Views...>`が`false`の場合：

- (1) : `return sentinel<false>(zip_.end());`
- (2) : `return sentinel<true>(zip_.end());`

それ以外の場合：

- (1) : `return iterator<false>(*this, zip_.end());`
- (2) : `return iterator<true>(*this, zip_.end());`

ここで、`iterator`と`sentinel`は`zip_transform_view`の内部で定義される説明専用のクラスであり、`InnerView`は説明専用の[`zip_view`](../zip_view.md)`<Views...>`である。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <list>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3};
  std::list<char> l = {'a', 'b', 'c', 'd'};
  
  auto f = [](int n, char c) { return std::pair{n * 10, c}; };
  std::ranges::zip_transform_view ztv(f, v, l);
  
  auto begin = ztv.begin();
  auto end = ztv.end();
  
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
10, a
20, b
30, c
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 19 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]

## 参照
- [N4950 26.7.26 Zip transform view](https://timsong-cpp.github.io/cppwp/n4950/range.zip.transform)
