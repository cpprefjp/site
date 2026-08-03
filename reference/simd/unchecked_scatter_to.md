# unchecked_scatter_to
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<simd-vec-type V,
           ranges::contiguous_range R,
           simd-integral I,
           class... Flags>
    requires ranges::sized_range<R>
  constexpr void
    unchecked_scatter_to(const V& v,
                         R&& out,
                         const I& indices,
                         flags<Flags...> f = {}); // (1) C++26

  template<simd-vec-type V,
           ranges::contiguous_range R,
           simd-integral I,
           class... Flags>
    requires ranges::sized_range<R>
  constexpr void
    unchecked_scatter_to(const V& v,
                         R&& out,
                         const typename I::mask_type& mask,
                         const I& indices,
                         flags<Flags...> f = {}); // (2) C++26
}
```
* simd-vec-type[link /reference/simd/simd-vec-type.md]
* simd-integral[link /reference/simd/simd-integral.md]
* ranges::contiguous_range[link /reference/ranges/contiguous_range.md]
* ranges::sized_range[link /reference/ranges/sized_range.md]

## 概要
[`basic_vec`](basic_vec.md)の各要素を、インデックスを表すデータ並列型`indices`で指定した連続メモリ領域`out`の飛び飛びの位置へ書き出す（scatter）。`v`の`i`番目の要素は、`out`の`indices[i]`番目の位置へ書き込まれる。境界チェックをおこなわない高速なscatterである。

- (1) : 全要素を書き出す
- (2) : `mask`の各要素が`true`である位置の要素のみを書き出す

- `v` : scatterするデータ並列型の値
- `indices` : 各要素が書き込み位置のインデックスを表す、整数要素のデータ並列型
- `f` : scatterの動作を指定する`flags`オブジェクト。既定値は`flag_default`。要素型が異なるメモリへの変換書き込みを許可する`flag_convert`や、メモリのアライメントを仮定する`flag_aligned`／`flag_overaligned<N>`を指定できる

## 事前条件
`select(mask, indices, typename I::value_type())`のすべての値が、範囲`[0, std::ranges::size(out))`に含まれること。

## 効果
[`partial_scatter_to`](partial_scatter_to.md)`(v, out, mask, indices, f)`と等価である。ただし (1) では`mask`は`typename I::mask_type(true)`（すべて`true`）とみなす。

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

  // インデックス {0, 2, 4, 6} の位置へ書き出す
  simd::vec<int, 4> indices([](int i) { return i * 2; });

  std::array<int, 8> out{};
  simd::unchecked_scatter_to(v, out, indices);

  for (int x : out) {
    std::print("{} ", x);
  }
  std::println("");
}
```
* simd::unchecked_scatter_to[color ff0000]
* simd::vec[link basic_vec.md]

### 出力
```
10 0 20 0 30 0 40 0 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::partial_scatter_to`](partial_scatter_to.md)
- [`std::simd::unchecked_gather_from`](unchecked_gather_from.md)
- [`std::simd::basic_vec`](basic_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリに追加された
