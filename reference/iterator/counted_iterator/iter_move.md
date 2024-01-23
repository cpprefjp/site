# iter_move (非メンバ関数)
* iterator[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  friend constexpr decltype(auto)
    iter_move(const counted_iterator& i) noexcept(noexcept(ranges::iter_move(i.current)))
      requires input_iterator<I>;
}
```
* ranges::iter_move[link /reference/iterator/iter_move.md]
* input_iterator[link /reference/iterator/input_iterator.md]

## 概要

`counted_iterator`の指す要素をムーブする。

## 事前条件

カウントの値を`length`メンバ変数に保持するとして

`length >= 0`

## 効果

以下と等価

```cpp
return ranges::iter_move(i.current);
```
* ranges::iter_move[link /reference/iterator/iter_move.md]

## 備考

この関数は[*Hidden friends*](/article/lib/hidden_friends.md)として定義される。  
基本的には[`ranges::iter_move`](/reference/iterator/iter_move.md)カスタマイゼーションポイントオブジェクトを通して利用する。

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <ranges>
#include <vector>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

  std::counted_iterator ci{std::ranges::begin(vec) + 3, 5};

  // ADLによる呼び出し
  int n1 = iter_move(ci);
  std::cout << n1 << std::endl;

  ++ci;

  // ranges::iter_move CPOによる呼び出し
  int n2 = std::ranges::iter_move(ci);
  std::cout << n2 << std::endl;
}
```
* iter_move[color ff0000]
* ranges::iter_move[link /reference/iterator/iter_move.md]

### 出力
```
4
5
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 9

## 関連項目

- [`ranges::iter_move`](/reference/iterator/iter_move.md)

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [LWG Issue 3472. `counted_iterator` is missing preconditions](https://cplusplus.github.io/LWG/issue3472)
- [LWG Issue 3953. `iter_move` for `common_iterator` and `counted_iterator` should return `decltype(auto)`](https://cplusplus.github.io/LWG/issue3953)
