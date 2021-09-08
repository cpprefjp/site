# ref_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  namespace ranges {
    template<range R>
    requires is_object_v<R>
    class ref_view : public view_interface<ref_view<R>> { …… }; // (1)

    namespace views {
      inline constexpr /*unspecified*/ all = /*unspecified*/;     // (2)

      template<viewable_range R>
      using all_t = decltype(all(declval<R>()));                  // (3)
    }
  }

  namespace views = ranges::views;
}
```
* movable[link /reference/concepts/movable.md]
* default_initializable[link /reference/concepts/default_initializable.md]
* viewable_range[link viewable_range.md]
* view_interface[link view_interface.md]
* stream-extractable[italic]

## 概要
`ref_view`(1)は、範囲への参照として振る舞う[`view`](view.md)。

カスタマイゼーションポイントオブジェクト`all`(2)で、範囲への参照として振る舞う[`view`](view.md)を生成できる。

`all`の戻り値は`ref_view`とは限らず、元の範囲そのものや[`subrange`](subrange.md)にもなる。戻り値型はエイリアステンプレート`all_t`(3)で取得できる。これらをまとめて"all view"と呼ぶことがある。

### 範囲カテゴリ

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
| ○       | ※    | ※     | ※    | ※      | ※            | ※            | ※         | ※     | ○       | ○   |

※ 参照先の範囲に従う

## テンプレートパラメータ制約

- [`range`](range.md)`<R>`
- [`is_object_v`](/reference/type_traits/is_object.md)`<R>`

## 効果

- (2): 式`views​::​all(E)`の効果は次の通り
    - `E`の[`decay`](/reference/type_traits/decay.md)した型が[`view`](view.md)のモデルであれば、[`decay-copy`](/reference/exposition-only/decay-copy.md)`(E)`と等しい
    - それ以外のとき、`ref_­view{E}`が有効な式であれば、`ref_­view{E}`と等しい
    - それ以外のとき、[`subrange`](subrange.md)`{E}`と等しい

## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](ref_view/op_constructor.md.nolink)  | コンストラクタ                   | C++20          |
| [`base`](ref_view/base.md.nolink)                     | `R`の参照を取得する              | C++20          |
| [`begin`](ref_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する   | C++20          |
| [`end`](ref_view/end.md.nolink)                       | 番兵を取得する                   | C++20          |
| [`empty`](ref_view/empty.md.nolink)                   | 範囲が空かどうかを判定する       | C++20          |
| [`size`](ref_view/size.md.nolink)                     | 要素数を取得する                 | C++20          |
| [`data`](ref_view/data.md.nolink)                     | 範囲の先頭へのポインタを取得する | C++20          |

`r`を参照先の範囲とする。`empty`、`size`、`data`は、それぞれ[`ranges::empty`](empty.md)`(r)`、[`ranges::size`](size.md)`(r)`、[`ranges::data`](data.md)`(r)`が有効な式であるときに定義される。

## 継承しているメンバ関数

| 名前                                         | 説明                             | 対応バージョン |
|----------------------------------------------|----------------------------------|----------------|
| [`operator bool`](view_interface/op_bool.md) | 範囲が空でないかどうかを判定する | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する       | C++20          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する       | C++20          |
| [`operator[]`](view_interface/op_at.md)      | 要素へアクセスする               | C++20          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](ref_view/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++20          |

## 例
```cpp example
#include <ranges>

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
