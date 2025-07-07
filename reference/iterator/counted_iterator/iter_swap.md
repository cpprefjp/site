# iter_swap (非メンバ関数)
* iterator[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<indirectly_swappable<I> I2>
  friend constexpr void
    iter_swap(const counted_iterator& x, const counted_iterator<I2>& y)
      noexcept(noexcept(ranges::iter_swap(x.current, y.current)));
}
```

## 概要

2つの`counted_iterator`の指す要素を交換する。

## 事前条件

カウントの値を`length`メンバ変数に保持するとして

`length >= 0`

## 効果

以下と等価

```cpp
return ranges::iter_swap(x.current, y.current);
```

## 備考

この関数は[*Hidden friends*](/article/lib/hidden_friends.md)として定義される。 
基本的には[`ranges::iter_swap`](/reference/iterator/iter_swap.md)カスタマイゼーションポイントオブジェクトを通して利用する。

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <ranges>
#include <vector>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

  std::counted_iterator ci1{std::ranges::begin(vec), 5};
  std::counted_iterator ci2{std::ranges::begin(vec) + 5, 5};

  // ADLによる呼び出し
  iter_swap(ci1, ci2);

  ++ci1;
  ++ci2;

  // ranges::iter_swap CPOによる呼び出し
  std::ranges::iter_swap(ci1, ci2);
  
  for (int n : vec) {
    std::cout << n << ' ';
  }
}

```
* iter_swap[color ff0000]

### 出力
```
6 7 3 4 5 1 2 8 9 10 
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 9 [mark verified]

## 関連項目

- [`ranges::iter_swap`](/reference/iterator/iter_swap.md)

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [LWG Issue 3472. `counted_iterator` is missing preconditions](https://cplusplus.github.io/LWG/issue3472)
