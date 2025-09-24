# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* common_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
common_view()
  requires default_initializable<V> = default;  // (1) C++20

constexpr explicit
common_view(V r);                               // (2) C++20
```

## 概要

- (1) : デフォルトコンストラクタ
- (2) : 元となるRangeを受け取るコンストラクタ

## 効果

- (1) : `base_`をデフォルト構築する
- (2) : `base_`を`std::move(r)`で初期化する

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5};
  
  // (1) デフォルトコンストラクタ
  std::ranges::common_view<std::ranges::empty_view<int>> cv1;
  
  // (2) 元となるRangeを受け取るコンストラクタ
  auto taken = vec | std::views::take_while([](int x) { return x <= 3; });
  std::ranges::common_view cv2(taken);
  
  for (int n : cv2) {
    std::cout << n << " ";
  }
  std::cout << std::endl;
}
```
* std::ranges::common_view[color ff0000]
* std::ranges::empty_view[link ../empty_view.md]
* std::views::take_while[link ../take_while_view.md]

### 出力
```
1 2 3 
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
