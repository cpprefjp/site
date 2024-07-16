# stride
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* layout_left::mapping[meta class]
* cpp23[meta cpp]

```cpp
constexpr index_type stride(rank_type i) const noexcept;
```

## 概要
`i`番目次元のストライド幅を取得する。


## テンプレートパラメータ制約
[`extents_type::rank()`](../../extents/rank.md) `> 0`


## 事前条件
`i <` [`extents_type::rank()`](../../extents/rank.md)


## 戻り値
多次元配列サイズの次元数`R =` [`extents_type::rank()`](../../extents/rank.md)としたとき

- `i > 0`のとき、最左次元(`0`番目)から`i - 1`番目次元までの要素数を乗算した値を返す。
- `i == 0`のとき、値1を返す。


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
  Mapping3x4 map1;
  assert(map1.stride(0) == 1);
  assert(map1.stride(1) == 3);

  using Ext3D = std::dextents<size_t, 3>;
  using Mapping3D = std::layout_left::mapping<Ext3D>;
  Mapping3D map2{Ext3D{4, 3, 2}};
  assert(map2.stride(0) == 1);
  assert(map2.stride(1) == 4);
  assert(map2.stride(2) == 12);
}
```
* stride[color ff0000]
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
