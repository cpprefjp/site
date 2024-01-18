# required_span_size
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* layout_left::mapping[meta class]
* cpp23[meta cpp]

```cpp
constexpr index_type required_span_size() const noexcept;
```

## 概要
メモリブロックに対する要素アクセス範囲を取得する。


## 戻り値
多次元配列サイズ[`extents()`](../mapping.md)に対して、全次元の要素数を乗算した値。
次元数が0の場合は、値1を返す。


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <mdspan>

int main()
{
  using Ext3x4 = std::extents<size_t, 3, 4>;
  using Mapping3x4 = std::layout_left::mapping<Ext3x4>;
  Mapping3x4 map1{};
  assert(map1.required_span_size() == 12);

  using Ext3D = std::dextents<size_t, 3>;
  using Mapping3D = std::layout_left::mapping<Ext3D>;
  Mapping3D map2{Ext3D{4, 3, 2}};
  assert(map2.required_span_size() == 24);
}
```
* required_span_size()[color ff0000]
* std::extents[link ../../extents.md]
* std::dextents[link ../../extents.md]
* std::layout_left::mapping[link ../mapping.md]

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


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
