# operator==
* iterator[meta header]
* std[meta namespace]
* common_iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<input_or_output_iterator I, sentinel_for<I> S>
  class common_iterator {

    template<class I2, sentinel_for<I> S2>
      requires sentinel_for<S, I2>
    friend bool operator==(const common_iterator& x, const common_iterator<I2, S2>& y);   // (1)

    template<class I2, sentinel_for<I> S2>
      requires sentinel_for<S, I2> && equality_comparable_with<I, I2>
    friend bool operator==(const common_iterator& x, const common_iterator<I2, S2>& y);   // (2)
  };
}
```
* input_or_output_iterator[link /reference/iterator/input_or_output_iterator.md]
* equality_comparable_with[link /reference/concepts/equality_comparable.md]

## 概要
2つの`common_iterator`オブジェクトが同じ要素を指しているかを判定する。

## 事前条件

`x.v_.`[`valueless_by_exception`](/reference/variant/variant/valueless_by_exception.md)`()`、`y.v_.`[`valueless_by_exception`](/reference/variant/variant/valueless_by_exception.md)`()`はどちらも`false`であること。

## 戻り値

`I, S`（`I2, S2`）の値のどちらかを[`variant<I, S>`](/reference/variant/variant.md)型のメンバ変数`v_`に保持しており、`i = x.v_.`[`index()`](/reference/variant/variant/index.md)、`j = y.v_.`[`index()`](/reference/variant/variant/index.md)として

- (1)
    - `i == j`の場合 : `true`
    - それ以外の場合 : `get<i>(x.v_) == get<j>(y.v_)`
- (2)
    - `i, j`がどちらも`1`の場合 : `true`
    - それ以外の場合 : `get<i>(x.v_) == get<j>(y.v_)`


## 備考

C++20以降、これらの演算子により以下の演算子が使用可能になる（制約は使用する`==`に準ずる）。

```cpp
template<class I2, sentinel_for<I> S2>
friend bool operator==(const common_iterator<I2, S2>& y, const common_iterator& x);

template<class I2, sentinel_for<I> S2>
friend bool operator!=(const common_iterator& x, const common_iterator<I2, S2>& y);

template<class I2, sentinel_for<I> S2>
friend bool operator!=(const common_iterator<I2, S2>& y, const common_iterator& x);
```

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <ranges>

int main() {
  auto seq = std::views::iota(1) | std::views::take(5);

  // common_iteratorを通すことでイテレータ型と番兵型を合わせる
  using CI = std::common_iterator<std::ranges::iterator_t<decltype(seq)>, std::ranges::sentinel_t<decltype(seq)>>;

  CI ci{std::ranges::begin(seq)};
  CI ce{std::ranges::end(seq)};
  auto ci2 = ci++;
  
  std::cout << std::boolalpha;
  
  std::cout << (ci == ci2) << std::endl;
  std::cout << (ci == ce) << std::endl;

  // ==から導出される!=
  std::cout << (ci != ci2) << std::endl;
  std::cout << (ci != ce) << std::endl;
}
```
* views::iota[link /reference/ranges/iota_view.md]
* views::take[link /reference/ranges/take_view.md]

### 出力
```
false
false
true
true
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
