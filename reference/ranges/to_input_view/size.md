# size
* ranges[meta header]
* std::ranges[meta namespace]
* to_input_view[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr auto size()
  requires sized_range<V>;       // (1) C++26

constexpr auto size() const
  requires sized_range<const V>; // (2) C++26
```

## 概要
要素数を取得する。

## 効果
- (1), (2): 以下と等価：

```cpp
return ranges::size(base_);
```


## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};
  
  std::ranges::to_input_view view{v};
  
  std::cout << view.size() << std::endl;
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
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 14 [mark noimpl]