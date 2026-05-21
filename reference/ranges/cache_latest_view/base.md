# base
* ranges[meta header]
* std::ranges[meta namespace]
* cache_latest_view[meta class]
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
- (1) : `return base_;`
- (2) : `return std::move(base_);`


## 例
```cpp example
#include <ranges>
#include <vector>
#include <print>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};

  std::ranges::cache_latest_view view{v};

  // (1) コピーして取得
  auto v1 = view.base();
  std::println("{}", v1.size());
}
```

### 出力
```
5
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 21 [mark verified]
- [GCC](/implementation.md#gcc): 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]
