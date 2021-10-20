# ref_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<range R>
    requires is_object_v<R>
  class ref_view : public view_interface<ref_view<R>> { …… };   // (1)

  namespace views {
    inline constexpr /*unspecified*/ all = /*unspecified*/;     // (2)

    template<viewable_range R>
    using all_t = decltype(all(declval<R>()));                  // (3)
  }
}
```
* range[link range.md]
* is_object_v[link /reference/type_traits/is_object.md]
* movable[link /reference/concepts/movable.md]
* default_initializable[link /reference/concepts/default_initializable.md]
* viewable_range[link viewable_range.md]
* view_interface[link view_interface.md]
* declval[link /reference/utility/declval.md]

## 概要
- (1): Rangeへの参照として振る舞う[`view`](view.md)
- (2): Rangeへの参照として振る舞う[`view`](view.md)を生成するRangeアダプタクロージャオブジェクト。`all`の戻り値は`ref_view`の他に、元のRangeそのものや[`subrange`](subrange.md)の場合があり、まとめて"all view"と呼ぶことがある
- (3): `all`の戻り値の型を得るエイリアステンプレート。`all_t`を使えば、`all`の分岐を気にせずに"all view"の型を得ることができる

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
| ○       | ※    | ※     | ※    | ※      | ※            | ※            | ※         | ※     | ○       | ○   |

※ 参照先のRangeに従う

## テンプレートパラメータ制約

- [`range`](range.md)`<R>`
- [`is_object_v`](/reference/type_traits/is_object.md)`<R>`

## 効果

- (2): 式`views::all(E)`の効果は次の通り
    - `E`の[`decay`](/reference/type_traits/decay.md)した型が[`view`](view.md)のモデルであれば、[`decay-copy`](/reference/exposition-only/decay-copy.md)`(E)`と等しい
    - それ以外のとき、`ref_view{E}`が有効な式であれば、`ref_view{E}`と等しい
    - それ以外のとき、[`subrange`](subrange.md)`{E}`と等しい

引数にしたRangeが元々[`view`](view.md)である場合はそのまま使用する。そうでないときは、まず引数を`ref_view`でラップしようとする。それもできないときは、イテレータと番兵を[`subrange`](subrange.md)でラップする。

## メンバ関数

| 名前                                             | 説明                              | 対応バージョン |
|--------------------------------------------------|-----------------------------------|----------------|
| [`(constructor)`](ref_view/op_constructor.md.nolink)  | コンストラクタ                    | C++20          |
| [`base`](ref_view/base.md.nolink)                     | `R`の参照を取得する               | C++20          |
| [`begin`](ref_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する    | C++20          |
| [`end`](ref_view/end.md.nolink)                       | 番兵を取得する                    | C++20          |
| [`empty`](ref_view/empty.md.nolink)                   | Rangeが空かどうかを判定する       | C++20          |
| [`size`](ref_view/size.md.nolink)                     | 要素数を取得する                  | C++20          |
| [`data`](ref_view/data.md.nolink)                     | Rangeの先頭へのポインタを取得する | C++20          |

`r`を参照先のRangeとする。`empty`、`size`、`data`は、それぞれ[`ranges::empty`](empty.md)`(r)`、[`ranges::size`](size.md)`(r)`、[`ranges::data`](data.md)`(r)`が有効な式であるときに定義される。

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|-----------------------------------|----------------|
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++20          |
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
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
