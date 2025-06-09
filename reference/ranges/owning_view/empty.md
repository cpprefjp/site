# empty
* ranges[meta header]
* std::ranges[meta namespace]
* owning_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr bool empty()
  requires requires { ranges::empty(r_); }; // (1) C++20

constexpr bool empty() const
  requires requires { ranges::empty(r_); }; // (2) C++20
```

## 概要

Rangeが空かどうかを判定する。

## 効果

- (1) : `return ranges::empty(r_);`
- (2) : `return ranges::empty(r_);`

## 備考

この関数は、元となるRangeに対して[`ranges::empty`](../empty.md)が呼び出せる場合のみ定義される。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  // 空のvector
  std::ranges::owning_view ov1{std::vector<int>{}};
  std::cout << "empty vector: " << ov1.empty() << std::endl;
  
  // 要素を持つvector
  std::ranges::owning_view ov2{std::vector<int>{1, 2, 3}};
  std::cout << "non-empty vector: " << ov2.empty() << std::endl;
}
```
* empty[color ff0000]

### 出力
```
empty vector: 1
non-empty vector: 0
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
