# required_span_size
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* layout_stride::mapping[meta class]
* cpp23[meta cpp]

```cpp
constexpr index_type required_span_size() const noexcept;
```

## 概要
メモリブロックに対する要素アクセス範囲を取得する。

説明用の関数`REQUIRED-SPAN-SIZE(e, strides)`を次のように定義する

- `e.`[`rank()`](../../extents/rank.md) `== 0`のとき値`1`
- そうでなければ、多次元インデクス空間`e`のサイズが0のとき値`0`
- そうでなければ、半開区間`[0, e.rank())`の全ての`r`に対して`(e.`[`extent`](../../extents/extent.md)`(r) - 1)`と[`extents_type::index-cast`](../../extents/index-cast.md)`(strides_[r])`を乗じた値の総和に`1`を加算した値


## 戻り値
説明専用のメンバ変数`extents_`, `strides_`に対して、`REQUIRED-SPAN-SIZE(extents_, strides_)`を返す。


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <array>
#include <mdspan>

int main()
{
  using Ext2x3 = std::extents<size_t, 2, 3>;
  using Mapping = std::layout_stride::mapping<Ext2x3>;

  Mapping map1{{}, std::array{4, 1}};
  assert(map1.required_span_size() == 7);
  // map1(i,j):
  // i/j ->
  // |  1 2 3 (4)
  // V  5 6 7  -

  Mapping map2{{}, std::array{2, 3}};
  assert(map2.required_span_size() == 9);
  // map2(i,j):
  // i/j ->
  // |   1   4   7
  // V  (2) (5) (8)
  //     3   6   9
}
```
* required_span_size()[color ff0000]
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
