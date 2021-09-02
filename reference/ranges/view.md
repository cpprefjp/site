# view
* ranges[meta header]
* concept[meta id-type]
* std::ranges[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class T>
  concept view = range<T> && movable<T> && default_initializable<T> && enable_view<T>;
}
```
* range[link range.md]
* movable[link /reference/concepts/movable.md]
* default_initializable[link /reference/concepts/default_initializable.md]
* enable_view[link enable_view.md]

## 概要
`view`は、ビューを表すコンセプトである。`view`の要件は意味論要件がメインなので、[`enable_view`](enable_view.md)を特殊化して有効にしない限り`view`とはならない。

## モデル
型`T`が`view`のモデルとなるのは、以下の条件をすべて満たす場合である。

1. `T`はO(1)で構築できる
2. `T`はO(1)でムーブ代入できる
3. `T`はO(1)で破棄できる
4. [`copy_constructible`](/reference/concepts/copy_constructible.md)`<T>`が`false`、または`T`のコピーコンストラクタがO(1)
5. [`copyable`](/reference/concepts/copyable.md)`<T>`が`false`、または`T`のコピー代入演算子がO(1)

`view`と[`borrowed_range`](borrowed_range.md)には直接の包含関係はないが、要素を所有していると一般にこれらの要件は満たせないため、[`borrowed_range`](borrowed_range.md)でもある場合が多い。

## 備考
`view`を自作する場合、[`view_interface`](view_interface.md)を基底クラスにすると便利である。

## 例
```cpp example
#include <ranges>
#include <string_view>
#include <span>
#include <vector>

int main()
{
  // vectorはviewではない
  static_assert(!std::ranges::view<std::vector<int>>);

  // string_viewはview
  static_assert(std::ranges::view<std::string_view>);

  // spanはview
  static_assert(std::ranges::view<std::span<int>>);
}
```
* std::ranges::view[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
