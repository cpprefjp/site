# mdspan
* mdspan[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template<
    class ElementType,
    class Extents,
    class LayoutPolicy = layout_right,
    class AccessorPolicy = default_accessor<ElementType>>
  class mdspan;
}
```
* Extents[link extents.md]
* LayoutPolicy[link LayoutMappingPolicy.md]
* AccessorPolicy[link AccessorPolicy.md]
* layout_right[link layout_right.md]
* default_accessor[link default_accessor.md]

## 概要
`mdspan`は、任意のメモリブロックに対して多次元配列のようにアクセスする機能を提供するクラスである。 
`mdspan`それ自体は参照先メモリブロックを所有せず、[`[]`演算子](mdspan/op_at.md)を介して多次元配列のように見せかけるビュー(view)にすぎない。

クラスの名称`mdspan`は、1次元の範囲[`std::span`](../span/span.md)に対する多次元(MultiDimensional)拡張に由来する。

`mdspan`の特殊化`MDS`は[`copyable`](/reference/concepts/copyable.md)のモデルであり、かつ

- [`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<MDS>`が`true`、かつ
- [`is_nothrow_move_assignable_v`](/reference/type_traits/is_nothrow_move_assignable.md)`<MDS>`が`true`、かつ
- [`is_nothrow_swappable_v`](/reference/type_traits/is_nothrow_swappable.md)`<MDS>`が`true`となる。

そのメンバ型`accessor_type`, `mapping_type`, `pointer`が[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)であるとき、`mdspan`の特殊化もトリビアルコピー可能である。

### テンプレートパラメータ
`mdspan`クラスでは、テンプレートパラメータを介して多次元配列ビューをカスタマイズできる。

- `ElementType` : 多次元配列ビューの要素型
- `Extents` : 多次元配列の次元数(rank)と要素数(extent)
- `LayoutPolicy` : 多次元配列インデクスと要素位置の対応関係
- `AccessorPolicy` : 要素アクセス時の詳細挙動

### 説明専用メンバ変数
`mdspan`クラスは、下記の説明専用メンバ変数を保持する。

- `acc_` : `accessor_type`型の[要素アクセサ](AccessorPolicy.md)
- `map_` : `mapping_type`型の[レイアウトマッピング](LayoutMapping.md)
- `ptr_` : `data_handle_type`型のメモリブロックへのハンドル（ポインタ）


## 適格要件
- `ElementType`は抽象クラス型もしくは配列型のいずれでもない完全型であり、かつ
- `Extents`は[`extents`](extents.md)の特殊化であり、かつ
- [`is_same_v`](/reference/type_traits/is_same.md)`<ElementType, typename AccessorPolicy::element_type>`が`true`であること。

`LayoutPolicy`は[レイアウトマッピングポリシー要件](LayoutMappingPolicy.md)を満たし、かつ`AccessorPolicy`は[アクセサポリシー要件](AccessorPolicy.md)を満たすこと。


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](mdspan/op_constructor.md) | コンストラクタ | C++23 |
| `(destructor)` | デストラクタ | C++23 |
| [`operator=`](mdspan/op_assign.md) | 代入演算子 | C++23 |

### 要素へのアクセス

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator[]`](mdspan/op_at.md) | 多次元配列の要素アクセス | C++23 |

### 多次元配列サイズ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`rank`](mdspan/rank.md) | 多次元配列の次元数を取得する | C++23 |
| [`rank_dynamic`](mdspan/rank_dynamic.md) | 多次元配列のうち動的要素数に指定された次元数を取得する | C++23 |
| [`static_extent`](mdspan/static_extent.md) | 指定次元の静的要素数を取得する | C++23 |
| [`extent`](mdspan/extent.md) | 指定次元の要素数を取得する | C++23 |
| [`size`](mdspan/size.md) | 多次元インデクス空間のサイズを取得する | C++23 |
| [`empty`](mdspan/empty.md) | 多次元インデクス空間がサイズ0か否かを取得する | C++23 |

### メンバ変数アクセサ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`extents`](mdspan/extents.md) | 多次元配列のサイズを取得する | C++23 |
| [`data_handle`](mdspan/data_handle.md) | メモリブロックへのハンドル`ptr_`を取得する | C++23 |
| [`mapping`](mdspan/mapping.md) | レイアウトマッピング`map_`を取得する | C++23 |
| [`accessor`](mdspan/accessor.md) | 要素アクセサ`acc_`を取得する | C++23 |

### レイアウトマッピング

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `is_always_unique()`     | [`mapping_type::is_always_unique()`](LayoutMapping.md)     | C++23 |
| `is_always_exhaustive()` | [`mapping_type::is_always_exhaustive()`](LayoutMapping.md) | C++23 |
| `is_always_strided()`    | [`mapping_type::is_always_strided()`](LayoutMapping.md)    | C++23 |
| `is_unique()`         | [`map_.is_unique()`](LayoutMapping.md)     | C++23 |
| `is_exhaustive()`     | [`map_.is_exhaustive()`](LayoutMapping.md) | C++23 |
| `is_strided()`        | [`map_.is_strided()`](LayoutMapping.md)    | C++23 |
| `stride(rank_type r)` | [`map_.stride(r)`](LayoutMapping.md)       | C++23 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `extents_type`  | 多次元配列サイズ型[`Extents`](extents.md) | C++23 |
| `layout_type`   | [レイアウトマッピングポリシー型`LayoutPolicy`](LayoutMappingPolicy.md) | C++23 |
| `accessor_type` | [アクセサポリシー型`AccessorPolicy`](AccessorPolicy.md) | C++23 |
| `mapping_type` | [レイアウトマッピング型`LayoutPolicy::mapping<Extents>`](LayoutMapping.md) | C++23 |
| `element_type` | 要素型`ElementType` | C++23 |
| `value_type`   | 要素の値型[`remove_cv_t`](/reference/type_traits/remove_cv.md)`<ElementType>` | C++23 |
| `size_type` | [`Extents::size_type`](extents.md) | C++23 |
| `rank_type` | [`Extents::rank_type`](extents.md) | C++23 |
| `pointer`   | [`AccessorPolicy::pointer`](AccessorPolicy.md) | C++23 |
| `reference` | [`AccessorPolicy::reference`](AccessorPolicy.md) | C++23 |


## 非メンバ（*Hidden friends*）関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](mdspan/swap_free.md) | 2つのオブジェクトを入れ替える | C++23 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(deduction_guide)`](mdspan/op_deduction_guide.md) | クラステンプレートの推論補助 | C++23 |


## 例
```cpp example
#include <mdspan>
#include <print>

int main()
{
  double arr[] = {1, 2, 3, 4, 5, 6};
  // メモリブロックに対する2x3要素の2次元配列ビューを作成
  using Ext2x3 = std::extents<size_t, 2, 3>;
  std::mdspan<double, Ext2x3> mat{arr};

  // 2次元配列の各要素を表示
  for (size_t i = 0; i < mat.extent(0); ++i) {
    for (size_t j = 0; j < mat.extent(1); ++j) {
      std::print("{} ", mat[i, j]);
    }
    std::println("");
  }
}
```
* extent[link mdspan/extent.md]

### 出力
```
1 2 3 
4 5 6 
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`extents`](extents.md)
- [LayoutMappingPolicy](LayoutMappingPolicy.md)
- [AccessorPolicy](AccessorPolicy.md)
- [C++23 添字演算子の多次元サポート](/lang/cpp23/multidimensional_subscript_operator.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
- [P2599R2 `index_type` & `size_type` in `mdspan`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2599r2.pdf)
- [P2604R0 `mdspan`: rename `pointer` and `contiguous`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2604r0.html)
- [P2613R1 Add the missing `empty` to `mdspan`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2613r1.html)
