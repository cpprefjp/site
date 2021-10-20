# reverse_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<view V>
    requires bidirectional_range<V>
  class reverse_view : public view_interface<reverse_view<V>> { …… };   // (1)

  namespace views {
    inline constexpr /*unspecified*/ reverse = /*unspecified*/;         // (2)
  }
}
```
* view[link view.md]
* bidirectional_range[link bidirectional_range.md]
* view_interface[link view_interface.md]

## 概要
- (1): 任意の[`bidirectional_range`](bidirectional_range.md)を逆順にする[`view`](view.md)
- (2): `reverse_view`または同じ効果を実現する[`view`](view.md)を生成するRangeアダプタオブジェクト

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
| ○       | ※    | ※     | ○    | ○      | ○            | ※            |            | ○     | ○       | ○   |

※ 参照先のRangeに従う

## テンプレートパラメータ制約

- [`view`](view.md)`<V>`
- [`bidirectional_range`](bidirectional_range.md)`<V>`

## 効果

- (2): 式`views::reverse(E)`の効果は次の通り
    - `E`の型が`reverse_view`の特殊化であれば、`E.base()`と等しい (CV修飾されている場合を含む)
    - イテレータ型`I`、[`subrange_kind`](subrange_kind.md)の値`K`に対し、`E`の型がCV修飾された[`subrange`](subrange.md)`<`[`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<I>, `[`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<I>, K>`であるとする。このとき、`E`は一度しか評価されないとして、
        - `K`が[`subrange_kind::sized`](subrange_kind.md)であれば、[`subrange`](subrange.md)`<I, I, K>(E.end().base(), E.begin().base(), E.size())`と等しい
        - それ以外のとき、[`subrange`](subrange.md)`<I, I, K>(E.end().base(), E.begin().base())`と等しい
    - それ以外のとき、`reverse_view{E}`と等しい

`V | views::reverse | views::reverse`のように連続して適用したとき、結果として元に戻るのではなく、式の効果自体が`V`と等しくなる。

## メンバ関数

| 名前                                             | 説明                              | 対応バージョン |
|--------------------------------------------------|-----------------------------------|----------------|
| [`(constructor)`](ref_view/op_constructor.md.nolink)  | コンストラクタ                    | C++20          |
| [`base`](ref_view/base.md.nolink)                     | `V`の参照を取得する               | C++20          |
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
#include <iostream>

int main() {
  using namespace std;
  using namespace std::literals;

  for(char c : "Hello"sv | views::reverse) {
    cout << c;
  }
  cout << '\n';

  // reverseを2回適用すると元の型に戻る
  static_assert(same_as<string_view, decltype(""sv | views::reverse | views::reverse)>);
}
```
* views::reverse[color ff0000]
* same_as[link /reference/concepts/same_as.md]

### 出力
```
olleH
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
