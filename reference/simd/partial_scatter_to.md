# partial_scatter_to
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
    partial_scatter_to(const V& v,
                       R&& out,
                       const I& indices,
                       flags<Flags...> f = {});  // (1) C++26

  template<simd-vec-type V,
           ranges::contiguous_range R,
           simd-integral I,
           class... Flags>
    requires ranges::sized_range<R>
  constexpr void
    partial_scatter_to(const V& v,
                       R&& out,
                       const typename I::mask_type& mask,
                       const I& indices,
                       flags<Flags...> f = {});  // (2) C++26
}
```
* simd-vec-type[link /reference/simd/simd-vec-type.md]
* simd-integral[link /reference/simd/simd-integral.md]
* ranges::contiguous_range[link /reference/ranges/contiguous_range.md]
* ranges::sized_range[link /reference/ranges/sized_range.md]

## 概要
[`basic_vec`](basic_vec.md)の各要素を、インデックスを表すデータ並列型`indices`で指定した連続メモリ領域`out`の飛び飛びの位置へ書き出す（scatter）。`v`の`i`番目の要素は、`out`の`indices[i]`番目の位置へ書き込まれる。インデックスが範囲外を指す場合でも安全に書き出せ、その位置へは書き込まれない。

- (1) : 全要素を書き出す
- (2) : `mask`の各要素が`true`である位置の要素のみを書き出す

- `v` : scatterするデータ並列型の値
- `indices` : 各要素が書き込み位置のインデックスを表す、整数要素のデータ並列型
- `f` : scatterの動作を指定する`flags`オブジェクト。既定値は`flag_default`。要素型が異なるメモリへの変換書き込みを許可する`flag_convert`や、メモリのアライメントを仮定する`flag_aligned`／`flag_overaligned<N>`を指定できる

[`unchecked_scatter_to`](unchecked_scatter_to.md)との違いは、インデックスが`out`の範囲外を指してもよい点である。範囲外の位置へは書き込まれない。

## テンプレートパラメータ制約
- `V::size() == I::size()`が`true`であること
- `std::ranges::iterator_t<R>`が`std::indirectly_writable<std::ranges::range_value_t<R>>`のモデルであること
- `V::value_type`が`std::ranges::range_value_t<R>`へ明示的に変換可能であること

## 適格要件
- `std::ranges::range_value_t<R>`が[「vectorizable type」](/reference/simd.md#vectorizable-type)であること
- テンプレートパラメータパック`Flags`が`flag_convert`を含まない場合、`V::value_type`から`std::ranges::range_value_t<R>`への変換が値を保存すること

## 事前条件
- 選択されたすべてのインデックス`i`について、`indices[i]`の値が一意であること
- `Flags`が`flag_aligned`を含む場合、`std::ranges::data(out)`が`alignment_v<V, std::ranges::range_value_t<R>>`でアライメントされた領域を指すこと
- `Flags`が`flag_overaligned<N>`を含む場合、`std::ranges::data(out)`が`N`でアライメントされた領域を指すこと

## 効果
`0`以上`I::size()`未満の各`i`について、`mask[i] && (indices[i] < std::ranges::size(out))`が`true`であれば、以下を評価する。

```cpp
ranges::data(out)[indices[i]] = static_cast<ranges::range_value_t<R>>(v[i]);
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

  // インデックス {0, 2, 4, 6} のうち、範囲外(4, 6)へは書き込まれない
  simd::vec<int, 4> indices([](int i) { return i * 2; });

  std::array<int, 4> out{};
  simd::partial_scatter_to(v, out, indices);

  for (int x : out) {
    std::print("{} ", x);
  }
  std::println("");
}
```
* simd::partial_scatter_to[color ff0000]
* simd::vec[link basic_vec.md]

### 出力
```
10 0 20 0 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::unchecked_scatter_to`](unchecked_scatter_to.md)
- [`std::simd::partial_gather_from`](partial_gather_from.md)
- [`std::simd::basic_vec`](basic_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリに追加された
