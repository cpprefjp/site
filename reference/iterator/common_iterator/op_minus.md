# operator-
* iterator[meta header]
* std[meta namespace]
* common_iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<input_or_output_iterator I, sentinel_for<I> S>
  class common_iterator {

    template<sized_sentinel_for<I> I2, sized_sentinel_for<I> S2>
      requires sized_sentinel_for<S, I2>
    friend iter_difference_t<I2> operator-(const common_iterator& x, const common_iterator<I2, S2>& y);
  };
}
```
* input_or_output_iterator[link /reference/iterator/input_or_output_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]

## 概要

2つの`common_iterator`間の距離を求める。

## 事前条件

`x.v_.`[`valueless_by_exception`](/reference/variant/variant/valueless_by_exception.md)`()`、`y.v_.`[`valueless_by_exception`](/reference/variant/variant/valueless_by_exception.md)`()`はどちらも`false`であること。

## 戻り値

`I, S`（`I2, S2`）の値のどちらかを[`variant<I, S>`](/reference/variant/variant.md)型のメンバ変数`v_`に保持しており、`i = x.v_.`[`index()`](/reference/variant/variant/index.md)、`j = y.v_.`[`index()`](/reference/variant/variant/index.md)として、次のどちらか。

- `i, j`がどちらも`1`の場合 : `0`
- それ以外の場合 : `get<i>(x.v_) - get<j>(y.v_)`

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <ranges>
#include <vector>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9};

  // common_iteratorを通すことでイテレータ型と番兵型を合わせる
  using CI = std::common_iterator<std::counted_iterator<std::vector<int>::iterator>, std::default_sentinel_t>;

  CI ci{std::counted_iterator{std::ranges::begin(vec), 5}};
  CI ce{std::default_sentinel};
  auto ci2 = ci++;

  // イテレータとイテレータ
  std::cout << (ci - ci2) << std::endl;
  std::cout << (ci2 - ci) << std::endl;

  // イテレータと番兵
  std::cout << (ci - ce) << std::endl;
  std::cout << (ce - ci) << std::endl;
}
```
* counted_iterator[link /reference/iterator/counted_iterator.md]
* default_sentinel_t[link /reference/iterator/default_sentinel_t.md]
* default_sentinel[link /reference/iterator/default_sentinel_t.md]

### 出力
```
1
-1
-4
4
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
