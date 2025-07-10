# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* elements_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
elements_view()
  requires default_initializable<V> = default;  // (1) C++20

constexpr explicit
elements_view(V base);                          // (2) C++20
```

## 概要

- (1) : デフォルトコンストラクタ
- (2) : 元となるRangeを受け取るコンストラクタ

## 効果

- (1) : `base_`をデフォルト構築する
- (2) : `base_`を`std::move(base)`で初期化する

## 例
```cpp example
#include <ranges>
#include <map>
#include <string>
#include <iostream>

int main() {
  std::map<int, std::string> m = {{1, "one"}, {2, "two"}, {3, "three"}};
  
  // (1) デフォルトコンストラクタ
  std::ranges::elements_view<std::ranges::empty_view<std::pair<int, std::string>>, 0> ev1;
  
  // (2) 元となるRangeを受け取るコンストラクタ
  std::ranges::elements_view<std::views::all_t<std::map<int, std::string>&>, 0> ev2(m);
  
  // keys_viewを使用
  for (int key : ev2) {
    std::cout << key << " ";
  }
  std::cout << std::endl;
  
  // values_viewを使用
  std::ranges::values_view vv(m);
  for (const std::string& value : vv) {
    std::cout << value << " ";
  }
  std::cout << std::endl;
}
```
* std::ranges::elements_view[color ff0000]

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
