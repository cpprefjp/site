# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* iota_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
// (1)
iota_view() = default;

// (2)
constexpr explicit iota_view(W value);

// (3)
constexpr iota_view(type_identity_t<W> value, type_identity_t<Bound> bound);

// (4)
constexpr iota_view(iterator first, sentinel last);
```
* iota_view[link ../iota_view.md]
* type_identity_t[link /reference/type_traits/type_identity.md]
* iterator[link iterator.md]
* sentinel[link sentinel.md]

## 概要
- (1) : `[W(), Bound())` を範囲とする`iota_view`を構築する
- (2) : `[value, Bound())` を範囲とする`iota_view`を構築する
- (3) : `[value, bound)` を範囲とする`iota_view`を構築する
- (4) : イテレータ `[first, last)` が指す値を範囲とする`iota_view`を構築する((3)に委譲)

`Bound`が[`unreachable_sentinel_t`](/reference/iterator/unreachable_sentinel_t.md)のとき、無限長の`iota_view`となる。

## 事前条件

`e`が`b`から到達できるとは、`b`をn回インクリメントしたとき、`e == b`が真となるようなnが存在することをいう。

- (2): `Bound`は[`unreachable_sentinel_t`](/reference/iterator/unreachable_sentinel_t.md)である。または、`Bound()`は`value`から到達できる
- (3): `Bound`は[`unreachable_sentinel_t`](/reference/iterator/unreachable_sentinel_t.md)である。または、`bound`は`value`から到達できる。[`totally_ordered_with`](/reference/concepts/totally_ordered.md)`<W, Bound>`ならば、`bool(value <= bound)`が`true`である

## 効果

`iota_view`が内部で保持する先頭と終端の値を引数で初期化する。

## 例
```cpp example
#include <ranges>

int main()
{
  // 無限長
  constexpr std::ranges::iota_view iota1{0};
  static_assert(not std::ranges::sized_range<decltype(iota1)>);
  static_assert(iota1.front() == 0);

  // 1引数だが、Boundがintなので、範囲は [-5, int()) すなわち [-5, 0) となり有限長
  constexpr std::ranges::iota_view<int, int> iota2{-5};
  static_assert(std::ranges::size(iota2) == 5);

  // iota_viewの部分範囲
  constexpr std::ranges::iota_view iota3{0, 10};
  constexpr decltype(iota3) sub{iota3.begin() + 3, iota3.end()};
  static_assert(sub.front() == 3);
}
```

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
