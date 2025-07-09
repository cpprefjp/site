# コンストラクタ
* iterator[meta header]
* std[meta namespace]
* common_iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr common_iterator() requires default_initializable<I> = default;  // (1)

constexpr common_iterator(I i);                               // (2)

constexpr common_iterator(S s);                               // (3)

template<class I2, class S2>
  requires convertible_to<const I2&, I> &&
           convertible_to<const S2&, S>
constexpr common_iterator(const common_iterator<I2, S2>& x);  // (4)
```

## 概要

`common_iterator`オブジェクトを構築する。

## 事前条件

- (4) : `x.v_.`[`valueless_by_exception`](/reference/variant/variant/valueless_by_exception.md)`() == false`であること。


## 効果

`I, S`の値のどちらかを[`variant<I, S>`](/reference/variant/variant.md)型のメンバ変数`v_`に保持するとする。

- (1) : `v_`をデフォルト構築（`I`をデフォルト構築して初期化）する。
- (2) : `v_{`[`in_place_type`](/reference/utility/in_place_type_t.md)`<I>, std::move(i)}`が行われたかのように`v_`を初期化する。
- (3) : `v_{`[`in_place_type`](/reference/utility/in_place_type_t.md)`<S>, std::move(s)}`が行われたかのように`v_`を初期化する。
- (4) : `i = x.v_.`[`index()`](/reference/variant/variant/index.md)として、`v_{`[`in_place_index`](/reference/utility/in_place_index_t.md)`<i>, get<i>(x.v_)}`が行われたかのように`v_`を初期化する。

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <ranges>

int main() {
  auto seq = std::views::iota(1) | std::views::take(5);

  using CI = std::common_iterator<std::ranges::iterator_t<decltype(seq)>, std::ranges::sentinel_t<decltype(seq)>>;

  auto i = std::ranges::begin(seq);
  auto s = std::ranges::end(seq);

  // (1) デフォルトコンストラクタ
  CI ci1{};

  // (2) イテレータから構築
  CI ci2{i};

  // (3) 番兵から構築
  CI ci3{s};

  // (3) コピーコンストラクタ
  CI ci4{ci2};
}
```
* std::common_iterator[color ff0000]
* views::iota[link /reference/ranges/iota_view.md]
* views::take[link /reference/ranges/take_view.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 9 [mark verified]

## 関連項目

- [`variant` コンストラクタ](/reference/variant/variant/op_constructor.md)

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [P2325R3 Views should not be required to be default constructible](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2325r3.html)
