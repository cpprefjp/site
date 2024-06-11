# iter_move
* iterator[meta header]
* std[meta namespace]
* common_iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<input_or_output_iterator I, sentinel_for<I> S>
  class common_iterator {

    friend decltype(auto) iter_move(const common_iterator& i)
      noexcept(noexcept(ranges::iter_move(declval<const I&>())))
        requires input_iterator<I>;
  };
}
```
* input_or_output_iterator[link /reference/iterator/input_or_output_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* ranges::iter_move[link /reference/iterator/iter_move.md]
* input_iterator[link /reference/iterator/input_iterator.md]

## 概要

`common_iterator`の指す要素をムーブする。

## 事前条件

[`holds_alternative`](/reference/variant/holds_alternative.md)`<I>(i.v_) == true`であること。

## 効果

以下と等価

```cpp
return ranges::iter_move(get<I>(i.v_));
```
* ranges::iter_move[link /reference/iterator/iter_move.md]

## 備考

この関数は`move_iterator`のクラス定義内で`friend`関数として定義される。そのため、メンバ関数としても非メンバ関数としても明示的に呼び出すことはできず、ADLによってのみ呼び出すことができる。  
基本的には[`ranges::iter_move`](/reference/iterator/iter_move.md)カスタマイゼーションポイントオブジェクトを通して利用する。

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
1
2
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 9 [mark verified]

## 関連項目

- [`ranges::iter_move`](/reference/iterator/iter_move.md)

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [LWG Issue 3953. `iter_move` for `common_iterator` and `counted_iterator` should return `decltype(auto)`](https://cplusplus.github.io/LWG/issue3953)
