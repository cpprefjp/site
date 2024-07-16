# iter_swap
* iterator[meta header]
* std[meta namespace]
* common_iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<input_or_output_iterator I, sentinel_for<I> S>
  class common_iterator {

    template<indirectly_swappable<I> I2, class S2>
    friend void iter_swap(const common_iterator& x, const common_iterator<I2, S2>& y)
      noexcept(noexcept(ranges::iter_swap(declval<const I&>(), declval<const I2&>())));
  };
}
```
* input_or_output_iterator[link /reference/iterator/input_or_output_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* indirectly_swappable[link /reference/iterator/indirectly_swappable.md]

## 概要

2つの`common_iterator`の指す要素を交換する。

## 事前条件

[`holds_alternative`](/reference/variant/holds_alternative.md)`<I>(x.v_)`、[`holds_alternative`](/reference/variant/holds_alternative.md)`<I2>(y.v_)`はどちらも`true`であること。

## 効果

以下と等価

```cpp
return ranges::iter_swap(get<I>(x.v_), get<I2>(y.v_));
```
* ranges::iter_swap[link /reference/iterator/iter_swap.md]

## 備考

この関数は`common_iterator`のクラス定義内で`friend`関数として定義される。そのため、メンバ関数としても非メンバ関数としても明示的に呼び出すことはできず、ADLによってのみ呼び出すことができる。 
基本的には[`ranges::iter_swap`](/reference/iterator/iter_swap.md)カスタマイゼーションポイントオブジェクトを通して利用する。

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <ranges>
#include <vector>

int main() {
  std::vector<int> v1 = {1, 2, 3, 4, 5};
  std::vector<int> v2 = {6, 7, 8, 9, 10};

  // common_iteratorを通すことでイテレータ型と番兵型を合わせる
  using CI = std::common_iterator<std::counted_iterator<std::vector<int>::iterator>, std::default_sentinel_t>;

  CI ci1{std::counted_iterator{std::ranges::begin(v1), 2}};
  CI ci2{std::counted_iterator{std::ranges::begin(v2), 2}};

  // ADLによる呼び出し
  iter_swap(ci1, ci2);

  ++ci1;
  ++ci2;

  // ranges::iter_swap CPOによる呼び出し
  std::ranges::iter_swap(ci1, ci2);

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
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 9 [mark verified]

## 関連項目

- [`ranges::iter_swap`](/reference/iterator/iter_swap.md)

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
