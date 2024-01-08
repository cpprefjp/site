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
* layout_right[link layout_right.md]
* default_accessor[link default_accessor.md]

## 概要
`mdspan`は、任意のメモリブロックに対して多次元配列のようにアクセスする機能を提供するクラスである。

`mdspan`の特殊化`MDS`は[`copyable`](/reference/concepts/copyable.md)のモデルであり、かつ

- [`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<MDS>`が`true`、かつ
- [`is_nothrow_move_assignable_v`](/reference/type_traits/is_nothrow_move_assignable.md)`<MDS>`が`true`、かつ
- [`is_nothrow_swappable_v`](/reference/type_traits/is_nothrow_swappable.md)`<MDS>`が`true`となる。

そのメンバ型`accessor_type`, `mapping_type`, `pointer`が[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)であるとき、`mdspan`の特殊化もトリビアルコピー可能である。

### 説明専用メンバ変数
`mdspan`クラスは、下記の説明専用メンバ変数を保持する。

- `acc_` : `accessor_type`型の要素アクセサ
- `map_` : `mapping_type`型のレイアウトマッピング
- `ptr_` : `data_handle_type`型のメモリブロックへのハンドル


## 適格要件
- `ElementType`は抽象クラス型もしくは配列型のいずれでもない完全型であり、かつ
- `Extents`は[`extents`](extents.md)の特殊化であり、かつ
- [`is_same_v`](/reference/type_traits/is_same.md)`<ElementType, typename AccessorPolicy::element_type>`が`true`であること。

`LayoutPolicy`はレイアウトマッピングポリシー要件を満たし、かつ`AccessorPolicy`はアクセサポリシー要件を満たすこと。


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](mdspan/op_constructor.md.nolink) | コンストラクタ | C++23 |
| `(destructor)` | デストラクタ | C++23 |
| [`operator=`](mdspan/op_assign.md.nolink) | 代入演算子 | C++23 |

### 要素へのアクセス

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator[]`](mdspan/op_at.md.nolink) | 多次元配列の要素アクセス | C++23 |

### 多次元配列サイズ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`rank`](mdspan/rank.md.nolink) | 多次元配列の次元数を取得する | C++23 |
| [`rank_dynamic`](mdspan/rank_dynamic.md.nolink) | 多次元配列のうち動的要素数に指定された次元数を取得する | C++23 |
| [`static_extent`](mdspan/static_extent.md.nolink) | 指定次元の静的要素数を取得する | C++23 |
| [`extent`](mdspan/extent.md.nolink) | 指定次元の要素数を取得する | C++23 |

### 多次元インデクス空間

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`size`](mdspan/size.md.nolink) | メモリブロックに対する最大アクセス範囲を取得 | C++23 |
| [`empty`](mdspan/empty.md.nolink) | 最大アクセス範囲がサイズ0か否かを取得 | C++23 |

### メンバ変数アクセサ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`extents`](mdspan/extents.md.nolink) | 多次元配列のサイズ`map_.extents()`を取得 | C++23 |
| [`data_handle`](mdspan/data_handle.md.nolink) | メモリブロックへのハンドル`ptr_`を取得 | C++23 |
| [`mapping`](mdspan/mapping.md.nolink) | レイアウトマッピング`map_`を取得 | C++23 |
| [`accessor`](mdspan/accessor.md.nolink) | 要素アクセサ`acc_`を取得 | C++23 |

### レイアウトマッピング

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `is_always_unique()`     | `mapping_type::is_always_unique()`     | C++23 |
| `is_always_exhaustive()` | `mapping_type::is_always_exhaustive()` | C++23 |
| `is_always_strided()`    | `mapping_type::is_always_strided()`    | C++23 |
| `is_unique()`     | `map_.is_unique()`     | C++23 |
| `is_exhaustive()` | `map_.is_exhaustive()` | C++23 |
| `is_strided()`    | `map_.is_strided()`    | C++23 |
| `stride(rank_type r)` | `map_.stride(r)`   | C++23 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `extents_type`  | 多次元配列サイズ型[`Extents`](extents.md) | C++23 |
| `layout_type`   | レイアウトマッピングポリシー`LayoutPolicy` | C++23 |
| `accessor_type` | アクセサポリシー`AccessorPolicy` | C++23 |
| `mapping_type` | レイアウトマッピング`LayoutPolicy::mapping<Extents>` | C++23 |
| `element_type` | 要素型`ElementType` | C++23 |
| `value_type`   | 要素の値型[`remove_cv_t`](/reference/type_traits/remove_cvref.md)`<ElementType>` | C++23 |
| `size_type` | [`Extents::size_type`](extents.md) | C++23 |
| `rank_type` | [`Extents::rank_type`](extents.md) | C++23 |
| `pointer`   | `AccessorPolicy::pointer` | C++23 |
| `reference` | `AccessorPolicy::reference` | C++23 |


## 非メンバ（*Hidden friends*）関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `swap` | 2つのオブジェクトを入れ替える | C++23 |


## 例
```cpp example
#include <mdspan>
#include <print>

int main()
{
  // メモリブロックに対する2次元配列/2x3要ビューを作成
  double arr[] = {1, 2, 3, 4, 5, 6};
  using Mat2x3 = std::extents<size_t, 2, 3>;
  std::mdspan<double, Mat2x3> mat{arr};

  // 2次元配列の各要素を表示
  for (size_t i = 0; i < mat.extent(0); ++i) {
    for (size_t j = 0; j < mat.extent(1); ++j) {
      std::print("{} ", mat[i, j]);
    }
    std::println("");
  }
}
```
* std::mdspan[color ff0000]
* std::extents[link extents.md]
* extent[link mdspan/extent.md.nolink]

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
- [`default_accessor`](default_accessor.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
- [P2599R2 `index_type` & `size_type` in `mdspan`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2599r2.pdf)
- [P2604R0 `mdspan`: rename `pointer` and `contiguous`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2604r0.html)
- [P2613R1 Add the missing `empty` to `mdspan`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2613r1.html)
