# operator()
* mdspan[meta header]
* function template[meta id-type]
* std[meta namespace]
* layout_right_padded::mapping[meta class]
* cpp26[meta cpp]

```cpp
template<class... Indices>
constexpr size_t operator()(Indices... idxs) const noexcept;
```

## 概要
多次元インデクス値`idxs...`に対応する要素位置を求める。


## テンプレートパラメータ制約
- `sizeof...(Indices) == rank_`が`true`、かつ
- `(`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<Indices, index_type> && ...)`が`true`、かつ
- `(`[`is_nothrow_constructible_v`](/reference/type_traits/is_nothrow_constructible.md)`<index_type, Indices> && ...)`が`true`であること。


## 事前条件
多次元インデクス値[`extents_type::index-cast`](../../extents/index-cast.md)`(idxs)`は、多次元配列サイズ`extents_`における有効なインデクスであること。


## 戻り値
```cpp
return ((static_cast<index_type>(idxs) * stride(P_rank)) + ... + 0);
```
* stride[link stride.md]


## 例外
投げない


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2642R6 Padded mdspan layouts](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2642r6.pdf)
