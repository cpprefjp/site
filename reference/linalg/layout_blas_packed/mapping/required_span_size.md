# required_span_size
* linalg[meta header]
* function[meta id-type]
* std::linalg[meta namespace]
* layout_blas_packed::mapping[meta class]
* cpp26[meta cpp]

```cpp
constexpr index_type required_span_size() const noexcept;
```

## 概要
メモリブロックに対する要素アクセス範囲を取得する。


## 戻り値
[`extents_.extent`](/reference/mdspan/extents/extent.md)`(0) * (`[`extents_.extent`](/reference/mdspan/extents/extent.md)`(0) + 1)/2`


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
  using Ext5x5 = std::extents<size_t, 5, 5>;
  linalg::layout_blas_packed<linalg::lower_triangle_t, linalg::column_major_t>::mapping<Ext5x5> map;
  assert(map.required_span_size() == 15);
}
```
* required_span_size()[color ff0000]
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
