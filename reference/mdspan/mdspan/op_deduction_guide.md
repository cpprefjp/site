# 推論補助
* mdspan[meta header]
* std[meta namespace]
* mdspan[meta class]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class CArray>
    requires (is_array_v<CArray> && rank_v<CArray> == 1)
    mdspan(CArray&)
      -> mdspan<remove_all_extents_t<CArray>, extents<size_t, extent_v<CArray, 0>>>;  // (1)

  template<class Pointer>
    requires (is_pointer_v<remove_reference_t<Pointer>>)
    mdspan(Pointer&&)
      -> mdspan<remove_pointer_t<remove_reference_t<Pointer>>, extents<size_t>>;  // (2)

  template<class ElementType, class... Integrals>
    requires ((is_convertible_v<Integrals, size_t> && ...) && sizeof...(Integrals) > 0)
    explicit mdspan(ElementType*, Integrals...)
      -> mdspan<ElementType, dextents<size_t, sizeof...(Integrals)>>;  // (3)

  template<class ElementType, class OtherIndexType, size_t N>
    mdspan(ElementType*, span<OtherIndexType, N>)
      -> mdspan<ElementType, dextents<size_t, N>>;  // (4)

  template<class ElementType, class OtherIndexType, size_t N>
    mdspan(ElementType*, const array<OtherIndexType, N>&)
      -> mdspan<ElementType, dextents<size_t, N>>;  // (5)

  template<class ElementType, class IndexType, size_t... ExtentsPack>
    mdspan(ElementType*, const extents<IndexType, ExtentsPack...>&)
      -> mdspan<ElementType, extents<IndexType, ExtentsPack...>>;  // (6)

  template<class ElementType, class MappingType>
    mdspan(ElementType*, const MappingType&)
      -> mdspan<ElementType,
                typename MappingType::extents_type,
                typename MappingType::layout_type>;  // (7)

  template<class MappingType, class AccessorType>
    mdspan(const typename AccessorType::data_handle_type&,
           const MappingType&,
           const AccessorType&)
      -> mdspan<typename AccessorType::element_type,
                typename MappingType::extents_type,
                typename MappingType::layout_type,
                AccessorType>;                      // (8)
}
```
* extents[link ../extents.md]
* dextents[link ../extents.md]
* span[link /reference/span/span.md]
* array[link /reference/array/array.md]
* is_array_v[link /reference/type_traits/is_array.md]
* is_pointer_v[link /reference/type_traits/is_pointer.md]
* rank_v[link /reference/type_traits/rank.md]
* extent_v[link /reference/type_traits/extent.md]
* is_convertible_v[link /reference/type_traits/is_convertible.md]
* remove_pointer_t[link /reference/type_traits/remove_pointer.md]
* remove_reference_t[link /reference/type_traits/remove_reference.md]
* remove_all_extents_t[link /reference/type_traits/remove_all_extents.md]

## 概要
`std::mdspan`クラステンプレートの型推論補助。


## 備考
推論補助(2)により、コンパイル時に要素数を取得できないポインタ型引数からは0次元`mdspan`が推論される。


## 例
```cpp example
#include <cassert>
#include <array>
#include <span>
#include <mdspan>

int main()
{
  int arr[] = {1, 2, 3, 4, 5, 6};

  { // (1) :　1次元配列型から型推論
    std::mdspan m1{arr};
    static_assert(m1.rank() == 1 && m1.rank_dynamic() == 0);
    static_assert(m1.static_extent(0) == 6);
    // m1 := 静的要素数 6 の1次元配列ビュー

    // 2次元配列型からは型推論できない
    //   int arr2d[2][3] = {{1, 2, 3}, {4, 5, 6}};
    //   std::mdspan m1_ng{arr2d};
    // 下記は推論補助(2)により0次元mdspanとなる
    //   std::mdspan m1_d0{&arr2d[0][0]};
  }
  { // (2) : ポインタ型から型推論
    int* ptr = arr;
    std::mdspan m2{ptr};
    static_assert(m2.rank() == 0);
    assert(m2[] == *ptr);
    // m2 := 0次元配列ビュー
  }
  { // (3) : 要素数リストから型推論
    std::mdspan m3{arr, 2, 3};
    static_assert(m3.rank_dynamic() == 2);
    assert(m3.size() == 6);
    // m3 := 動的要素数 2x3 の2次元配列ビュー
  }
  { // (4) : 要素数spanから型推論
    int exts[] = {2, 3};
    std::mdspan m4{arr, std::span{exts}};
    static_assert(m4.rank_dynamic() == 2);
    assert(m4.size() == 6);
    // m4 := 動的要素数 2x3 の2次元配列ビュー
  }
  { // (5) : 要素数arrayから型推論
    std::array exts{2, 3};
    std::mdspan m5{arr, exts};
    static_assert(m5.rank_dynamic() == 2);
    assert(m5.size() == 6);
    // m5 := 動的要素数 2x3 の2次元配列ビュー
  }
  { // (6) : 多次元配列サイズから型推論
    std::extents<size_t, 2, std::dynamic_extent> ext{3};
    std::mdspan m6{arr, ext};
    static_assert(m6.rank() == 2 && m6.rank_dynamic() == 1);
    assert(m6.size() == 6);
    // m6 := 静的要素数2 x 動的要素数3 の2次元配列ビュー
  }
  { // (7) : レイアウトマッピングから型推論
    using Ext2D = std::dextents<size_t, 2>;
    std::layout_stride::mapping<Ext2D> map{Ext2D{2, 2}, std::array{3, 1}};
    std::mdspan m7{arr, map};
    static_assert(m7.rank_dynamic() == 2);
    assert(m7.size() == 4);
    // m7 := 動的要素数 2x2（ストライド幅=[3,1]） の2次元配列ビュー
  }
  { // (8) : レイアウトマッピング＋要素アクセサから型推論
    using Ext2D = std::dextents<size_t, 2>;
    std::layout_stride::mapping<Ext2D> map{Ext2D{2, 2}, std::array{3, 1}};
    std::default_accessor<const int> acc;
    std::mdspan m8{arr, map, acc};
    static_assert(m8.rank_dynamic() == 2);
    assert(m8.size() == 4);
    // m8 := 動的要素数 2x2（ストライド幅=[3,1]） の読み取り専用2次元配列ビュー
  }
}
```
* std::mdspan[color ff0000]
* rank[link rank.md]
* rank_dynamic[link rank_dynamic.md]
* extent[link extent.md]
* static_extent[link static_extent.md]
* size[link size.md]
* std::layout_stride::mapping[link ../layout_stride/mapping.md]
* std::default_accessor[link ../default_accessor.md]

### 出力
```
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
- [`extents`](../extents.md)
- [LayoutMapping](../LayoutMapping.md)
- [AccessorPolicy](../AccessorPolicy.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
