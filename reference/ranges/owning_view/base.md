# base
* ranges[meta header]
* std::ranges[meta namespace]
* owning_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr R& base() & noexcept;               // (1) C++20
constexpr const R& base() const & noexcept;   // (2) C++20
constexpr R&& base() && noexcept;             // (3) C++20
constexpr const R&& base() const && noexcept; // (4) C++20
```

## 概要

メンバ変数として保持している、元となるRangeを取得する。

## 効果

- (1) : `return r_;`
- (2) : `return r_;`
- (3) : `return std::move(r_);`
- (4) : `return std::move(r_);`

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};
  std::ranges::owning_view ov{std::move(v)};
  
  // (1) 左辺値参照版
  auto& base1 = ov.base();
  std::cout << "base size: " << base1.size() << std::endl;
  
  // (2) const左辺値参照版
  const auto& cov = ov;
  const auto& base2 = cov.base();
  std::cout << "const base size: " << base2.size() << std::endl;
  
  // (3) 右辺値参照版
  auto base3 = std::move(ov).base();
  std::cout << "moved base size: " << base3.size() << std::endl;
}
```
* base[color ff0000]

### 出力
```
base size: 5
const base size: 5
moved base size: 5
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
