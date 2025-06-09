# begin
* ranges[meta header]
* std::ranges[meta namespace]
* owning_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr iterator_t<R> begin(); // (1) C++20

constexpr auto begin() const
  requires range<const R>;       // (2) C++20
```

## 概要

先頭要素を指すイテレータを取得する。

## 効果

- (1) : `return ranges::begin(r_);`
- (2) : `return ranges::begin(r_);`

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};
  std::ranges::owning_view ov{std::move(v)};
  
  auto it = ov.begin();
  std::cout << "first element: " << *it << std::endl;
  
  // const版も使用可能
  const auto& cov = ov;
  auto const_it = cov.begin();
  std::cout << "const first element: " << *const_it << std::endl;
}
```
* begin[color ff0000]

### 出力
```
first element: 1
const first element: 1
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
