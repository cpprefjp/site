# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* subrange[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
// (1)
subrange() = default;

// (2)
constexpr subrange(convertible-to-non-slicing<I> auto i, S s) requires (!StoreSize);

// (3)
constexpr subrange(convertible-to-non-slicing<I> auto i, S s, make-unsigned-like-t<iter_difference_t<I>> n)
  requires (K == subrange_kind::sized);

// (4)
template<different-from<subrange> R>
  requires borrowed_range<R> && convertible-to-non-slicing<iterator_t<R>, I> && convertible_to<sentinel_t<R>, S>
constexpr subrange(R&& r) requires (!StoreSize || sized_range<R>);

// (5)
template<borrowed_range R>
  requires convertible-to-non-slicing<iterator_t<R>, I> && convertible_to<sentinel_t<R>, S>
constexpr subrange(R&& r, make-unsigned-like-t<iter_difference_t<I>> n)
  requires (K == subrange_kind::sized) : subrange{ranges::begin(r), ranges::end(r), n} {}
```
* subrange[link ../subrange.md]
* subrange_kind[link /reference/ranges/subrange_kind.md]
* borrowed_range[link /reference/ranges/borrowed_range.md]
* sized_range[link /reference/ranges/sized_range.md]
* convertible_to[link /reference/concepts/convertible_to.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]
* different-from[link ../different-from.md]
* convertible-to-non-slicing[link convertible-to-non-slicing.md]
* make-unsigned-like-t[link /reference/type_traits/make_unsigned.md]
* StoreSize[italic]
* different-from[italic]
* convertible-to-non-slicing[italic]
* make-unsigned-like-t[italic]

## 概要
- (1) : 空の`subrange`を構築する(デフォルトコンストラクタ)
- (2) : イテレータ`i`と番兵`s`が表すイテレータ範囲`[i, s)`で初期化する
- (3) : イテレータ`i`と番兵`s`が表すイテレータ範囲`[i, s)`で初期化し、`subrange`の長さを`n`にする
- (4) : 範囲 `r` で初期化する
- (5) : 範囲 `r` で初期化し、`subrange`の長さを`n`にする ((3)へ委譲)

## テンプレートパラメータ制約

`StoreSize`は次のように定義される説明専用メンバである。

```cpp
static constexpr bool StoreSize = (K == subrange_kind::sized && !sized_sentinel_for<S, I>);
```
* subrange_kind[link /reference/ranges/subrange_kind.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* StoreSize[italic]

`StoreSize`は、元のRangeから長さを求められないが、長さを別に指定することで`subrange`を[`sized_range`](/reference/ranges/sized_range.md)にした場合に真となる。

- (1): `I`はデフォルト構築可能であること
- (2), (4): `subrange`が`sized`ではない。または、元のRangeから長さを求められる
- (3), (5): `subrange`が`sized`であり、元のRangeから長さを求められない
- (4): 範囲は構築する`subrange`と同じ型ではない (つまり、(4)はムーブコンストラクタではない)

## 事前条件

- (2): `[i, s)`は有効なイテレータ範囲であること
- (3): `[i, s)`は有効なイテレータ範囲であり、`n`はその範囲の長さ([`ranges::distance`](/reference/iterator/ranges_distance.md)`(i, s)`)と等しいこと
- (4): `r`は有効な範囲であること
- (5): `r`は有効な範囲であり、`n`はその範囲の長さと等しいこと

## 効果
`subrange`が内部で保持するイテレータと番兵を与えられた範囲で初期化する。
さらに、`StoreSize`が真のときは大きさを与えられた値で初期化する。

## 備考

`subrange`はコピー、ムーブ可能である。また、テンプレート引数が異なる`subrange`からは、(4)によって構築できる。

## 例
```cpp example
#include <cassert>
#include <ranges>
#include <forward_list>
#include <array>

int main()
{
  constexpr std::ranges::subrange<int*, int*, std::ranges::subrange_kind::sized> sub1;
  static_assert(sub1.empty());

  constexpr std::array arr= {1, 2, 3};
  const std::ranges::subrange sub2(arr.begin(), arr.begin() + 1);
  assert(sub2.size() == 1);

  const std::forward_list fwl = {1, 2, 3};
  const std::ranges::subrange sub3(fwl.begin(), ++fwl.begin(), 1);
  // forward_listはsized_rangeではないが、長さを指定しているのでsubrangeはsized_rangeとなり、sizeメンバ関数が定義される
  static_assert(std::ranges::sized_range<decltype(sub3)>);
  assert(sub3.size() == 1);

  const std::ranges::subrange sub4 = arr;
  assert(sub4.size() == 3);

  const std::ranges::subrange sub5(fwl, 3);
  // forward_listはsized_rangeではないが、長さを指定しているのでsubrangeはsized_rangeとなり、sizeメンバ関数が定義される
  static_assert(std::ranges::sized_range<decltype(sub5)>);
  assert(sub4.size() == 3);
}
```

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [P2367R0 Remove misuses of list-initialization from Clause 24](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2367r0.html) (本提案文書はC++20に遡って適用されている)
- [LWG 3281 Conversion from `pair-like` types to `subrange` is a silent semantic promotion](https://cplusplus.github.io/LWG/issue3281)
- [LWG 3282 `subrange` converting constructor should disallow derived to base conversions](https://cplusplus.github.io/LWG/issue3282)
