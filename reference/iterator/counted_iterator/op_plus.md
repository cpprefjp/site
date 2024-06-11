# operator+
* iterator[meta header]
* std[meta namespace]
* counted_iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr counted_iterator operator+(iter_difference_t<I> n) const
  requires random_access_iterator<I>;                                                           // (1)

friend constexpr counted_iterator operator+(iter_difference_t<I> n, const counted_iterator& x)
  requires random_access_iterator<I>;                                                           // (2)
```
* iter_difference_t[link /reference/iterator/iter_difference_t.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]


## 概要

イテレータを`n`回進める。

## 効果

現在のイテレータとカウントの値をそれぞれ、`current`、`length`メンバ変数に保持するとする。

- (1) : 以下と等価  
    ```cpp
    return counted_iterator(current + n, length - n);
    ```

- (2) : 以下と等価  
    ```cpp
    return x + n; // (1)に委譲
    ```

## 戻り値

`n`進めたイテレータのコピーを返す。

## 備考

(2)は[*Hidden friends*](/article/lib/hidden_friends.md)として定義される。

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <ranges>
#include <vector>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

  std::counted_iterator ci{std::ranges::begin(vec), 5};

  // (1)
  auto ci2 = ci + 2;

  std::cout << *ci2 << '\n';

  // (2)
  auto ci3 = 4 + ci;

  std::cout << *ci3 << '\n';
}
```
* ranges::begin[link /reference/ranges/begin.md]

### 出力
```
3
5
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 9 [mark verified]

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
