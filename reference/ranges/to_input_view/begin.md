# begin
* to_input_view[meta header]
* std::ranges[meta namespace]
* to_input_view[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr auto begin()
  requires (!simple-view<V>); // (1) C++26

constexpr auto begin() const
  requires range<const V>;    // (2) C++26
```

## 概要
先頭を指すイテレータを取得する。

## 効果
- (1): `return iterator<false>(ranges::begin(base_));`
- (2): `return iterator<true>(ranges::begin(base_));`

ここで、`iterator`は`to_input_view`の内部で定義される説明専用のイテレータクラスである。

## 備考
- このイテレータは`input_iterator`コンセプトを満たし、`forward_iterator`コンセプトを満たさない。


## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};
  
  std::ranges::to_input_view view{v};
  
  auto it = view.begin();
  std::cout << *it << std::endl;
}
```

### 出力
```
1
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 21 [mark verified]
- [GCC](/implementation.md#gcc): 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 14 [mark noimpl]