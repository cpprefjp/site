# operator==
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* layout_blas_packed::mapping[meta class]
* cpp26[meta cpp]

```cpp
template<class OtherExtents>
friend constexpr bool
  operator==(const mapping& x, const mapping<OtherExtents>& y) noexcept;

//operator==により、以下のオーバーロードが使用可能になる        
template<class OtherExtents>
friend constexpr bool
  operator!=(const mapping& x, const mapping<OtherExtents>& y) noexcept;
```

## 概要
`mapping`の等値比較を行う。


## 戻り値
`x.extents() == y.extents()`


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
  using LayoutPacked = linalg::layout_blas_packed<linalg::lower_triangle_t, linalg::column_major_t>;
  using Ext3x3 = std::extents<size_t, 3, 3>;
  using ExtNxN = std::dextents<size_t, 2>;
  LayoutPacked::mapping<Ext3x3> map1;
  LayoutPacked::mapping<ExtNxN> map2{ExtNxN{3, 3}};
  assert(map1 == map2);
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
