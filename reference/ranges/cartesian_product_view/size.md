# size
* ranges[meta header]
* std::ranges[meta namespace]
* cartesian_product_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr 以下参照 size()
  requires cartesian-product-is-sized<First, Vs...>; // (1) C++23

constexpr 以下参照 size() const
  requires cartesian-product-is-sized<const First, const Vs...>; // (2) C++23
```
* cartesian-product-is-sized[italic]

## 概要

要素数を取得する。

## 効果

以下と等価：

```cpp
return apply([](auto... sizes) {
    using CT = make-unsigned-like-t<common_type_t<decltype(sizes)...>>;
    return (static_cast<CT>(sizes) * ...);
}, tuple-transform(ranges::size, bases_));
```
* make-unsigned-like-t[italic]
* tuple-transform[italic]

ここで、`tuple-transform`は説明専用の関数で、tupleの各要素に関数を適用する。

## 備考
- 直積の要素数は、すべてのRangeの要素数の積となる。


## 例
```cpp example
#include <ranges>
#include <vector>
#include <list>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3}; // 3要素
  std::list<char> l = {'a', 'b'}; // 2要素
  
  std::ranges::cartesian_product_view cv{v, l};
  
  // 直積の要素数は 3 * 2 = 6
  std::cout << "cartesian product size: " << cv.size() << std::endl;
}
```
* size[color ff0000]

### 出力
```
cartesian product size: 6
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
