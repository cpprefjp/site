# begin
* ranges[meta header]
* std::ranges[meta namespace]
* zip_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto begin()
  requires (!(simple-view<Views> && ...));     // (1) C++23

constexpr auto begin() const
  requires (range<const Views> && ...);        // (2) C++23
```

## 概要

先頭を指すイテレータを取得する。

## 効果

- (1) : `return iterator<false>(tuple-transform(ranges::begin, views_));`
- (2) : `return iterator<true>(tuple-transform(ranges::begin, views_));`

ここで、`iterator`は`zip_view`の内部で定義される説明専用のイテレータクラスであり、`tuple-transform`は説明専用の関数テンプレートである。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <list>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3};
  std::list<char> l = {'a', 'b', 'c'};
  
  std::ranges::zip_view zv(v, l);
  
  auto it = zv.begin();
  
  // 最初の要素（各Rangeの最初の要素のタプル）
  auto [n, c] = *it;
  std::cout << n << ", " << c << std::endl;
  
  // 次の要素へ
  ++it;
  auto [n2, c2] = *it;
  std::cout << n2 << ", " << c2 << std::endl;
}
```
* begin[color ff0000]

### 出力
```
1, a
2, b
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