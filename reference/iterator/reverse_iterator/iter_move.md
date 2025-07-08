# iter_move
* iterator[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class Iterator>
  class reverse_iterator {

    friend constexpr iter_rvalue_reference_t<Iterator>
      iter_move(const reverse_iterator& i) noexcept(/*see below*/);
  };
}
```
* see below[italic]
* reverse_iterator[link /reference/iterator/reverse_iterator.md]

## 概要

逆順イテレータ`i`の指す要素をムーブする。

## 効果

以下と等価

```cpp
auto tmp = i.base();
return ranges::iter_move(--tmp);
```
* base[link /reference/iterator/reverse_iterator/base.md]

## 例外

以下の式が指定される

```cpp
is_nothrow_copy_constructible_v<Iterator> &&
noexcept(ranges::iter_move(--declval<Iterator&>()))
```
* is_nothrow_copy_constructible_v[link /reference/type_traits/is_nothrow_copy_constructible.md]

## 備考

この関数は`reverse_iterator`のクラス定義内で`friend`関数として定義される。そのため、メンバ関数としても非メンバ関数としても明示的に呼び出すことはできず、ADLによってのみ呼び出すことができる。  
基本的には[`ranges::iter_move`](/reference/iterator/iter_move.md)カスタマイゼーションポイントオブジェクトを通して利用する。

## 例
```cpp example
#include <iterator>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};

  std::reverse_iterator<decltype(v)::iterator> it(v.end());

  // ADLによる呼び出し
  int n1 = iter_move(it);
  std::cout << n1 << std::endl;
  
  ++it;

  // ranges::iter_move CPOによる呼び出し
  int n2 = std::ranges::iter_move(it);
  std::cout << n2 << std::endl;
}
```
* iter_move[color ff0000]

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
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 6 [mark verified]

## 関連項目

- [`ranges::iter_move`](/reference/iterator/iter_move.md)

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
