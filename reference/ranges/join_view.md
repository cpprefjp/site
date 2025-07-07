# join_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<input_range V>
    requires view<V> && input_range<range_reference_t<V>>
  class join_view : public view_interface<join_view<V>> { …… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ join = /*unspecified*/;      // (2)
  }
}
```

## 概要

- (1): 要素がRangeであるRangeの各要素を繋げて1つのRangeとして扱う[`view`](view.md)
- (2): `join_view`を生成するRangeアダプタオブジェクト

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          |       |        | 〇    | (1)     | (2)           |               |            | (3)    | ○       | ○   |

- (1): 外側・内側のRangeが[`forward_range`](forward_range.md)であり、内側Rangeが参照型のとき
- (2): 外側・内側のRangeが[`bidirectional_range`](bidirectional_range.md)であり、内側Rangeが参照型かつ[`common_range`](common_range.md)であるとき
- (3): 外側・内側のRangeが[`forward_range`](forward_range.md)かつ[`common_range`](common_range.md)であり
    - `const`ではない場合、内側のRangeは参照型（*prvalue*ではない）

外側Rangeとは`V`のことであり、内側Rangeとは`range_reference_t<V>`のことである。`const`の場合`V`を`const V`として同様。

## テンプレートパラメータ制約

- [`view`](view.md)`<V>`
- [`input_range`](input_range.md)`<V>`
- [`input_range`](input_range.md)`<`[`range_reference_t`](range_reference_t.md)`<V>>`

## 効果

- (2): 式`views::join(E)`の効果は`join_view{E}`と等しい。

## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](join_view/op_constructor.md)  | コンストラクタ                   | C++20          |
| [`base`](join_view/base.md)                     | `V`の参照を取得する              | C++20          |
| [`begin`](join_view/begin.md)                   | 先頭を指すイテレータを取得する   | C++20          |
| [`end`](join_view/end.md)                       | 番兵を取得する                   | C++20          |

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|-----------------------------------|----------------|
| [`empty`](view_interface/empty.md)           | Rangeが空かどうかを判定する       | C++20          |
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する        | C++20          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する        | C++20          |
| [`cbegin`](view_interface/cbegin.md)         | 定数イテレータを取得する             | C++23          |
| [`cend`](view_interface/cend.md)             | 定数イテレータ（番兵）を取得する      | C++23          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](join_view/op_deduction_guide.md) | クラステンプレートの推論補助 | C++20          |

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

ネストされた `char` のRangeが平坦な `char` のRangeになっている。

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 関連項目
- [`join_with_view`](join_with_view.md)

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [P2328R1 `join_view` should join all views of ranges](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2328r1.html)
