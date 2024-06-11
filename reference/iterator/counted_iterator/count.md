# count
* iterator[meta header]
* std[meta namespace]
* counted_iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr iter_difference_t<I> count() const noexcept;
```
* iter_difference_t[link /reference/iterator/iter_difference_t.md]

## 概要

メンバ変数として保持しているカウントを取得する。

## 戻り値

現在のカウント数（残りの長さ）を返す。

## 例

```cpp example
#include <iostream>
#include <iterator>
#include <ranges>
#include <vector>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

  std::counted_iterator ci{std::ranges::begin(vec), 5};

  std::cout << ci.count() << '\n';
  
  ++ci;

  std::cout <<  ci.count();
}
```
* count[color ff0000]
* ranges::begin[link /reference/ranges/begin.md]

### 出力

```
5
4
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
