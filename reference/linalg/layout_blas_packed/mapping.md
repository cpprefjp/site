# mapping
* linalg[meta header]
* class template[meta id-type]
* std::linalg[meta namespace]
* layout_blas_packed[meta class]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<class Triangle, class StorageOrder>
  class layout_blas_packed {
    template<class Extents>
    struct mapping;
  };
}
```
* layout_blas_packed[link ../layout_blas_packed.md]
* Extents[link /reference/mdspan/extents.md]

## 概要
`layout_blas_packed::mapping`は、BLASにおける正方行列(square matrix)パックレイアウトと互換性のある[レイアウトマッピング](/reference/mdspan/LayoutMapping.md)を表現するクラスである。

`layout_blas_packed<T, SO>::mapping<E>`は[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)であり、[`regular`](/reference/concepts/regular.md)のモデルである。


### 説明専用メンバ変数
`layout_blas_packed::mapping`クラステンプレートは、下記の説明専用メンバ変数を保持する。

- `extents_` : `extents_type`型の[多次元配列サイズ情報](/reference/mdspan/extents.md)


## 適格要件
- `Extents`は[`extents`](/reference/mdspan/extents.md)の特殊化であること
- [`Extents::rank()`](/reference/mdspan/extents/rank.md) `== 2`
- 下記いずれかを満たすこと
    - `extents_type::static_extent(0) ==` [`dynamic_extent`](/reference/span/dynamic_extent.md)または
    - `extents_type::static_extent(1) ==` [`dynamic_extent`](/reference/span/dynamic_extent.md)または
    - `extents_type::static_extent(0) == extents_type::static_extent(1)`
- [`Extents::rank_dynamic()`](/reference/mdspan/extents/rank.md) `== 0`のとき、`Ns`を[`Extents::static_extent`](/reference/mdspan/extents/static_extent.md)`(0)`としたとき値`Ns * (Ns + 1)`を`index_type`型で表現できること。


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](mapping/op_constructor.md.nolink) | コンストラクタ | C++26 |
| `(destructor)` | デストラクタ | C++26 |
| `operator=`    | コピー代入演算子 | C++26 |

### 観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `extents` | 多次元配列のサイズ`extents_`を取得する | C++26 |
| [`required_span_size`](mapping/required_span_size.md.nolink) | 要素アクセス範囲を取得する | C++26 |
| [`operator()`](mapping/op_call.md.nolink) | 多次元配列インデクスから要素位置へ変換する | C++26 |
| `stride` | 行列サイズ1x1ならば`1` | C++26 |
| `is_unique`     | 行列サイズ1x1ならば`true` | C++26 |
| `is_exhaustive` | `true`を返す | C++26 |
| `is_strided`    | 行列サイズ1x1ならば`true` | C++26 |


## 静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `is_always_unique` | 行または列の静的要素数が1ならば`true` | C++26 |
| `is_always_exhaustive` | `true`を返す | C++26 |
| `is_always_strided` | `is_always_unique();` | C++26 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `extents_type` | [`Extents`](/reference/mdspan/extents.md) | C++26 |
| `index_type` | [`Extents::index_type`](/reference/mdspan/extents.md) | C++26 |
| `size_type` | [`Extents::size_type`](/reference/mdspan/extents.md) | C++26 |
| `rank_type` | [`Extents::rank_type`](/reference/mdspan/extents.md) | C++26 |
| `layout_type` | [`layout_blas_packed`](../layout_blas_packed.md) | C++26 |


## 非メンバ（*Hidden friends*）関数
### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](mapping/op_equal.md.nolink) | 等値比較 | C++26 |
| [`operator!=`](mapping/op_equal.md.nolink) | 非等値比較 (`==`により使用可能) | C++26 |


## 例
```cpp example
#include <linalg>
#include <mdspan>
#include <print>
namespace linalg = std::linalg;

int main()
{
  double arr[] = {1, 2, 3, 4, 5, 6};

  // 行優先レイアウトの下三角要素から3x3対称行列を構築
  using LayoutPacked = linalg::layout_blas_packed<linalg::lower_triangle, linalg::column_major>;
  using Mapping = LayoutPacked::mapping<std::extents<size_t, 3, 3>>;
  std::mdspan mat{arr, Mapping{}};
  // 1 . .
  // 2 4 .
  // 3 5 6

  for (size_t i = 0; i < mat.extent(0); i++) {
    for (size_t j = 0; j < mat.extent(1); j++) {
      std::print(" {}", mat[i, j]);
    }
    std::println("");
  }
}
```
* linalg::layout_blas_packed[color ff0000]
* ::mapping[color ff0000]

### 出力
```
 1 2 3
 2 4 5
 3 5 6
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`mdspan`](/reference/mdspan/mdspan.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
- [P1674R2: Evolving a Standard C++ Linear Algebra Library from the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1674r2.html)
