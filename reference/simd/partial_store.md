# partial_store
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
    partial_store(const basic_vec<T, Abi>& v,
                  R&& r,
                  flags<Flags...> f = {});  // (1) C++26

  template<class T,
           class Abi,
           ranges::contiguous_range R,
           class... Flags>
    requires ranges::sized_range<R>
  constexpr void
    partial_store(const basic_vec<T, Abi>& v,
                  R&& r,
                  const typename basic_vec<T, Abi>::mask_type& mask,
                  flags<Flags...> f = {});  // (2) C++26

  template<class T,
           class Abi,
           contiguous_iterator I,
           class... Flags>
  constexpr void
    partial_store(const basic_vec<T, Abi>& v,
                  I first,
                  iter_difference_t<I> n,
                  flags<Flags...> f = {});  // (3) C++26

  template<class T,
           class Abi,
           contiguous_iterator I,
           class... Flags>
  constexpr void
    partial_store(const basic_vec<T, Abi>& v,
                  I first,
                  iter_difference_t<I> n,
                  const typename basic_vec<T, Abi>::mask_type& mask,
                  flags<Flags...> f = {});  // (4) C++26

  template<class T,
           class Abi,
           contiguous_iterator I,
           sized_sentinel_for<I> S,
           class... Flags>
  constexpr void
    partial_store(const basic_vec<T, Abi>& v,
                  I first,
                  S last,
                  flags<Flags...> f = {});  // (5) C++26

  template<class T,
           class Abi,
           contiguous_iterator I,
           sized_sentinel_for<I> S,
           class... Flags>
  constexpr void
    partial_store(const basic_vec<T, Abi>& v,
                  I first,
                  S last,
                  const typename basic_vec<T, Abi>::mask_type& mask,
                  flags<Flags...> f = {});  // (6) C++26
}
```
* ranges::contiguous_range[link /reference/ranges/contiguous_range.md]
* ranges::sized_range[link /reference/ranges/sized_range.md]
* contiguous_iterator[link /reference/iterator/contiguous_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]

## 概要
[`basic_vec`](basic_vec.md)の要素を、連続したメモリ領域へまとめて書き込む。出力範囲の要素数が値の要素数に満たない場合でも安全に書き込め、範囲を超える位置の要素は書き込まれない。

出力範囲の指定方法によって、以下のオーバーロードがある。

- (1), (2) : 連続範囲`r`（[`std::vector`](/reference/vector/vector.md)や[`std::array`](/reference/array/array.md)、[`std::span`](/reference/span/span.md)など）へ書き込む
- (3), (4) : 先頭イテレータ`first`と要素数`n`で指定した範囲へ書き込む
- (5), (6) : 先頭イテレータ`first`と番兵`last`で指定した範囲へ書き込む

`mask`を受け取るオーバーロード (2), (4), (6) は、マスクの各要素が`true`である位置の要素のみを書き込む。

- `v` : 書き込むデータ並列型の値
- `f` : 書き込みの動作を指定する`flags`オブジェクト。既定値は`flag_default`。要素型が異なるメモリへの変換書き込みを許可する`flag_convert`や、メモリのアライメントを仮定してより効率的な書き込みをおこなう`flag_aligned`／`flag_overaligned<N>`を指定できる

[`unchecked_store`](unchecked_store.md)との違いは、出力範囲の要素数が値の要素数より小さくてもよい点である。範囲外の位置へは書き込まれない。

## テンプレートパラメータ制約
- `std::ranges::iterator_t<R>`が`std::indirectly_writable<std::ranges::range_value_t<R>>`のモデルであること
- `T`が`std::ranges::range_value_t<R>`へ明示的に変換可能であること

## 適格要件
- `std::ranges::range_value_t<R>`が[「vectorizable type」](/reference/simd.md#vectorizable-type)であること
- テンプレートパラメータパック`Flags`が`flag_convert`を含まない場合、`T`から`std::ranges::range_value_t<R>`への変換が値を保存すること

## 事前条件
- (3), (4) : 範囲`[first, first + n)`が有効な範囲であること
- (5), (6) : 範囲`[first, last)`が有効な範囲であること
- `Flags`が`flag_aligned`を含む場合、`std::ranges::data(r)`が`alignment_v<basic_vec<T, Abi>, std::ranges::range_value_t<R>>`でアライメントされた領域を指すこと
- `Flags`が`flag_overaligned<N>`を含む場合、`std::ranges::data(r)`が`N`でアライメントされた領域を指すこと

## 効果
`0`以上`basic_vec<T, Abi>::size()`未満の各`i`について、`mask[i] && i < std::ranges::size(r)`が`true`であれば、以下を評価する。

```cpp
ranges::data(r)[i] = static_cast<ranges::range_value_t<R>>(v[i]);
```

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

  // 出力範囲(2要素)は値の要素数(4)より小さくてもよい
  std::array<int, 2> data{};
  simd::partial_store(v, data);

  for (int x : data) {
    std::print("{} ", x);
  }
  std::println("");
}
```
* simd::partial_store[color ff0000]
* simd::vec[link basic_vec.md]

### 出力
```
10 20 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::unchecked_store`](unchecked_store.md)
- [`std::simd::partial_load`](partial_load.md)
- [`std::simd::basic_vec`](basic_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリに追加された
