# size
* ranges[meta header]
* std::ranges[meta namespace]
* common_view[meta class]
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
#include <list>
#include <iostream>

int main() {
  std::list<int> ls = {1, 2, 3, 4, 5};
  
  // sized_rangeなviewを作成
  auto taken = std::views::counted(ls.begin(), 3);
  static_assert(std::ranges::sized_range<decltype(taken)>);
  
  // common_viewでラップ
  std::ranges::common_view cv(taken);
  
  // サイズを取得
  std::cout << "size: " << cv.size() << std::endl;
  
  // const版も動作する
  const auto& ccv = cv;
  std::cout << "const size: " << ccv.size() << std::endl;
}
```
* size[color ff0000]
* std::ranges::sized_range[link ../sized_range.md]
* std::ranges::common_view[link ../common_view.md]
* std::views::counted[link ../counted.md]

### 出力
```
size: 3
const size: 3
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
- [N4861 24.7.5.1 Overview](https://timsong-cpp.github.io/cppwp/n4861/range.common.view)
