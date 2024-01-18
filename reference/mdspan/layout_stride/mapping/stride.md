# stride
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* layout_stride::mapping[meta class]
* cpp23[meta cpp]

```cpp
constexpr index_type stride(rank_type i) const noexcept;
```

## 概要
`i`番目次元のストライド幅を取得する。


## 戻り値
説明専用のメンバ変数`strides_`を用いて、`strides_[i]`を返す。


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <array>
#include <mdspan>

int main()
{
  using Ext3D = std::dextents<size_t, 3>;
  using Mapping = std::layout_stride::mapping<Ext3D>;
  std::array strides{6, 1, 3};
  Mapping map{Ext3D{4, 3, 2}, strides};
  assert(map.stride(0) == 6);
  assert(map.stride(1) == 1);
  assert(map.stride(2) == 3);
}
```
* stride[color ff0000]
* std::dextents[link ../../extents.md]
* std::layout_stride::mapping[link ../mapping.md]

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
