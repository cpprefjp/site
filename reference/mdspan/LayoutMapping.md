# LayoutMapping
* cpp23[meta cpp]
* mdspan[meta header]
* named requirement[meta id-type]
* [meta namespace]


## 概要
LayoutMappingは、多次元配列ビュー[`mdspan`](mdspan.md)において多次元インデクスから参照先メモリブロック位置への対応関係（レイアウトマッピング）を定めるクラスが満たすべき要件である。

LayoutMappingを満たすユーザ定義型`layout_custom::mapping<E>`は、常に[レイアウトマッピングポリシー](LayoutMappingPolicy.md)を満たす`layout_custom`の公開メンバ`mapping`クラステンプレートとして定義される。

```cpp
// レイアウトマッピングポリシー
struct layout_custom {
  // レイアウトマッピング
  template<class Extents>
  class mapping {
  public:
    using layout_type = layout_custom;
    using extent_type = Extents;
    // ...
  };
};
```
* Extents[link extents.md]

### レイアウトマッピング特性

レイアウトマッピングによる多次元インデクスからメモリブロック位置への変換は、次の3種類の特性によって記述される。

- Unique特性 : 異なる多次元インデクス値であれば、互いに異なる要素位置へと変換される。
- Exhaustive特性 : 取りうる全ての多次元インデクス値に対応する要素位置を考えたとき、アクセスされうる要素位置に隙間が生じない。
- Strided特性 : 多次元インデクス値`I_n`と各次元ストライド幅`S_n`を用いて、要素位置を式`(I_i * S_i) + ...`により計算できる。

例えば、多次元配列ビュー[`mdspan`](mdspan.md)のデフォルトレイアウトポリシー[`layout_right`](layout_right.md)は3つの特性を全て満たす。
要素数3×2の2次元配列ビュー`mat3x2`における有効な多次元インデクス値`i,j`は`0,0`, `0,1`, `1,0`, `1,1`, `2,0`, `2,1`の6パターンとなり、それぞれ参照先メモリブロック`a`の要素位置`a[0]`, `a[1]`, `a[2]`, `a[3]`, `a[4]`, `a[5]`に対応する。

```cpp
int a[6] = {0, 1, 2, 3, 4, 5};

using Extents = std::extents<size_t, 3, 2>;
std::mdspan<int, Extents> mat3x2{a};
```

- Unique特性 : 異なる多次元インデクス値は、異なる要素位置に対応する。参照先が重複することはない。
- Exhaustive特性 : 全ての多次元インデクス値に対応する要素位置は隣接配置される。
- Strided特性 : 多次元インデクス値`i,j`に対応する要素位置は、ストライド幅`2,1`を用いて`i*2+j*1`と計算できる。


## 要件
LayoutMappingを満たす型`M`は

- `M`は[`copyable`](/reference/concepts/copyable.md)および[`equality_comparable`](/reference/concepts/equality_comparable.md)のモデルであり、かつ
- [`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_constructible.md)`<M>`は`true`であり、かつ
- [`is_nothrow_move_assignable_v`](/reference/type_traits/is_nothrow_move_assignable.md)`<M>`は`true`であり、かつ
- [`is_nothrow_swappable_v`](/reference/type_traits/is_nothrow_swappable.md)`<M>`は`true`であること

型`M`は下記のメンバ型を持つこと

- `M::extents_type` : [`extents`](extents.md)の特殊化
- `M::index_type` : [`extents_type::index_type`](extents.md)
- `M::rank_type` : [`extents_type::rank_type`](extents.md)
- `M::layout_type` : 自クラスを提供する[レイアウトマッピングポリシー型](LayoutMappingPolicy.md)

説明用の変数`m`を`(const) M`の値、パック`i`を[`M::extents_type::rank()`](extents/rank.md)個からなる整数値、変数`r`を多次元の次元番号としたとき、下記の式が妥当であること

- `m.extents()` : `const M::extents_type&`型を返すこと。
- `m(i...)` : `M::index_type`型を返すこと。
    - 戻り値 : 非負整数値
- `m(i...) == m(static_cast<M::index_type>(i)...)` : `true`となること。
- `m.required_span_size()` : `M::index_type`型を返すこと。
    - 戻り値 : `m.extents()`の多次元インデクス空間サイズが0のときは値`0`。そうでなければ、レイアウトマッピングによりアクセスする可能性のあるメモリブロック範囲の最大値に`1`を足した値。
- `m.is_unique()` : `bool`型を返すこと。
    - 戻り値 : Unique特性を満たすときに限り`true`。
- `m.is_exhaustive()` : `bool`型を返すこと。
    - 戻り値 : Exhaustive特性を満たすときに限り`true`。
- `m.is_strided()` : `bool`型を返すこと。
    - 戻り値 : Strided特性を満たすときに限り`true`。
- `m.stride(r)` : `M::index_type`型を返すこと。
    - 前提条件 : `m.is_strided() == true`
    - 戻り値 : `r`番目次元のストライド幅
- `M::is_always_unique()` : `bool`型の定数式となること。
    - 戻り値 : 型`M`のあらゆるオブジェクトにおいてUnique特性を満たすときに`true`。
- `M::is_always_exhaustive()` : `bool`型の定数となること。
    - 戻り値 : 型`M`のあらゆるオブジェクトにおいてExhaustive特性を満たすときに`true`。
- `M::is_always_strided()` : `bool`型の定数となること。
    - 戻り値 : 型`M`のあらゆるオブジェクトにおいてStrided特性を満たすときに`true`。


## `LayoutMapping`に該当する型

- [`layout_left::mapping<E>`](layout_left/mapping.md)
- [`layout_right::mapping<E>`](layout_right/mapping.md)
- [`layout_stride::mapping<E>`](layout_stride/mapping.md)
- [`layout_left_padded<S>::mapping<E>`](layout_left_padded/mapping.md)
- [`layout_right_padded<S>::mapping<E>`](layout_right_padded/mapping.md)
- [`layout_blas_packed<T,SO>::mapping<E>`](/reference/linalg/layout_blas_packed/mapping.md)


## バージョン
### 言語
- C++23


## 関連項目
- [`mdspan`](mdspan.md)
- [`extents`](extents.md)
- [LayoutMappingPolicy](LayoutMappingPolicy.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
- [P2604R0 `mdspan`: rename `pointer` and `contiguous`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2604r0.html)
