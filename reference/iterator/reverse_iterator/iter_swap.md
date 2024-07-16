# iter_swap
* iterator[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class Iterator>
  class reverse_iterator {

    template<indirectly_swappable<Iterator> Iterator2>
    friend constexpr void
      iter_swap(const reverse_iterator& x,
              const reverse_iterator<Iterator2>& y) noexcept(see below);
  };
}
```
* see below[italic]
* reverse_iterator[link /reference/iterator/reverse_iterator.md]
* indirectly_swappable[link /reference/iterator/indirectly_swappable.md]

## 概要

逆順イテレータ`x, y`の指す要素を交換する。

## 効果

以下と等価

```cpp
auto xtmp = x.base();
auto ytmp = y.base();
ranges::iter_swap(--xtmp, --ytmp);
```
* base[link /reference/iterator/reverse_iterator/base.md]
* ranges::iter_swap[link /reference/iterator/iter_swap.md]

## 例外

以下の式が指定される

```cpp
is_nothrow_copy_constructible_v<Iterator> &&
is_nothrow_copy_constructible_v<Iterator2> &&
noexcept(ranges::iter_swap(--declval<Iterator&>(), --declval<Iterator2&>()))
```
* is_nothrow_copy_constructible_v[link /reference/type_traits/is_nothrow_copy_constructible.md]
* ranges::iter_swap[link /reference/iterator/iter_swap.md]

## 備考

この関数は`reverse_iterator`のクラス定義内で`friend`関数として定義される。そのため、メンバ関数としても非メンバ関数としても明示的に呼び出すことはできず、ADLによってのみ呼び出すことができる。  
基本的には[`ranges::iter_swap`](/reference/iterator/iter_swap.md)カスタマイゼーションポイントオブジェクトを通して利用する。

## 例
```cpp example
#include <iterator>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};
  int array[] = {6, 7, 8, 9, 10};

  std::reverse_iterator<decltype(v)::iterator> it1(v.end());
  std::reverse_iterator<int*> it2(std::ranges::end(array));

  // ADLによる呼び出し
  iter_swap(it1, it2);

  ++it1;
  ++it2;

  // ranges::iter_swap CPOによる呼び出し
  std::ranges::iter_swap(it1, it2);

  for (int n : v) {
    std::cout << n << ' ';
  }

  std::cout << '\n';

  for (int n : array) {
    std::cout << n << ' ';
  }
}
```
* iter_swap[color ff0000]
* ranges::iter_swap[link /reference/iterator/iter_swap.md]

### 出力
```
1 2 3 9 10 
6 7 8 4 5 
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 6 [mark verified]

## 関連項目

- [`ranges::iter_swap`](/reference/iterator/iter_swap.md)

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
