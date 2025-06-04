# size
* ranges[meta header]
* std::ranges[meta namespace]
* owning_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto size()
  requires sized_range<R>;       // (1) C++20

constexpr auto size() const
  requires sized_range<const R>; // (2) C++20
```

## 概要

要素数を取得する。

## 効果

- (1) : `return ranges::size(r_);`
- (2) : `return ranges::size(r_);`

## 備考

この関数は、元となるRangeが[`sized_range`](../sized_range.md)コンセプトを満たす場合のみ定義される。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};
  std::ranges::owning_view ov{std::move(v)};
  
  std::cout << "size: " << ov.size() << std::endl;
  
  // const版も使用可能
  const auto& cov = ov;
  std::cout << "const size: " << cov.size() << std::endl;
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
- [N4892 24.7.3 All view](https://timsong-cpp.github.io/cppwp/n4892/range.all)