# base
* iterator[meta header]
* std[meta namespace]
* counted_iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr const I& base() const & noexcept;  // (1)
constexpr I base() &&;  // (2)
```

## 概要

メンバ変数として保持している、元のイテレータを取得する。

## 戻り値

- (1) : 元のイテレータへの`const`参照を返す。
- (2) : 元のイテレータをムーブして返す。

## 例

```cpp example
#include <iostream>
#include <iterator>
#include <ranges>
#include <vector>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

  std::counted_iterator ci{std::ranges::begin(vec), 5};

  std::cout << *(ci.base()) << '\n';
  
  ++ci;
  
  std::cout << *(ci.base());
}
```
* base[color ff0000]

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
- [P1207R4 Movability of single-pass iterators](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1207r4.pdf)
- [LWG Issue 3391. Problems with `counted_iterator/move_iterator::base() const &`](https://cplusplus.github.io/LWG/issue3391)
- [LWG Issue 3593. Several iterators' base() const & and lazy_split_view::outer-iterator::value_type::end() missing noexcept](https://cplusplus.github.io/LWG/issue3593)
