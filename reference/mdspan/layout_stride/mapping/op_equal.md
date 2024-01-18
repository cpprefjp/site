# operator==
* mdspan[meta header]
* function template[meta id-type]
* std[meta namespace]
* layout_stride::mapping[meta class]
* cpp23[meta cpp]

```cpp
template<class OtherMapping>
friend constexpr bool operator==(const mapping& x, const OtherMapping& y) noexcept;

//operator==により、以下のオーバーロードが使用可能になる        
template<class OtherExtents>
friend constexpr bool operator!=(const mapping& x, const OtherMapping& y) noexcept;
```

## 概要
`mapping`の等値比較を行う。


## テンプレートパラメータ制約
- [`layout-mapping-alike`](layout-mapping-alike.md)`<OtherMapping>`を満たすこと。
- `extents_type::rank() == OtherMapping::extents_type::rank()`
- `OtherMapping::is_always_strided() == true`


## 事前条件
`OtherMapping`は[レイアウトマッピング要件](../../LayoutMapping.md)を満たすこと。


## 戻り値
説明専用の関数`OFFSET(m)`を下記の通り定義する：

- 多次元インデクスが0次元のとき[`m()`](op_call.md)
- そうでなければ、多次元インデクス空間のサイズが0のとき値`0`
- そうでなければ、多次元インデクス値の全要素が0である整数パック`z`を用いて[`m(z...)`](op_call.md)

下記条件を全て満たすとき、`true`を返す。そうでなければ、`false`を返す。

- `x.extents() == y.extents()`
- `OFFSET(y) == 0`
- 全ての次元`r`において[`x.stride(r)`](stride.md) `== y.stride(y)`


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <array>
#include <mdspan>

int main()
{
  using Ext4x3x2 = std::extents<size_t, 4, 3, 2>;

  std::layout_stride::mapping<Ext4x3x2> map1{{}, std::array{1, 4, 12}};
  std::layout_left::mapping<Ext4x3x2>   mapL;
  assert(map1 == mapL);

  std::layout_stride::mapping<Ext4x3x2> map2{{}, std::array{6, 2, 1}};
  std::layout_right::mapping<Ext4x3x2>  mapR;
  assert(map2 == mapR);
}
```
* ==[color ff0000]
* std::extents[link ../../extents.md]
* std::layout_stride::mapping[link ../mapping.md]
* std::layout_left::mapping[link ../../layout_left/mapping.md]
* std::layout_right::mapping[link ../../layout_right/mapping.md]


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
