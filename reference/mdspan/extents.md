# extents
* mdspan[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class IndexType, size_t... Extents>
  class extents;

  template<class IndexType, size_t Rank>
  using dextents = see below;
}
```
* see below[italic]

## 概要
`extents`は、多次元配列の次元数、各次元の要素数、要素数が静的（コンパイル時）または動的（プログラム実行時）いずれのタイミングで指定されるかを表現する。
多次元配列ビュー[`std::mdspan`](mdspan.md)に対して、多次元配列のサイズを指示するために用いられる。

- 多次元配列の次元数は`sizeof...(Extents)`に等しい
- `Extents`要素のうち[`dynamic_extent`](/reference/span/dynamic_extent.md)に等しい次元は、動的要素数(dynamic extent)となる
- それ以外の`Extents`要素の次元は、静的要素数(static extent)となる

`extents`の特殊化は[`regular`](/reference/concepts/regular.md)のモデルであり、かつ[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)である。

エイリアステンプレート`dextents`は、全次元が動的要素数で指定される`extents`を生成する。
例えば`dextents<size_t, 2>`は`extents<size_t, dynamic_extent, dynamic_extent>`の略記となる。


## 適格要件

- `IndexType`は符号付き整数型または符号無し整数型
- `Extents`の各要素は[`dynamic_extent`](/reference/span/dynamic_extent.md)に等しい、または`IndexType`型で表現可能な値


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](extents/op_constructor.md.nolink) | コンストラクタ | C++23 |
| `(destructor)`  | デストラクタ   | C++23 |
| [`rank`](extents/rank.md.nolink) | 多次元配列の次元数を取得する | C++23 |
| [`rank_dynamic`](extents/rank_dynamic.md.nolink) | 多次元配列のうち動的要素数に指定された次元数を取得する | C++23 |
| [`static_extent`](extents/static_extent.md.nolink) | 指定次元の静的要素数を取得する | C++23 |
| [`extent`](extents/extent.md.nolink) | 指定次元の要素数を取得する | C++23 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `index_type` | `IndexType` | C++23 |
| `size_type`  | [`make_unsigned_t`](/reference/type_traits/make_unsigned.md)`<index_type>` | C++23 |
| `rank_type`  | `size_t` | C++23 |


## 比較演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](extents/op_equal.md.nolink) | 等値比較 | C++23 |
| [`operator!=`](extents/op_equal.md.nolink) | 非等値比較 (`==`により使用可能) | C++23 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(deduction_guide)`](extents/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++23 |


## 例
```cpp example
#include <mdspan>

int main()
{
  // 固定サイズ 3x3 の2次元配列サイズ
  std::extents<size_t, 2, 3, 3> ext3x3;

  // 動的サイズをもつ2次元配列サイズを 4x2 で初期化
  using Ext2D = std::dextents<size_t, 2>;
  Ext2D ext2d{4, 2};

  // 2個の動的次元(高さ,幅)と固定次元(RGBA;4)からなる3次元配列サイズ
  using ColorImageExt = std::dextents<size_t, std::dynamic_extent, std::dynamic_extent, 4>;
  ColorImageExt image_ext{128, 128};
}
```
* std::extents[color ff0000]
* std::dextents[color ff0000]
* std::dynamic_extent[link /reference/span/dynamic_extent.md]

### 出力
```
```


## バージョン
### 言語
- C++23


## 関連項目
- [`mdspan`](mdspan.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
- [P2599R2 `index_type` & `size_type` in `mdspan`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2599r2.pdf)
