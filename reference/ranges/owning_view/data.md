# data
* ranges[meta header]
* std::ranges[meta namespace]
* owning_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto data()
  requires contiguous_range<R>;       // (1) C++20

constexpr auto data() const
  requires contiguous_range<const R>; // (2) C++20
```
* contiguous_range[link ../contiguous_range.md]

## 概要

Rangeの先頭要素へのポインタを取得する。

## 効果

- (1) : `return ranges::data(r_);`
- (2) : `return ranges::data(r_);`

## 備考

この関数は、元となるRangeが[`contiguous_range`](../contiguous_range.md)コンセプトを満たす場合のみ定義される。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};
  std::ranges::owning_view ov{std::move(v)};
  
  auto ptr = ov.data();
  std::cout << "first element via data(): " << *ptr << std::endl;
  std::cout << "second element via data(): " << *(ptr + 1) << std::endl;
  
  // const版も使用可能
  const auto& cov = ov;
  auto const_ptr = cov.data();
  std::cout << "const first element via data(): " << *const_ptr << std::endl;
}
```
* data[color ff0000]

### 出力
```
first element via data(): 1
second element via data(): 2
const first element via data(): 1
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