# drop_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<view V>
  class drop_view : public view_interface<drop_view<V>> { …… };  // (1)

  namespace views {
    inline constexpr /*unspecified*/ drop = /*unspecified*/;     // (2)
  }
}
```

## 概要
- (1): 元のRangeの先頭から指定した個数の値を除去したRangeとして振る舞う[`view`](view.md)
- (2): `drop_view`、または(1)の動作を実現する[`view`](view.md)を生成するRangeアダプタオブジェクト

元のRangeの大きさを超える個数が指定された場合、`drop`が返す[`view`](view.md)は空になる。

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
| (1)      | (1)   | (1)    | (1)   | (1)     | (1)           | (1)           | (1)        | (1)    | ○       | ○   |

- (1): `V`に従う

## テンプレートパラメータ制約

- [`view`](view.md)`<V>`

## 効果

- (2): `E`および`F`を式、型`T`を[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<`[`decltype`](/lang/cpp11/decltype.md)`((E))>`、型`D`を[`range_difference_t`](range_difference_t.md)`<`[`decltype`](/lang/cpp11/decltype.md)`((E))>`とする。式`views::drop(E, F)`の効果は以下の通り
    - [`decltype`](/lang/cpp11/decltype.md)`((F))`が[`convertible_to`](/reference/concepts/convertible_to.md)`<D>`のモデルでなければ、呼び出しは不適格
    - `T`が[`ranges::empty_view`](empty_view.md)の特殊化であれば、`((void) F, `[`decay-copy`](/reference/exposition-only/decay-copy.md)`(E))`と等しい。ただし、`E`と`F`の評価順序は不定順で序列化(indeterminately sequenced)される
    - `T`が[`random_access_range`](random_access_range.md)および[`sized_range`](sized_range.md)のモデルであり、かつ次のいずれかの特殊化であるとき、`T(`[`ranges::begin`](begin.md)`(E) + `[`min`](/reference/algorithm/min.md)`<D>(`[`ranges::size`](size.md)`(E), F), `[`ranges::end`](end.md)`(E))`と等しい。ただし、`E`は1度だけ評価される
        - [`span`](/reference/span/span.md) (ただし、`T::extent == `[`dynamic_extent`](/reference/span/dynamic_extent.md)であること)
        - [`basic_string_view`](/reference/string_view/basic_string_view.md)
        - [`ranges::iota_view`](iota_view.md)
        - [`ranges::subrange`](subrange.md)
    - それ以外のとき、`ranges::drop_view(E, F)`

`drop_view`でラップする必要が無い型では`drop_view`を使わないようになっている。

## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](drop_view/op_constructor.md)  | コンストラクタ                   | C++20          |
| [`base`](drop_view/base.md)                     | `V`の参照を取得する              | C++20          |
| [`begin`](drop_view/begin.md)                   | 先頭を指すイテレータを取得する   | C++20          |
| [`end`](drop_view/end.md)                       | 番兵を取得する                   | C++20          |
| [`size`](drop_view/size.md)                     | 要素数を取得する                 | C++20          |

`r`を元のRangeとする。`size`は[`ranges::size`](size.md)`(r)`が有効な式であるときに定義される。

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|-----------------------------------|----------------|
| [`empty`](view_interface/empty.md)           | Rangeが空かどうかを判定する       | C++20          |
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++20          |
| [`data`](view_interface/data.md)             | Rangeの先頭へのポインタを取得する | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する        | C++20          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する        | C++20          |
| [`operator[]`](view_interface/op_at.md)      | 要素へアクセスする                | C++20          |
| [`cbegin`](view_interface/cbegin.md)         | 定数イテレータを取得する             | C++23          |
| [`cend`](view_interface/cend.md)             | 定数イテレータ（番兵）を取得する      | C++23          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](drop_view/op_deduction_guide.md) | クラステンプレートの推論補助 | C++20          |

## 例
```cpp example
#include <ranges>
#include <iostream>

int main() {
  using namespace std;

  for (int i : views::iota(1, 10) | views::drop(5)) {
    cout << i;
  }
}
```
* views::drop[color ff0000]
* views::iota[link iota_view.md]

### 出力
```
6789
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
- [P2367R0 Remove misuses of list-initialization from Clause 24](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2367r0.html) (本提案文書はC++20に遡って適用されている)
- [P2017R1 Conditionally borrowed ranges](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2017r1.html)
