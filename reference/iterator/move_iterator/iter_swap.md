# iter_swap
* iterator[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class Iterator>
  class move_iterator {

    template<indirectly_swappable<Iterator> Iterator2>
    friend constexpr void
      iter_swap(const move_iterator& x, const move_iterator<Iterator2>& y)
        noexcept(noexcept(ranges::iter_swap(x.current, y.current)));
  };
}
```
* move_iterator[link /reference/iterator/move_iterator.md]
* indirectly_swappable[link /reference/iterator/indirectly_swappable.md]

## 概要

`move_iterator`である`x, y`の指す要素を交換する。

## 効果

以下と等価

```cpp
ranges::iter_swap(x.current, y.current);
```
* ranges::iter_swap[link /reference/iterator/iter_swap.md]

## 戻り値

```cpp
return move_iterator<Iterator>(std::move(i));
```
* move_iterator[link /reference/iterator/move_iterator.md]

## 備考

この関数は`move_iterator`のクラス定義内で`friend`関数として定義される。そのため、メンバ関数としても非メンバ関数としても明示的に呼び出すことはできず、ADLによってのみ呼び出すことができる。 
基本的には[`ranges::iter_swap`](/reference/iterator/iter_swap.md)カスタマイゼーションポイントオブジェクトを通して利用する。

## 例
```cpp example
#include <iterator>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v1 = {1, 2, 3, 4, 5};
  std::vector<int> v2 = {6, 7, 8, 9, 10};

  std::move_iterator<decltype(v2)::iterator> it1(v1.begin());
  std::move_iterator<decltype(v1)::iterator> it2(v2.begin());

  // ADLによる呼び出し
  iter_swap(it1, it2);

  ++it1;
  ++it2;

  // ranges::iter_swap CPOによる呼び出し
  std::ranges::iter_swap(it1, it2);

  for (int n : v1) {
    std::cout << n << ' ';
  }

  std::cout << '\n';

  for (int n : v2) {
    std::cout << n << ' ';
  }
}
```
* iter_swap[color ff0000]
* ranges::iter_swap[link /reference/iterator/iter_swap.md]

### 出力
```
6 7 3 4 5 
1 2 8 9 10 
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 7 [mark verified]

## 関連項目

- [`ranges::iter_swap`](/reference/iterator/iter_swap.md)

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
