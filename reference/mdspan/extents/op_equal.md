# operator==
* mdspan[meta header]
* function template[meta id-type]
* std[meta namespace]
* extents[meta class]
* cpp23[meta cpp]

```cpp
template<class OtherIndexType, size_t... OtherExtents>
friend constexpr bool operator==(
  const extents& lhs,
  const extents<OtherIndexType, OtherExtents...>& rhs) noexcept;

//operator==により、以下のオーバーロードが使用可能になる        
template<class OtherIndexType, size_t... OtherExtents>
friend constexpr bool operator!=(
  const extents& lhs,
  const extents<OtherIndexType, OtherExtents...>& rhs) noexcept;
```

## 概要
`extents`の等値比較を行う。


## 戻り値
`lhs`と`rhs`の次元数[`rank`](rank.md)が等しく、かつ全次元の要素数[`extent`](extent.md)が等しいときに`true`を返す。そうでなければ`false`を返す。


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <mdspan>

int main()
{
  using Ext3x4 = std::extents<size_t, 3, 4>;
  Ext3x4 ext1;

  using Ext3xN = std::extents<size_t, 3, std::dynamic_extent>;
  Ext3xN ext2{4};

  assert(ext1 == ext2);
}
```
* ==[color ff0000]


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
