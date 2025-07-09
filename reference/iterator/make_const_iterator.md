# make_const_iterator
* iterator[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template<input_iterator I>
  constexpr const_iterator<I> make_const_iterator(I it);
}
```
* const_iterator[link const_iterator.md]

## 概要

`basic_const_iterator`のヘルパ関数。

## 戻り値
```cpp
return it;
```

戻り値型は必ずしも`basic_const_iterator`の特殊化になるわけではない。

## 例
```cpp example
#include <iostream>
#include <vector>
#include <memory>
#include <iterator>

int main() {
  std::vector vec = {1, 2, 3, 4, 5};

  auto cit = std::make_const_iterator(vec.begin());
  auto cse = std::make_const_sentinel(vec.end());

  for (auto& n : std::ranges::subrange{cit, cse}) {
    std::cout << n << ", ";
    // 変更できない
    // n = 0;
  }
}
```
* std::make_const_iterator[color ff0000]
* make_const_sentinel[link make_const_sentinel.md]

### 出力
```
1, 2, 3, 4, 5, 
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]

## 参照

- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
