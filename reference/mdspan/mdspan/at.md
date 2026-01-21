# at
* mdspan[meta header]
* function template[meta id-type]
* std[meta namespace]
* mdspan[meta class]
* cpp26[meta cpp]

```cpp
template<class... OtherIndexTypes>
constexpr reference at(OtherIndexTypes... indices) const;  // (1)

template<class OtherIndexType>
constexpr reference at(span<OtherIndexType, rank()> indices) const;  // (2)

template<class OtherIndexType>
constexpr reference at(const array<OtherIndexType, rank()>& indices) const;  // (3)
```
* rank()[link rank.md]
* span[link /reference/span/span.md]
* array[link /reference/array/array.md]

## 概要
多次元インデクスを用いて要素にアクセスする。


## テンプレートパラメータ制約
- (1) :
    - `(`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<OtherIndexTypes, index_type> && ...)`が`true`、かつ
    - `(`[`is_nothrow_constructible_v`](/reference/type_traits/is_nothrow_constructible.md)`<index_type, OtherIndexTypes> && ...)`が`true`、かつ
    - `sizeof...(OtherIndexTypes) ==` [`rank()`](rank.md)が`true`であること
- (2), (3) :
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const OtherIndexTypes&, index_type>`が`true`、かつ
    - [`is_nothrow_constructible_v`](/reference/type_traits/is_nothrow_constructible.md)`<index_type, const OtherIndexTypes&>`が`true`であること


## 効果
(1) : 説明用のパック`I`を[`extents_type::index_cast`](../extents/index-cast.md)`(std::move(indices))`として、[`(*this)[I...]`](op_at.md)を返す。

(2), (3) : 説明用のパラメータパック`P`が[`is_same_v`](/reference/type_traits/is_same.md)`<`[`make_index_sequence`](/reference/utility/make_index_sequence.md)`<`[`rank()`](rank.md)`>,` [`index_sequence`](/reference/utility/index_sequence.md)`<P...>> == true`となるとき、以下と等価

```cpp
return at(extents_type::index-cast(as_const(indices[P]))...);
```
* extents_type::index-cast[link ../extents/index-cast.md]
* as_const[link /reference/utility/as_const.md]


## 例外
(1) : 説明用のパック`I`を[`extents_type::index_cast`](../extents/index-cast.md)`(std::move(indices))`として、`I`が`extents()`の多次元インデクス値でなければ[`out_of_range`](/reference/stdexcept/out_of_range.md)を送出する。


## 例
```cpp example
#include <cassert>
#include <mdspan>

int main()
{
  int arr[] = {1, 2, 3, 4, 5, 6};
  // 静的要素数 2x3 の2次元配列ビュー
  std::mdspan<int, std::extents<size_t, 2, 3>> mat{arr};

  assert(mat.at(0, 0) == 1);
  assert(mat.at(1, 2) == 6);
}
```

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


## 関連項目
- [`operator[]`](op_at.md)


## 参照
- [P3383R3 mdspan.at()](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3383r3.html)
