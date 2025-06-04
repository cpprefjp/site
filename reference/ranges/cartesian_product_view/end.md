# end
* ranges[meta header]
* std::ranges[meta namespace]
* cartesian_product_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr iterator<false> end()
  requires ((!simple-view<First> || ... || !simple-view<Vs>) &&
            cartesian-product-is-common<First, Vs...>); // (1) C++23

constexpr default_sentinel_t end() const noexcept; // (2) C++23

constexpr iterator<true> end() const
  requires cartesian-product-is-common<const First, const Vs...>; // (3) C++23
```
* iterator[italic]
* cartesian-product-is-common[italic]

## 概要

番兵またはイテレータを取得する。

## 効果

- (1) : 以下と等価
    ```cpp
    auto end_tuple = tuple-transform([](auto& r) { return cartesian-common-arg-end(r); }, bases_);
    return iterator<false>(*this, std::move(end_tuple));
    ```

- (2) : `return default_sentinel;`

- (3) : 以下と等価
    ```cpp
    auto end_tuple = tuple-transform([](auto& r) { return cartesian-common-arg-end(r); }, bases_);
    return iterator<true>(*this, std::move(end_tuple));
    ```

ここで、`iterator`は説明専用のイテレータクラス、`tuple-transform`は説明専用の関数で、tupleの各要素に関数を適用する。`cartesian-common-arg-end`は説明専用の関数である。

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
  
  // イテレータ範囲で全要素を出力
  for (auto it = cv.begin(); it != cv.end(); ++it) {
    std::println("{}", *it);
  }
}
```
* end[color ff0000]
* begin[link begin.md]

### 出力
```
(1, 'a')
(1, 'b')
(2, 'a')
(2, 'b')
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