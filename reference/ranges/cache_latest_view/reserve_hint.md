# reserve_hint
* ranges[meta header]
* std::ranges[meta namespace]
* cache_latest_view[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr auto reserve_hint()
  requires approximately_sized_range<V>;       // (1) C++26

constexpr auto reserve_hint() const
  requires approximately_sized_range<const V>; // (2) C++26
```
* approximately_sized_range[link ../approximately_sized_range.md]

## 概要
要素数の推定値（確保のヒント）を取得する。


## 効果
- (1), (2) : 以下と等価：

```cpp
return ranges::reserve_hint(base_);
```
* ranges::reserve_hint[link ../reserve_hint.md]


## 例
```cpp example
#include <ranges>
#include <vector>
#include <print>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};

  std::ranges::cache_latest_view view{v};

  std::println("{}", view.reserve_hint());
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
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`size`](size.md)
- [`std::ranges::reserve_hint`](../reserve_hint.md)
