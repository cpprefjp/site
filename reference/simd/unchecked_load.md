# unchecked_load
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class V = /*see below*/,
           ranges::contiguous_range R,
           class... Flags>
    requires ranges::sized_range<R>
  constexpr V
    unchecked_load(R&& r,
                   flags<Flags...> f = {}); // (1) C++26

  template<class V = /*see below*/,
           ranges::contiguous_range R,
           class... Flags>
    requires ranges::sized_range<R>
  constexpr V
    unchecked_load(R&& r,
                   const typename V::mask_type& mask,
                   flags<Flags...> f = {}); // (2) C++26

  template<class V = /*see below*/,
           contiguous_iterator I,
           class... Flags>
  constexpr V
    unchecked_load(I first,
                   iter_difference_t<I> n,
                   flags<Flags...> f = {}); // (3) C++26

  template<class V = /*see below*/,
           contiguous_iterator I,
           class... Flags>
  constexpr V
    unchecked_load(I first,
                   iter_difference_t<I> n,
                   const typename V::mask_type& mask,
                   flags<Flags...> f = {}); // (4) C++26

  template<class V = /*see below*/,
           contiguous_iterator I,
           sized_sentinel_for<I> S,
           class... Flags>
  constexpr V
    unchecked_load(I first,
                   S last,
                   flags<Flags...> f = {}); // (5) C++26

  template<class V = /*see below*/,
           contiguous_iterator I,
           sized_sentinel_for<I> S,
           class... Flags>
  constexpr V
    unchecked_load(I first,
                   S last,
                   const typename V::mask_type& mask,
                   flags<Flags...> f = {}); // (6) C++26
}
```
* ranges::contiguous_range[link /reference/ranges/contiguous_range.md]
* ranges::sized_range[link /reference/ranges/sized_range.md]
* contiguous_iterator[link /reference/iterator/contiguous_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]

## 概要
連続したメモリ領域から[`basic_vec`](basic_vec.md)へ、要素をまとめて読み込む。境界チェックをおこなわない高速な読み込みである。

入力範囲の指定方法によって、以下のオーバーロードがある。

- (1), (2) : 連続範囲`r`（[`std::vector`](/reference/vector/vector.md)や[`std::array`](/reference/array/array.md)、[`std::span`](/reference/span/span.md)など）から読み込む
- (3), (4) : 先頭イテレータ`first`と要素数`n`で指定した範囲から読み込む
- (5), (6) : 先頭イテレータ`first`と番兵`last`で指定した範囲から読み込む

`mask`を受け取るオーバーロード (2), (4), (6) は、マスクの各要素が`true`である位置の要素のみを読み込み、`false`の位置は値初期化された値（`0`など）とする。

- `V` : 結果のデータ並列型。省略した場合は`basic_vec<std::ranges::range_value_t<R>>`（先頭イテレータ版では`basic_vec<iter_value_t<I>>`）が使われる
- `f` : 読み込みの動作を指定する`flags`オブジェクト。既定値は`flag_default`。要素型が異なるメモリからの変換読み込みを許可する`flag_convert`や、メモリのアライメントを仮定してより効率的な読み込みをおこなう`flag_aligned`／`flag_overaligned<N>`を指定できる

## 適格要件
`std::ranges::size(r)`が定数式である場合、`std::ranges::size(r) >= V::size()`であること。

## 事前条件
- (3), (4) : 範囲`[first, first + n)`が有効な範囲であること
- (5), (6) : 範囲`[first, last)`が有効な範囲であること
- すべてのオーバーロードにおいて、`std::ranges::size(r) >= V::size()`であること。すなわち、入力範囲の要素数が結果の要素数以上であること

## 効果
[`partial_load`](partial_load.md)`<V>(r, mask, f)`を返すことと等価である。ただし`mask`を受け取らないオーバーロードでは`mask`は`V::mask_type(true)`（すべて`true`）とみなす。

## 戻り値
読み込んだ結果の[`basic_vec`](basic_vec.md)オブジェクト。

## 例
```cpp example
#include <simd>
#include <array>
#include <print>

namespace simd = std::simd;

int main()
{
  std::array<int, 4> data = {1, 2, 3, 4};

  // 配列からデータ並列型へ読み込む
  auto v = simd::unchecked_load<simd::vec<int, 4>>(data);

  for (int i = 0; i < v.size(); ++i) {
    std::print("{} ", v[i]);
  }
  std::println("");
}
```
* simd::unchecked_load[color ff0000]
* simd::vec[link basic_vec.md]
* v.size()[link basic_vec/size.md]

### 出力
```
1 2 3 4 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::partial_load`](partial_load.md)
- [`std::simd::unchecked_store`](unchecked_store.md)
- [`std::simd::basic_vec`](basic_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリに追加された
