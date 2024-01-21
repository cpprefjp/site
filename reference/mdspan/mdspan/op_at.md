# operator[]
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* mdspan[meta class]
* cpp23[meta cpp]

```cpp
template<class... OtherIndexTypes>
constexpr reference operator[](OtherIndexTypes... indices) const;  // (1)

template<class OtherIndexType>
constexpr reference operator[](span<OtherIndexType, rank()> indices) const;  // (2)

template<class OtherIndexType>
constexpr reference operator[](const array<OtherIndexType, rank()>& indices) const;  // (3)
```
* rank()[link rank.md]
* span[link /reference/span/span.md]
* array[link /reference/array/array.md]

## 概要
多次元インデクスを用いて要素にアクセスする。


## テンプレートパラメータ制約
- (1) :
    - `(`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<OtherIndexTypes, index_type> && ...)`が`true`、かつ
    - `(`[`is_nothrow_constructible_v`](/reference/type_traits/is_nothrow_convertible.md)`<index_type, OtherIndexTypes> && ...)`が`true`、かつ
    - `sizeof...(OtherIndexTypes) ==` [`rank()`](rank.md)が`true`であること
- (2), (3) :
    - `(`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const OtherIndexTypes&, index_type> && ...)`が`true`、かつ
    - `(`[`is_nothrow_constructible_v`](/reference/type_traits/is_nothrow_convertible.md)`<index_type, const OtherIndexTypes&> && ...)`が`true`であること


## 事前条件
(1) : パック`I`を[`extents_type::index-cast`](../extents/index-cast.md)`(`[`as_const`](/reference/utility/as_const.md)`(indices))`としたとき、`I`は`extents()`の多次元インデクスであること。


## 効果
(1) : 以下と等価

```cpp
return acc_.access(ptr_, map_(static_cast<index_type>(std::move(indices))...));
```
* acc_.access[link ../AccessorPolicy.md]
* map_[link ../LayoutMapping.md]
* std::move[link /reference/utility/move.md]

(2), (3) : 説明用のパラメータパック`P`が[`is_same_v`](/reference/type_traits/is_same.md)`<`[`make_index_sequence`](/reference/utility/make_index_sequence.md)`<`[`rank()`](rank.md)`>,` [`index_sequence`](/reference/utility/index_sequence.md)`<P...>> == true`となるとき、以下と等価

```cpp
return operator[](extents_type::index-cast(as_const(indices[P]))...);
```
* extents_type::index-cast[link ../extents/index-cast.md]
* as_const[link /reference/utility/as_const.md]


## 例
```cpp example
#include <cassert>
#include <mdspan>

int main()
{
  int arr[] = {1, 2, 3, 4, 5, 6};
  // 静的要素数 2x3 の2次元配列ビュー
  std::mdspan<int, std::extents<size_t, 2, 3>> mat{arr};

  assert(map[0,0] == 1);
  assert(map[1,2] == 6);
}
```

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
- C++23 [添字演算子の多次元サポート](cpp23/multidimensional_subscript_operator.nd.nolink)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
