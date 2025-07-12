# コンストラクタ
* linalg[meta header]
* function[meta id-type]
* std::linalg[meta namespace]
* layout_blas_packed::mapping[meta class]
* cpp26[meta cpp]

```cpp
constexpr mapping() noexcept = default; // (1)

constexpr mapping(const mapping&) noexcept = default; // (2)

constexpr mapping(const extents_type&) noexcept; // (3)

template<class OtherExtents>
constexpr explicit(!is_convertible_v<OtherExtents, extents_type>)
  mapping(const mapping<OtherExtents>& other) noexcept; // (4)
```

## 概要
- (1) : デフォルトコンストラクタ
- (2) : コピーコンストラクタ
- (3) : [`extents`](/reference/mdspan/extents.md)からの変換コンストラクタ
- (4) : 他`mapping`からの変換コンストラクタ


## テンプレートパラメータ制約
- (4) : [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<extents_type, OtherExtents>`


## 事前条件
- (3) :
    - Nを`e.extent(0)`としたとき、N * (N + 1)を`index_type`型で表現できること。
    - `e.extent(0) == e.extent(1)`
- (4) :
    - Nを`other.extents().extent(0)`としたとき、N * (N + 1)を`index_type`型で表現できること。


## 効果
- (3) : `e`を用いて`extents_`を直接非リスト初期化する。
- (4) : `other.extetns()`を用いて`extents_`を直接非リスト初期化する。


## 例外
投げない


## explicitになる条件
- (4) : `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<OtherExtents, extents_type>`


## 例
```cpp example
#include <cassert>
#include <mdspan>
#include <linalg>
namespace linalg = std::linalg;

using LayoutPacked = linalg::layout_blas_packed<linalg::lower_triangle_t, linalg::column_major_t>;
using Ext3x3 = std::extents<size_t, 3, 3>;
using ExtNxN = std::dextents<size_t, 2>;

int main()
{
  // (1) : デフォルトコンストラクタ
  {
    LayoutPacked::mapping<Ext3x3> map1;
    assert(map1.required_span_size() == 6);
  }
  // (2) : コピーコンストラクタ
  {
    LayoutPacked::mapping<Ext3x3> map2_a;
    LayoutPacked::mapping<Ext3x3> map2_b = map2_a;
    assert(map2_a == map2_b);
  }
  // (3) : extentsからの変換コンストラクタ
  {
    ExtNxN ext{3, 3};
    LayoutPacked::mapping<ExtNxN> map3 = ext;
    assert(map3.extents() == ext);
  }
  // (4) : 他mappingからの変換コンストラクタ
  {
    LayoutPacked::mapping<Ext3x3> map4_a;
    LayoutPacked::mapping<ExtNxN> map4_b = map4_a;
    assert(map4_a == map4_b);
  }
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
