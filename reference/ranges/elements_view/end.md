# end
* ranges[meta header]
* std::ranges[meta namespace]
* elements_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto end()
  requires (!simple-view<V> && !common_range<V>);                       // (1) C++20

constexpr auto end()
  requires (!simple-view<V> && common_range<V>);                        // (2) C++20

constexpr auto end() const
  requires range<const V>;                                              // (3) C++20

constexpr auto end() const
  requires common_range<const V>;                                       // (4) C++20
```

## 概要

番兵を取得する。

## 効果

- (1) : `return sentinel<false>{ranges::end(base_)};`
- (2) : `return iterator<false>{ranges::end(base_)};`
- (3) : `return sentinel<true>{ranges::end(base_)};`
- (4) : `return iterator<true>{ranges::end(base_)};`

ここで、`sentinel`は`elements_view`の内部で定義される説明専用の番兵クラスであり、`iterator`は説明専用のイテレータクラスである。

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
  auto begin = kv.begin();
  auto end = kv.end();
  
  for (auto it = begin; it != end; ++it) {
    std::cout << *it << " ";
  }
  std::cout << std::endl;
  
  // values_viewを使用
  std::ranges::values_view vv(m);
  for (auto it = vv.begin(); it != vv.end(); ++it) {
    std::cout << *it << " ";
  }
  std::cout << std::endl;
}
```
* end[color ff0000]
* begin[link begin.md]

### 出力
```
1 2 3 
one two three 
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