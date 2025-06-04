# end
* ranges[meta header]
* std::ranges[meta namespace]
* owning_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr sentinel_t<R> end(); // (1) C++20

constexpr auto end() const
  requires range<const R>;     // (2) C++20
```

## 概要

番兵を取得する。

## 効果

- (1) : `return ranges::end(r_);`
- (2) : `return ranges::end(r_);`

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};
  std::ranges::owning_view ov{std::move(v)};
  
  // イテレータ範囲で全要素を出力
  for (auto it = ov.begin(); it != ov.end(); ++it) {
    std::cout << *it << " ";
  }
  std::cout << std::endl;
}
```
* end[color ff0000]
* begin[link begin.md]

### 出力
```
1 2 3 4 5 
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