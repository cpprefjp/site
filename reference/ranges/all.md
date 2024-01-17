# all
* ranges[meta header]
* std::ranges::views[meta namespace]
* cpo[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges::views {
  inline constexpr /*unspecified*/ all = /*unspecified*/;     // (1)

  template<viewable_range R>
  using all_t = decltype(all(declval<R>()));                  // (2)
}
```
* viewable_range[link viewable_range.md]
* declval[link /reference/utility/declval.md]

## 概要
- (1): Rangeへの参照として振る舞う[`view`](view.md)を生成するRangeアダプタクロージャオブジェクト
- (2): `all`の戻り値の型を得るエイリアステンプレート

`all`は、元のRange全体を表す[`view`](view.md)。これは、[`view`](view.md)ではないRangeを[`view`](view.md)として扱うために利用できる。
Rangeアダプタオブジェクトでも暗黙的に使用され、それにより[`view`](view.md)かどうかを気にせず使えるようになっている。

`all`が生成する`view`をまとめて"all view"という。`all_t`を使えば、`all`の型を得ることができる。

## 効果

式`views::all(E)`の効果は次の通り

- `E`の[`decay`](/reference/type_traits/decay.md)した型が[`view`](view.md)のモデルであれば、[`decay-copy`](/reference/exposition-only/decay-copy.md)`(E)`と等しい
- それ以外のとき、[`ref_view`](ref_view.md)`{E}`が有効な式であれば、[`ref_view`](ref_view.md)`{E}`と等しい
- それ以外のとき、[`owning_view`](owning_view.md)`{E}`と等しい

## 例
```cpp example
#include <ranges>
#include <iostream>

int main() {
  using namespace std;
  int a[] = {1, 2, 3, 4, 5};

  for (int i : a | views::all) {
    cout << i;
  }
}
```
* views::all[color ff0000]

### 出力
```
12345
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10

## 参照
- [N4892 24 Ranges library](https://timsong-cpp.github.io/cppwp/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [［C++］ `<ranges>`のviewを見る19 - owning_view](https://zenn.dev/onihusube/articles/fd07528b68ae0c)
- [P2415R2 What is a `view`?](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2415r2.html) (本提案文書はC++20に遡って適用されている)
