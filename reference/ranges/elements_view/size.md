# size
* ranges[meta header]
* std::ranges[meta namespace]
* elements_view[meta class]
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
#include <map>
#include <string>
#include <iostream>

int main() {
  std::map<int, std::string> m = {{1, "one"}, {2, "two"}, {3, "three"}};
  
  // keys_viewを使用
  std::ranges::keys_view kv(m);
  std::cout << "keys size: " << kv.size() << std::endl;
  
  // values_viewを使用
  std::ranges::values_view vv(m);
  std::cout << "values size: " << vv.size() << std::endl;
  
  // const版も動作する
  const auto& ckv = kv;
  std::cout << "const keys size: " << ckv.size() << std::endl;
}
```
* size[color ff0000]

### 出力
```
keys size: 3
values size: 3
const keys size: 3
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
