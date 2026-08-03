# partial_gather_from
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class V = /*see below*/, ranges::contiguous_range R,
           simd-integral I, class... Flags>
    requires ranges::sized_range<R>
  constexpr V
    partial_gather_from(R&& in,
                        const I& indices,
                        flags<Flags...> f = {});  // (1) C++26

  template<class V = /*see below*/, ranges::contiguous_range R,
           simd-integral I, class... Flags>
    requires ranges::sized_range<R>
  constexpr V
    partial_gather_from(R&& in,
                        const typename I::mask_type& mask,
                        const I& indices,
                        flags<Flags...> f = {});  // (2) C++26
}
```
* simd-integral[link /reference/simd/simd-integral.md]
* ranges::contiguous_range[link /reference/ranges/contiguous_range.md]
* ranges::sized_range[link /reference/ranges/sized_range.md]

## 概要
連続したメモリ領域`in`から、インデックスを表すデータ並列型`indices`で指定した飛び飛びの位置の要素を集めて（gather）、[`basic_vec`](basic_vec.md)へ読み込む。結果の`i`番目の要素は、`in`の`indices[i]`番目の要素となる。インデックスが範囲外を指す場合でも安全に読み込め、その位置は値初期化された値（`0`など）となる。

- (1) : 全要素を集める
- (2) : `mask`の各要素が`true`である位置の要素のみを集め、`false`の位置は値初期化された値とする

- `V` : 結果のデータ並列型。省略した場合は`vec<std::ranges::range_value_t<R>, I::size()>`が使われる
- `indices` : 各要素が読み込み位置のインデックスを表す、整数要素のデータ並列型
- `f` : gatherの動作を指定する`flags`オブジェクト。既定値は`flag_default`。要素型が異なるメモリからの変換読み込みを許可する`flag_convert`や、メモリのアライメントを仮定する`flag_aligned`／`flag_overaligned<N>`を指定できる

[`unchecked_gather_from`](unchecked_gather_from.md)との違いは、インデックスが`in`の範囲外を指してもよい点である。範囲外の位置は読み込まれず、値初期化される。

## テンプレートパラメータ制約
`std::ranges::range_value_t<R>`が[「vectorizable type」](/reference/simd.md#vectorizable-type)であり、`V::value_type`へ明示的に変換可能であること。

## 適格要件
- `std::ranges::range_value_t<R>`が[「vectorizable type」](/reference/simd.md#vectorizable-type)であること
- `V`が[`basic_vec`](basic_vec.md)の有効な特殊化であること
- `V::size() == I::size()`が`true`であること
- テンプレートパラメータパック`Flags`が`flag_convert`を含まない場合、`std::ranges::range_value_t<R>`から`V::value_type`への変換が値を保存すること

## 事前条件
- `Flags`が`flag_aligned`を含む場合、`std::ranges::data(in)`が`alignment_v<V, std::ranges::range_value_t<R>>`でアライメントされた領域を指すこと
- `Flags`が`flag_overaligned<N>`を含む場合、`std::ranges::data(in)`が`N`でアライメントされた領域を指すこと

## 戻り値
`i`番目の要素が、`0`以上`I::size()`未満の各`i`について以下で初期化された[`basic_vec`](basic_vec.md)オブジェクト。ここで`T`は`V::value_type`である。

```cpp
mask[i] && indices[i] < ranges::size(in) ? static_cast<T>(ranges::data(in)[indices[i]]) : T()
```

## 例
```cpp example
#include <simd>
#include <array>
#include <print>

namespace simd = std::simd;

int main()
{
  std::array<int, 4> data = {10, 11, 12, 13};

  // インデックス {0, 2, 4, 6} のうち、範囲外(4, 6)は値初期化(0)となる
  simd::vec<int, 4> indices([](int i) { return i * 2; });

  auto v = simd::partial_gather_from<simd::vec<int, 4>>(data, indices);

  for (int i = 0; i < v.size(); ++i) {
    std::print("{} ", v[i]);
  }
  std::println("");
}
```
* simd::partial_gather_from[color ff0000]
* simd::vec[link basic_vec.md]
* v.size()[link basic_vec/size.md]

### 出力
```
10 12 0 0 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::unchecked_gather_from`](unchecked_gather_from.md)
- [`std::simd::partial_scatter_to`](partial_scatter_to.md)
- [`std::simd::basic_vec`](basic_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリに追加された
