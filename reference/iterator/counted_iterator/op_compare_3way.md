# operator<=> (非メンバ関数)
* iterator[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
template<common_with<I> I2>
friend constexpr strong_ordering operator<=>(const counted_iterator& x, const counted_iterator<I2>& y);
```

## 概要
2つの`counted_iterator`オブジェクトの三方比較を行う。

## 事前条件

- (1) : `x, y`はともに同じシーケンス（範囲）についてのイテレータであること。

## 戻り値

現在のカウントの値を`length`メンバ変数に保持するとして以下と等価

`return y.length <=> x.length;`


## 備考

C++20以降、この演算子により以下の演算子が使用可能になる。

```cpp
template<common_with<I> I2>
friend constexpr strong_ordering operator<=>(const counted_iterator<I2>& y, const counted_iterator& x);

template<common_with<I> I2>
friend constexpr bool operator<(const counted_iterator& x, const counted_iterator<I2>& y);
template<common_with<I> I2>
friend constexpr bool operator>(const counted_iterator& x, const counted_iterator<I2>& y);
template<common_with<I> I2>
friend constexpr bool operator<=(const counted_iterator& x, const counted_iterator<I2>& y);
template<common_with<I> I2>
friend constexpr bool operator>=(const counted_iterator& x, const counted_iterator<I2>& y);

template<common_with<I> I2>
friend constexpr bool operator<(const counted_iterator<I2>& y, const counted_iterator& x);
template<common_with<I> I2>
friend constexpr bool operator>(const counted_iterator<I2>& y, const counted_iterator& x);
template<common_with<I> I2>
friend constexpr bool operator<=(const counted_iterator<I2>& y, const counted_iterator& x);
template<common_with<I> I2>
friend constexpr bool operator>=(const counted_iterator<I2>& y, const counted_iterator& x);
```

また、この演算子は[*Hidden friends*](/article/lib/hidden_friends.md)として定義され、使用可能となる演算子も*Hidden friends*であるかの様に使用可能となる。

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

  std::cout << std::boolalpha;

  std::cout << (ci <=> ci2 < 0) << '\n';

  // <=>から導出される比較演算子
  std::cout << (ci < ci2) << '\n';
  std::cout << (ci > ci2) << '\n';
  std::cout << (ci <= ci2) << '\n';
  std::cout << (ci >= ci2) << '\n';
}
```
* <=>[color ff0000]

### 出力
```
true
true
false
true
false
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
