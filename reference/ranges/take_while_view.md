# take_while_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<view V, class Pred>
    requires input_range<V> && is_object_v<Pred> && indirect_unary_predicate<const Pred, iterator_t<V>>
  class take_while_view : public view_interface<take_while_view<V, Pred>> { …… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ take_while = /*unspecified*/;     // (2)
  }
}
```
* view[link view.md]
* input_range[link input_range.md]
* is_object_v[link /reference/type_traits/is_object.md]
* indirect_unary_predicate[link /reference/iterator/indirect_unary_predicate.md]
* iterator_t[link iterator_t.md]
* view_interface[link view_interface.md]

## 概要
- (1): 元のRangeの先頭から指定した条件を連続して満たす範囲を取り出す[`view`](view.md)
- (2): `take_while_view`を生成するRangeアダプタオブジェクト

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          |       | (1)    | (1)   | (1)     | (1)           | (1)           | (1)        |        | ○       | ○   |

- (1): `V`に従う

## テンプレートパラメータ制約

- [`view`](view.md)`<V>`
- [`input_range`](input_range.md)`<V>`
- [`is_object_v`](/reference/type_traits/is_object.md)`<Pred>`
- [`indirect_unary_predicate`](/reference/iterator/indirect_unary_predicate.md)`<Pred, `[`iterator_t`](iterator_t.md)`<V>>`

## 効果

- (2): 式`views::take_while(E, F)`の効果は`take_while_view{E, F}`と等しい

## メンバ関数

| 名前                                                         | 説明                             | 対応バージョン |
|--------------------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](take_while_view/op_constructor.md.nolink)  | コンストラクタ                   | C++20          |
| [`base`](take_while_view/base.md.nolink)                     | `V`の参照を取得する              | C++20          |
| [`pred`](take_while_view/pred.md.nolink)                     | 述語を取得する                   | C++20          |
| [`begin`](take_while_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する   | C++20          |
| [`end`](take_while_view/end.md.nolink)                       | 番兵を取得する                   | C++20          |

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
| [`(deduction_guide)`](take_while_view/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++20          |

## 例
```cpp example
#include <ranges>
#include <iostream>

int main() {
  using namespace std;

  for (int i : views::iota(1) | views::take_while([](int x){ return x < 5; })) {
    cout << i;
  }
}
```
* views::take_while[color ff0000]
* views::iota[link iota_view.md]

### 出力
```
1234
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
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
