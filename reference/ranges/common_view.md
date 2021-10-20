# common_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<view V>
    requires (!common_range<V> && copyable<iterator_t<V>>)
  class common_view : public view_interface<common_view<V>> { …… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ common = /*unspecified*/;      // (2)
  }
}
```
* view[link view.md]
* common_range[link common_range.md]
* is_object_v[link /reference/type_traits/is_object.md]
* copyable[link /reference/concepts/copyable.md]
* iterator_t[link iterator_t.md]

## 概要
- (1): 任意のRangeを[`common_range`](common_range.md)にする[`view`](view.md)
- (2): `common_view`または同じ効果を実現する[`view`](view.md)を生成するRangeアダプタオブジェクト

同じ型のイテレータペアを受け取るレガシーなアルゴリズム関数に対して、[`common_range`](common_range.md)ではない範囲を渡したい場合、`common`を使用することで同じ型のイテレータペアを取得できるようになる。

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
| ○       | ※    | ※     | ※    | ※      | ※            | ※            | ※         | ○     | ○       | ○   |

※ 参照先のRangeに従う

## テンプレートパラメータ制約

- [`view`](view.md)`<V>`
- `!`[`common_range`](common_range.md)`<V>`
- [`copyable`](/reference/concepts/copyable.md)`<`[`iterator_t`](iterator_t.md)`<V>>`

## 効果

- (2): 式`views::common(E)`の効果は次の通り
    - [`decltype`](/lang/cpp11/decltype.md)`((E))`が[`common_range`](common_range.md)のモデルであり、[`views::all`](ref_view.md)`(E)`が有効な式であれば、[`views::all`](ref_view.md)`(E)`と等しい
    - それ以外のとき、`common_view{E}`と等しい

## メンバ関数

| 名前                                             | 説明                              | 対応バージョン |
|--------------------------------------------------|-----------------------------------|----------------|
| [`(constructor)`](ref_view/op_constructor.md.nolink)  | コンストラクタ                    | C++20          |
| [`base`](ref_view/base.md.nolink)                     | `R`の参照を取得する               | C++20          |
| [`begin`](ref_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する    | C++20          |
| [`end`](ref_view/end.md.nolink)                       | 番兵を取得する                    | C++20          |
| [`size`](ref_view/size.md.nolink)                     | 要素数を取得する                  | C++20          |

`r`を参照先のRangeとする。`size`は、[`ranges::size`](size.md)`(r)`が有効な式であるときに定義される。

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|-----------------------------------|----------------|
| [`empty`](view_interface/empty.md)           | Rangeが空かどうかを判定する       | C++20          |
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++20          |
| [`data`](view_interface/data.md)             | Rangeの先頭へのポインタを取得する | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する        | C++20          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する        | C++20          |
| [`operator[]`](view_interface/op_at.md)      | 要素へアクセスする                | C++20          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](ref_view/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++20          |

## 例
```cpp example
#include <ranges>
#include <concepts>
#include <string_view>

int main() {
  using namespace std;

  // 無限長のiotaはcommon_rangeではない
  static_assert(!ranges::common_range<decltype(views::iota(0))>);
  // commonを適用するとcommon_rangeになる
  static_assert(ranges::common_range<decltype(views::iota(0) | views::common)>);

  // 元からcommon_rangeなviewに適用しても型は変わらない
  static_assert(same_as<decltype(string_view{} | views::common), string_view>);
}
```
* views::common[color ff0000]
* views::iota[link iota_view.md]
* same_as[link /reference/concepts/same_as.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10

## 関連項目

- [C++17 範囲 for ループの制限緩和](/lang/cpp17/generalizing_the_range-based_for_loop.md)  
  範囲for文は、C++17の時点で先行して[`common_range`](common_range.md)ではない範囲を扱えるようになっている。

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
