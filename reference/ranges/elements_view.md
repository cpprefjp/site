# elements_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<input_range V, size_t N>
    requires view<V> && has-tuple-element<range_value_t<V>, N> &&
             has-tuple-element<remove_reference_t<range_reference_t<V>>, N>
  class elements_view : public view_interface<elements_view<V, N>> { …… }; // (1)

  template<class R>
  using keys_view = elements_view<views::all_t<R>, 0>;                     // (2)

  template<class R>
  using values_view = elements_view<views::all_t<R>, 1>;                   // (3)

  namespace views {
    template<size_t N>
    inline constexpr /*unspecified*/ elements = /*unspecified*/;           // (4)

    inline constexpr auto keys = elements<0>;                              // (5)

    inline constexpr auto values = elements<1>;                            // (6)
  }
}
```
* view[link view.md]
* range_value_t[link range_value_t.md]
* remove_reference_t[link /reference/type_traits/remove_reference.md]
* range_reference_t[link range_reference_t.md]
* view_interface[link view_interface.md]
* views::all_t[link all.md]

## 概要

タプルと見なせる型を要素とするRangeに対して、各要素に[`get`](/reference/tuple/tuple/get.md)を適用する[`view`](view.md)。

- (1): 各要素に[`get`](/reference/tuple/tuple/get.md)`<N>`を適用する[`view`](view.md)
- (2): 各要素に[`get`](/reference/tuple/tuple/get.md)`<0>`を適用する[`view`](view.md)
- (3): 各要素に[`get`](/reference/tuple/tuple/get.md)`<1>`を適用する[`view`](view.md)
- (4): `elements_view`を生成するRangeアダプタオブジェクト
- (5): `keys_view`を生成するRangeアダプタオブジェクト
- (6): `values_view`を生成するRangeアダプタオブジェクト

`elements`で得られる[`view`](view.md)の大きさは、指定した個数に関わらず、元のRangeの大きさを超えることは無い。

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
| (1)      | (1)   | (1)    | (1)   | (1)     | (1)           | (1)           |            | (1)    | ○        | ○   |

- (1): `V`に従う

## テンプレートパラメータ制約

説明専用コンセプト`has-tuple-element`を次のように定義する。

```cpp
// C++20
template<class T, size_t N>
concept has-tuple-element =
  requires(T t) {
    typename tuple_size<T>::type;
    requires N < tuple_size_v<T>;
    typename tuple_element_t<N, T>;
    { get<N>(t) } -> convertible_to<const tuple_element_t<N, T>&>;
  };

// C++23
template<class T, size_t N>
concept has-tuple-element =
  tuple-like<T> && N < tuple_size_v<T>;
```
* tuple_size[link /reference/tuple/tuple_size.md]
* tuple_element_t[link /reference/tuple/tuple_element.md]
* get[link /reference/tuple/tuple/get.md]
* convertible_to[link /reference/concepts/convertible_to.md]
* tuple-like[link /reference/tuple/tuple-like.md]
* tuple_size_v[link /reference/tuple/tuple_size.md]

これを用いて、

- [`view`](view.md)`<V>`
- [`input_range`](input_range.md)`<V>`
- `has-tuple-element<`[`range_value_t`](range_value_t.md)`<V>, N>`
- `has-tuple-element<`[`remove_reference_t`](/reference/type_traits/remove_reference.md)`<`[`range_reference_t`](range_reference_t.md)`<V>>, N>`

## 効果

- (4): `E`を部分式、`N`を定数式とするとき、式`views::elements<N>(E)`の効果は`elements_view<`[`views::all_t`](all.md)`<`[`decltype`](/lang/cpp11/decltype.md)`((E))>, N>{E}`と等しい。

## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](elements_view/op_constructor.md.nolink)  | コンストラクタ                   | C++20          |
| [`base`](elements_view/base.md.nolink)                     | `V`の参照を取得する              | C++20          |
| [`begin`](elements_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する   | C++20          |
| [`end`](elements_view/end.md.nolink)                       | 番兵を取得する                   | C++20          |
| [`size`](elements_view/size.md.nolink)                     | 要素数を取得する                 | C++20          |

`r`を元のRangeとする。`size`は[`ranges::size`](size.md)`(r)`が有効な式であるときに定義される。

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|-----------------------------------|----------------|
| [`empty`](view_interface/empty.md)           | Rangeが空かどうかを判定する       | C++20          |
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する        | C++20          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する        | C++20          |
| [`operator[]`](view_interface/op_at.md)      | 要素へアクセスする                | C++20          |
| [`cbegin`](view_interface/cbegin.md)         | 定数イテレータを取得する             | C++23          |
| [`cend`](view_interface/cend.md)             | 定数イテレータ（番兵）を取得する      | C++23          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](elements_view/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++20          |

## 例
```cpp example
#include <ranges>
#include <map>
#include <string>
#include <iostream>

int main() {
  using namespace std;
  map<int, string> m = {{1, "one"}, {2, "two"}, {3, "three"}};

  for (int i : m | views::keys) {
    cout << i << '\n';
  }
    
  for (const string& i : m | views::values) {
    cout << i << '\n';
  }
}
```
* views::keys[color ff0000]
* views::values[color ff0000]

### 出力
```
1
2
3

one
two
three
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
- [`zip_view`](zip_view.md) elements_viewの逆(要素からタプルを作る)

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [P2165R4 Compatibility between `tuple`, `pair` and *tuple-like* objects](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2165r4.pdf)
- [P2017R1 Conditionally borrowed ranges](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2017r1.html)
