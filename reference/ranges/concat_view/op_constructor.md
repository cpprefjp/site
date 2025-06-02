# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* concat_view[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
concat_view()
  requires (default_initializable<Views> && ...) = default;  // (1) C++26

constexpr explicit concat_view(Views... views);              // (2) C++26
```

## 概要

[`concat_view`](../concat_view.md)オブジェクトを構築する。

- (1) : デフォルト構築
- (2) : 連結する複数のviewを指定して構築

## 効果

- (1) : 各`views_`メンバをデフォルト構築する
- (2) : `views_`を`std::move(views)...`で初期化する

## 例
```cpp example
#include <print>
#include <ranges>
#include <array>
#include <vector>

int main() {
  std::vector<int> v1{1, 2, 3};
  std::vector<int> v2{4, 5};
  std::array<int, 3> a{6, 7, 8};

  std::ranges::concat_view view{v1, v2, a};
  
  for (int i : view) {
    std::print("{} ", i);
  }
  std::println();
}
```
* concat_view[color ff0000]

### 出力
```
1 2 3 4 5 6 7 8
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 20 [mark noimpl]
- [GCC](/implementation.md#gcc): 15 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 14 [mark noimpl]
