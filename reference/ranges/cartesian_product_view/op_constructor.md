# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* cartesian_product_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
cartesian_product_view() = default; // (1) C++23

constexpr explicit
cartesian_product_view(First first_base, Vs... bases); // (2) C++23
```

## 概要

`cartesian_product_view`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ。各Rangeを値初期化する。
- (2) : 複数のRangeを受け取るコンストラクタ。

## 効果

- (1) : 各メンバを値初期化する。
- (2) : `bases_`を`std::tuple<First, Vs...>(std::move(first_base), std::move(bases)...)`で初期化する。

ここで、`bases_`は複数のRangeを保持するメンバ変数である。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <list>
#include <print>

int main() {
  std::vector<int> v = {1, 2};
  std::list<char> l = {'a', 'b'};
  
  // デフォルトコンストラクタ
  std::ranges::cartesian_product_view<std::views::all_t<std::vector<int>>, std::views::all_t<std::list<char>>> cv1{};
  
  // Rangeを指定
  std::ranges::cartesian_product_view cv2{v, l};
  
  std::println("{}", cv2);
}
```
* std::ranges::cartesian_product_view[color ff0000]

### 出力
```
[(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]
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