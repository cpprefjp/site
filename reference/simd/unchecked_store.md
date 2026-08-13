# unchecked_store
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class T,
           class Abi,
           ranges::contiguous_range R,
           class... Flags>
    requires ranges::sized_range<R>
  constexpr void
    unchecked_store(const basic_vec<T, Abi>& v,
                    R&& r,
                    flags<Flags...> f = {}); // (1) C++26

  template<class T,
           class Abi,
           ranges::contiguous_range R,
           class... Flags>
    requires ranges::sized_range<R>
  constexpr void
    unchecked_store(const basic_vec<T, Abi>& v,
                    R&& r,
                    const typename basic_vec<T, Abi>::mask_type& mask,
                    flags<Flags...> f = {}); // (2) C++26

  template<class T,
           class Abi,
           contiguous_iterator I,
           class... Flags>
  constexpr void
    unchecked_store(const basic_vec<T, Abi>& v,
                    I first,
                    iter_difference_t<I> n,
                    flags<Flags...> f = {}); // (3) C++26

  template<class T,
           class Abi,
           contiguous_iterator I,
           class... Flags>
  constexpr void
    unchecked_store(const basic_vec<T, Abi>& v,
                    I first,
                    iter_difference_t<I> n,
                    const typename basic_vec<T, Abi>::mask_type& mask,
                    flags<Flags...> f = {}); // (4) C++26

  template<class T,
           class Abi,
           contiguous_iterator I,
           sized_sentinel_for<I> S,
           class... Flags>
  constexpr void
    unchecked_store(const basic_vec<T, Abi>& v,
                    I first,
                    S last,
                    flags<Flags...> f = {}); // (5) C++26

  template<class T,
           class Abi,
           contiguous_iterator I,
           sized_sentinel_for<I> S,
           class... Flags>
  constexpr void
    unchecked_store(const basic_vec<T, Abi>& v,
                    I first,
                    S last,
                    const typename basic_vec<T, Abi>::mask_type& mask,
                    flags<Flags...> f = {}); // (6) C++26
}
```
* ranges::contiguous_range[link /reference/ranges/contiguous_range.md]
* ranges::sized_range[link /reference/ranges/sized_range.md]
* contiguous_iterator[link /reference/iterator/contiguous_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]

## 概要
[`basic_vec`](basic_vec.md)の全要素を、連続したメモリ領域へまとめて書き込む。境界チェックをおこなわない高速な書き込みである。

出力範囲の指定方法によって、以下のオーバーロードがある。

- (1), (2) : 連続範囲`r`（[`std::vector`](/reference/vector/vector.md)や[`std::array`](/reference/array/array.md)、[`std::span`](/reference/span/span.md)など）へ書き込む
- (3), (4) : 先頭イテレータ`first`と要素数`n`で指定した範囲へ書き込む
- (5), (6) : 先頭イテレータ`first`と番兵`last`で指定した範囲へ書き込む

`mask`を受け取るオーバーロード (2), (4), (6) は、マスクの各要素が`true`である位置の要素のみを書き込む。

- `v` : 書き込むデータ並列型の値
- `f` : 書き込みの動作を指定する`flags`オブジェクト。既定値は`flag_default`。要素型が異なるメモリへの変換書き込みを許可する`flag_convert`や、メモリのアライメントを仮定してより効率的な書き込みをおこなう`flag_aligned`／`flag_overaligned<N>`を指定できる

## 適格要件
`std::ranges::size(r)`が定数式である場合、`std::ranges::size(r) >= simd-size-v<T, Abi>`であること。

## 事前条件
- (3), (4) : 範囲`[first, first + n)`が有効な範囲であること
- (5), (6) : 範囲`[first, last)`が有効な範囲であること
- すべてのオーバーロードにおいて、`std::ranges::size(r) >= simd-size-v<T, Abi>`であること。すなわち、出力範囲の要素数が書き込む値の要素数以上であること

## 効果
[`partial_store`](partial_store.md)`(v, r, mask, f)`と等価である。ただし`mask`を受け取らないオーバーロードでは`mask`は`basic_vec<T, Abi>::mask_type(true)`（すべて`true`）とみなす。

## 戻り値
なし。

## 例
```cpp example
#include <simd>
#include <array>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> v([](int i) { return (i + 1) * 10; }); // {10, 20, 30, 40}

  // データ並列型を配列へ書き込む
  std::array<int, 4> data{};
  simd::unchecked_store(v, data);

  for (int x : data) {
    std::print("{} ", x);
  }
  std::println("");
}
```
* simd::unchecked_store[color ff0000]
* simd::vec[link basic_vec.md]

### 出力
```
10 20 30 40 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::partial_store`](partial_store.md)
- [`std::simd::unchecked_load`](unchecked_load.md)
- [`std::simd::basic_vec`](basic_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリに追加された
- [LWG Issue 4420. §[simd] conversions (constructor, load, stores, gather, and scatter) are incorrectly constrained for `<stdfloat>` types](https://cplusplus.github.io/LWG/issue4420)
    - C++26で、要素型が異なるメモリへの書き込みで、`static_cast`による明示的変換を正しく扱うよう修正された（効果は`partial_store`に委譲）
