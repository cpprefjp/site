# size
* ranges[meta header]
* std::ranges[meta namespace]
* enumerate_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto size()
  requires sized_range<V>;       // (1) C++23

constexpr auto size() const
  requires sized_range<const V>; // (2) C++23
```

## 概要

要素数を取得する。

## 効果

- (1) : `return ranges::size(base_);`
- (2) : `return ranges::size(base_);`

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<char> v = {'a', 'b', 'c'};
  
  std::ranges::enumerate_view ev(v);
  
  // サイズを取得
  std::cout << "size: " << ev.size() << std::endl;
  
  // const版も動作する
  const auto& cev = ev;
  std::cout << "const size: " << cev.size() << std::endl;
}
```
* size[color ff0000]

### 出力
```
size: 3
const size: 3
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 7 [mark verified]

## 参照
- [N4950 26.7.23 Enumerate view](https://timsong-cpp.github.io/cppwp/n4950/range.enumerate)
