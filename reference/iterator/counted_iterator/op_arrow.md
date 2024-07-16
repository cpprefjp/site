# operator->
* iterator[meta header]
* std[meta namespace]
* counted_iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto operator->() const noexcept
  requires contiguous_iterator<I>;
```
* contiguous_iterator[link /reference/iterator/contiguous_iterator.md]

## 概要
イテレータを通して参照先の要素のメンバにアクセスする

## 効果

`I`の値を`current`メンバ変数に保持するとして、以下と等価

```cpp
return to_address(current);
```
* to_address[link /reference/memory/to_address.md]

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <ranges>
#include <vector>

struct S {
  int n;

  S(int a) : n{a} {}

  void print() const {
    std::cout << this->n << '\n';
  }
};

int main() {
  std::vector<S> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

  std::counted_iterator ci{std::ranges::begin(vec), 5};

  ci->print();
  
  ++ci;
  
  ci->print();
}
```
* ci->[color ff0000]
* ranges::begin[link /reference/ranges/begin.md]

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
- [GCC](/implementation.md#gcc): 12.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 [mark verified]

## 参照
- [P2259R1 Repairing input range adaptors and `counted_iterator`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2259r1.html)
