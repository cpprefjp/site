# begin
* ranges[meta header]
* std::ranges[meta namespace]
* cartesian_product_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr iterator<false> begin()
  requires (!simple-view<First> || ... || !simple-view<Vs>); // (1) C++23

constexpr iterator<true> begin() const; // (2) C++23
```
* iterator[italic]

## 概要

先頭要素を指すイテレータを取得する。

## 効果

- (1), (2) : 以下と等価
    ```cpp
    return iterator<Const>(*this, tuple-transform(ranges::begin, bases_));
    ```

ここで、`iterator`は説明専用のイテレータクラスであり、`tuple-transform`は説明専用の関数で、tupleの各要素に関数を適用する。`Const`は各オーバーロードに応じて`false`または`true`となる。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <list>
#include <print>

int main() {
  std::vector<int> v = {1, 2};
  std::list<char> l = {'a', 'b'};
  
  std::ranges::cartesian_product_view cv{v, l};
  
  auto it = cv.begin();
  
  // 最初の要素を出力
  std::println("first element: {}", *it);
}
```
* begin[color ff0000]

### 出力
```
first element: (1, 'a')
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 13.2 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 7 [mark verified]

## 参照
- [N4950 26.7.33 Cartesian product view](https://timsong-cpp.github.io/cppwp/n4950/range.cartesian)