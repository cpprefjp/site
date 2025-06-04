# size
* ranges[meta header]
* std::ranges[meta namespace]
* reverse_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto size()
  requires sized_range<V>;       // (1) C++20

constexpr auto size() const
  requires sized_range<const V>; // (2) C++20
```

## 概要

要素数を取得する。

## 効果

- (1) : `return ranges::size(base_);`
- (2) : `return ranges::size(base_);`

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5};
  
  std::ranges::reverse_view rv(vec);
  
  // サイズを取得
  std::cout << "size: " << rv.size() << std::endl;
  
  // const版も動作する
  const auto& crv = rv;
  std::cout << "const size: " << crv.size() << std::endl;
}
```
* size[color ff0000]

### 出力
```
size: 5
const size: 5
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24.7.6.1 Overview](https://timsong-cpp.github.io/cppwp/n4861/range.reverse.view)