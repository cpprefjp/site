# join_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<input_range V>
    requires view<V> && input_range<range_reference_t<V>> &&
             (is_reference_v<range_reference_t<V>> || view<range_value_t<V>>)
  class join_view : public view_interface<join_view<V>> { …… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ join = /*unspecified*/;      // (2)
  }
}
```
* input_range[link input_range.md]
* view[link view.md]
* range_reference_t[link range_reference_t.md]
* is_reference_v[link /reference/type_traits/is_reference.md]
* range_value_t[link range_value_t.md]

## 概要

- (1): 要素がRangeであるRangeの各要素を繋げて1つのRangeとして扱う[`view`](view.md)
- (2): `join_view`を生成するRangeアダプタオブジェクト

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          |       |        | 〇    | (1)     | (2)           |               |            | (3)    | ○       | ○   |

- (1): 外側・内側のRangeが[`forward_range`](forward_range.md)のとき
- (2): 外側・内側のRangeが[`bidirectional_range`](bidirectional_range.md)のとき
- (3): 外側・内側のRangeが[`forward_range`](forward_range.md)かつ[`common_range`](common_range.md)のとき

## テンプレートパラメータ制約

- [`view`](view.md)`<V>`
- [`input_range`](input_range.md)`<V>`
- [`input_range`](input_range.md)`<`[`range_reference_t`](range_reference_t.md)`<V>>`
- [`is_reference_v`](/reference/type_traits/is_reference.md)`<`[`range_reference_t`](range_reference_t.md)`<V>>`
- [`view`](view.md)`<`[`range_value_t`](range_value_t.md)`<V>>`

## 効果

- (2): 式`views::join(E)`の効果は`join_view{E}`と等しい。

## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](join_view/op_constructor.md.nolink)  | コンストラクタ                   | C++20          |
| [`base`](join_view/base.md.nolink)                     | `V`の参照を取得する              | C++20          |
| [`begin`](join_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する   | C++20          |
| [`end`](join_view/end.md.nolink)                       | 番兵を取得する                   | C++20          |

`r`を元のRangeとする。`size`は[`ranges::size`](size.md)`(r)`が有効な式であるときに定義される。

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|-----------------------------------|----------------|
| [`empty`](view_interface/empty.md)           | Rangeが空かどうかを判定する       | C++20          |
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する        | C++20          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する        | C++20          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](join_view/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++20          |

## 例
```cpp example
#include <ranges>
#include <vector>
#include <string>
#include <iostream>

int main() {
  using namespace std;
  vector<string> sv = {"hello", "world"};

  for (char c : sv | views::join) {
    cout << c << ',';
  }
  cout << '\n';
}
```
* views::join[color ff0000]

### 出力
```
h,e,l,l,o,w,o,r,l,d,
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
