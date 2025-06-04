# begin
* ranges[meta header]
* std::ranges[meta namespace]
* zip_transform_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto begin();                        // (1) C++23

constexpr auto begin() const
  requires range<const InnerView> &&
           regular_invocable<
             const F&,
             range_reference_t<const Views>...
           >;                                  // (2) C++23
```
* range[link ../range.md]
* regular_invocable[link /reference/concepts/invocable.md]
* range_reference_t[link ../range_reference_t.md]

## 概要

先頭を指すイテレータを取得する。

## 効果

- (1) : `return iterator<false>(*this, zip_.begin());`
- (2) : `return iterator<true>(*this, zip_.begin());`

ここで、`iterator`は`zip_transform_view`の内部で定義される説明専用のイテレータクラスであり、`InnerView`は説明専用の[`zip_view`](../zip_view.md)`<Views...>`である。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <list>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3};
  std::list<char> l = {'a', 'b', 'c'};
  
  auto f = [](int n, char c) { return std::pair{n * 10, c}; };
  std::ranges::zip_transform_view ztv(f, v, l);
  
  auto it = ztv.begin();
  
  // 最初の要素（変換結果）
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
10, a
20, b
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