# operator*
* iterator[meta header]
* std[meta namespace]
* counted_iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr decltype(auto) operator*();
constexpr decltype(auto) operator*() const requires dereferenceable<const I>;
```
* dereferenceable[link /reference/iterator/dereferenceable.md]

## 概要
イテレータを間接参照する。

## 事前条件

カウントの値を`length`メンバ変数に保持するとして

`length >= 0`

## 効果

`I`の値を`current`メンバ変数に保持するとして、以下と等価

`return *current;`

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <ranges>
#include <vector>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

  std::counted_iterator ci{std::ranges::begin(vec), 5};

  std::cout << *ci << '\n';
  
  ++ci;
  
  std::cout << *ci;
}
```
* *ci[color ff0000]

### 出力
```
1
2
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 8 [mark verified]

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [LWG Issue 3472. `counted_iterator` is missing preconditions](https://cplusplus.github.io/LWG/issue3472)
