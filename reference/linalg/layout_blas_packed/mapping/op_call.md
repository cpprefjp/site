# operator()
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* layout_blas_packed::mapping[meta class]
* cpp26[meta cpp]

```cpp
template<class Index0, class Index1>
constexpr index_type operator() (Index0 ind0, Index1 ind1) const noexcept;
```

## 概要
2次元インデクス値`ind0, ind1`に対応する要素位置を求める。


## テンプレートパラメータ制約
- [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<Index0, index_type> == true`
- [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<Index1, index_type> == true`
- [`is_nothrow_convertible_v`](/reference/type_traits/is_nothrow_convertible.md)`<index_type, Index0> == true`
- [`is_nothrow_convertible_v`](/reference/type_traits/is_nothrow_convertible.md)`<index_type, Index1> == true`


## 事前条件
`i`を[`extents_type::index-cast`](/reference/mdspan/extents/index-cast.md)`(ind0)`、`j`を[`extents_type::index-cast`](/reference/mdspan/extents/index-cast.md)`(ind1)`としたとき、2次元インデクス値`i, j`は多次元配列サイズ`extents_`における有効なインデクスであること。


## 戻り値
`N`を[`extetns_.extent`](/reference/mdspan/extents/extent.md)`(0)`としたとき

- `i > j`ならば`(*this)(j, i)`、そうでなければ
- 下記いずれの条件を満たすならば`i + j * (j + 1)/2`、そうでなければ
    - [`is_same_v`](/reference/type_traits/is_same.md)`<StorageOrder, column_major_t> &&` [`is_same_v`](/reference/type_traits/is_same.md)`<Triangle, upper_triangle_t>`が`true`または
    - [`is_same_v`](/reference/type_traits/is_same.md)`<StorageOrder, row_major_t> &&` [`is_same_v`](/reference/type_traits/is_same.md)`<Triangle, lower_triangle_t>`が`true`
- `j + N * i - i * (i + 1)/2`


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <mdspan>
#include <linalg>
namespace linalg = std::linalg;

int main()
{
  using Ext3x3 = std::extents<size_t, 3, 3>;
  linalg::layout_blas_packed<linalg::lower_triangle_t, linalg::column_major_t>::mapping<Ext3x3> map;
  // 0 1 2
  // 1 3 4
  // 2 4 5
  assert(map(0, 0) == 0);
  assert(map(0, 1) == 1);
  assert(map(2, 1) == 4);
}
```
* mapping[color ff0000]
* linalg::layout_blas_packed[link ../../layout_blas_packed.md]


### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
