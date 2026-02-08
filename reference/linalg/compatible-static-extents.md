# compatible-static-extents
* [meta exposition-only]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<class MDS1, class MDS2>
    requires(is-mdspan<MDS1> && is-mdspan<MDS2>) 
  constexpr bool compatible-static-extents(size_t r1, size_t r2)
  {
    return MDS1::static_extent(r1) == dynamic_extent ||
           MDS2::static_extent(r2) == dynamic_extent || 
           MDS1::static_extent(r1) == MDS2::static_extent(r2);
  }
}
```
* is-mdspan[link is-mdspan.md]
* static_extent[link /reference/mdspan/mdspan/static_extent.md]
* dynamic_extent[link /reference/span/dynamic_extent.md]

## 概要
左の`mdspan`の`r1`番目の静的要素数と右の`mdspan`の`r2`番目の静的要素数に互換性があるかどうかを返す、説明専用の関数である。


## テンプレートパラメータ制約
- `MDS1`と`MDS2`が両方とも`mdspan`であること。


## 戻り値
左の`mdspan`の`r1`番目の静的要素数と右の`mdspan`の`r2`番目の静的要素数に互換性がある場合、`true`を返す。そうでない場合は、`false`を返す。


## バージョン
### 言語
- C++26


## 関連項目
- [`mdspan`](/reference/mdspan.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
