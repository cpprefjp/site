# base
* ranges[meta header]
* std::ranges[meta namespace]
* to_input_view[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr V base() const&
  requires copy_constructible<V>;  // (1) C++26

constexpr V base() &&;             // (2) C++26
```

## 概要
メンバ変数として保持している、元のRangeを取得する。

## 効果
- (1): `return base_;`
- (2): `return std::move(base_);`

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5};
  
  std::ranges::to_input_view view{vec};
  
  // (1) コピーして取得
  std::ranges::ref_view<std::vector<int>> v1 = view.base();
  
  // (2) ムーブして取得
  std::ranges::to_input_view view2{vec};
  std::ranges::ref_view<std::vector<int>> v2 = std::move(view2).base();
  
  std::cout << v1.size() << std::endl;
  std::cout << v2.size() << std::endl;
}
```

### 出力
```
5
5
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 21 [mark verified]
- [GCC](/implementation.md#gcc): 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 14 [mark noimpl]
