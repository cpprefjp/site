# begin
* ranges[meta header]
* std::ranges[meta namespace]
* elements_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto begin()
  requires (!simple-view<V>);      // (1) C++20

constexpr auto begin() const
  requires range<const V>;         // (2) C++20
```

## 概要

先頭を指すイテレータを取得する。

## 効果

- (1) : `return iterator<false>(ranges::begin(base_));`
- (2) : `return iterator<true>(ranges::begin(base_));`

ここで、`iterator`は`elements_view`の内部で定義される説明専用のイテレータクラスである。

## 例
```cpp example
#include <ranges>
#include <map>
#include <string>
#include <iostream>

int main() {
  std::map<int, std::string> m = {{1, "one"}, {2, "two"}, {3, "three"}};
  
  // keys_viewを使用
  std::ranges::keys_view kv(m);
  auto it = kv.begin();
  std::cout << *it << std::endl;  // 1
  ++it;
  std::cout << *it << std::endl;  // 2
  
  // values_viewを使用
  std::ranges::values_view vv(m);
  auto vit = vv.begin();
  std::cout << *vit << std::endl; // one
}
```
* begin[color ff0000]

### 出力
```
1
2
one
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
- [N4861 24.7.21.1 Overview](https://timsong-cpp.github.io/cppwp/n4861/range.elements.view)