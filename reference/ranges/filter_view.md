# filter_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<input_range V, indirect_unary_predicate<iterator_t<V>> Pred>
    requires view<V> && is_object_v<Pred>
  class filter_view : public view_interface<filter_view<V, Pred>> { …… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ filter = /*unspecified*/;     // (2)
  }
}
```
* input_range[link input_range.md]
* indirect_unary_predicate[link /reference/iterator/indirect_unary_predicate.md]
* iterator_t[link iterator_t.md]
* view[link view.md]
* is_object_v[link /reference/type_traits/is_object.md]
* view_interface[link view_interface.md]

## 概要
- (1): 指定された条件`Pred`を満たす要素だけが要素となる[`view`](view.md)
- (2): `filter_view`を生成するRangeアダプタオブジェクト

元のRangeから条件を満たす要素を探す処理は遅延評価される。

- 初めてメンバ関数[`begin`](filter_view/begin.md.nolink)が呼び出されたときに先頭の要素を決定し、残りはイテレータが進むときに求める。
- [`begin`](filter_view/begin.md.nolink)は償却定数時間で実行できなければならないため、[`begin`](filter_view/begin.md.nolink)の値はキャッシュされる。

`filter_view`の要素を書き換えてもよいが、書き換えた後の要素が`Pred`を満たさない場合は未定義動作となる。

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          |       | ※     | ○    | ※      | ※            |               |            | ※     | ○       | ○   |

※ `V`に従う

- `Pred`のオブジェクトを所有し、イテレータがそれを参照するため、[`borrowed_range`](borrowed_range.md)ではない
- 条件を満たす要素を探す処理が必要なため、[`random_access_range`](random_access_range.md)にはならない

## テンプレートパラメータ制約

- [`input_range`](input_range.md)`<V>`
- [`view`](view.md)`<V>`
- [`is_object_v`](/reference/type_traits/is_object.md)`<Pred>`
- [`indirect_unary_predicate`](/reference/iterator/indirect_unary_predicate.md)`<Pred, `[`iterator_t`](iterator_t.md)`<V>>`

## 効果

- (2): 式`views::filter(E, P)`の効果は`filter_view{E, P}`と等しい

## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](filter_view/op_constructor.md.nolink)  | コンストラクタ                   | C++20          |
| [`base`](filter_view/base.md.nolink)                     | `V`の参照を取得する              | C++20          |
| [`pred`](filter_view/pred.md.nolink)                     | 述語を取得する                   | C++20          |
| [`begin`](filter_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する   | C++20          |
| [`end`](filter_view/end.md.nolink)                       | 番兵を取得する                   | C++20          |

## 継承しているメンバ関数

| 名前                                         | 説明                             | 対応バージョン |
|----------------------------------------------|----------------------------------|----------------|
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する       | C++20          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する       | C++20          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](filter_view/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++20          |

## 例
```cpp example
#include <ranges>
#include <iostream>

int main() {
  using namespace std;
  int a[] = {1, 2, 3, 4, 5};

  for (int& i : a | views::filter([](int x){ return x % 2 == 0; })) {
    cout << i;
    i *= 2; // filterした要素を2倍にする (2倍しても条件を満たすことに注意)
  }
  cout << '\n';
  for (int i : a) {
    cout << i;
  }
}
```
* views::filter[color ff0000]

### 出力
```
24
14385
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
