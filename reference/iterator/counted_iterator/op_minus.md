# operator- (非メンバ関数)
* iterator[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
template<common_with<I> I2>
friend constexpr iter_difference_t<I2> operator-(
  const counted_iterator& x, const counted_iterator<I2>& y);  // (1)

friend constexpr iter_difference_t<I> operator-(
  const counted_iterator& x, default_sentinel_t);             // (2)

friend constexpr iter_difference_t<I> operator-(
  default_sentinel_t, const counted_iterator& y);             // (3)
```

## 概要

イテレータ間あるいは番兵との間の距離を求める。

## 事前条件

- (1) : `x, y`はともに同じシーケンス（範囲）についてのイテレータであること。

## 効果

現在のイテレータとカウントの値をそれぞれ、`current`、`length`メンバ変数に保持するとする。

- (1) : `return y.length - x.length;`
- (2) : `return -x.length;`
- (3) : `return y.length;`

## 戻り値

左辺のイテレータ（番兵）と右辺のイテレータ（番兵）間の距離。

## 備考

これらの関数は全て[*Hidden friends*](/article/lib/hidden_friends.md)として定義される。

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <ranges>
#include <vector>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

  std::counted_iterator ci{std::ranges::begin(vec), 5};
  auto ci2 = ci + 3;

  // (1) イテレータ間距離
  std::cout << (ci2 - ci) << '\n';
  std::cout << (ci - ci2) << '\n';

  // (2) 終端からの距離
  std::cout << (ci - std::default_sentinel) << '\n';

  // (3) 終端までの距離
  std::cout << (std::default_sentinel - ci) << '\n';
}
```

### 出力
```
3
-3
-5
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
