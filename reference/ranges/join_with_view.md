# join_with_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<input_range V, forward_range Pattern>
    requires view<V> && input_range<range_reference_t<V>>
          && view<Pattern>
          && compatible-joinable-ranges<range_reference_t<V>, Pattern>
  class join_with_view : public view_interface<join_with_view<V, Pattern>> { …… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ join_with = /*unspecified*/;      // (2)
  }
}
```
* compatible-joinable-ranges[italic]
* bidirectional-common[italic]

## 概要

`join_with_view`は要素がRangeであるRangeの各要素を繋げて1つのRangeとして扱う[`view`](view.md)。
その際、[`join_view`](join_view.md)と異なり、外側のRangeの各要素の間にデリミタを挿入する。
デリミタは単一の要素またはRangeである。デリミタがRangeの場合、外側のRangeの各要素の間にデリミタの各要素が毎回挿入される。

- (1): `join_with_view`のクラス定義
- (2): `join_with_view`を生成するRangeアダプタオブジェクト

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          |       |        | 〇    | (1)     | (2)           |               |            | (3)    | ○       | ○   |

- (1): 外側・内側のRangeが[`forward_range`](forward_range.md)であり、内側Rangeが参照型のとき
- (2): 外側・内側のRangeが[`bidirectional_range`](bidirectional_range.md)であり、内側Rangeが参照型かつ[`common_range`](common_range.md)であるとき
- (3): 外側・内側のRangeが[`forward_range`](forward_range.md)かつ[`common_range`](common_range.md)であり
    - `const`ではない場合、内側のRangeは参照型（*prvalue*ではない）

外側Rangeとは`V`のことであり、内側Rangeとは`range_reference_t<V>`のことである。`const`の場合`V`を`const V`として同様。

## 効果

- (2): 式`views::join_with(E, F)`の効果は[`join_with_view{E, F}`](join_with_view/op_constructor.md.nolink)と等しい。

## 備考

本説明に用いる説明専用要素を以下のように定義する。

```cpp
namespace std::ranges {
  template<class R, class P>
  concept compatible-joinable-ranges =            // 説明専用
      common_with<range_value_t<R>, range_value_t<P>> &&
      common_reference_with<range_reference_t<R>, range_reference_t<P>> &&
      common_reference_with<range_reference_t<R>, range_rvalue_reference_t<P>>;

  template<class R>
  concept bidirectional-common = bidirectional_range<R> && common_range<R>;    // 説明専用
}
```

## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](join_with_view/op_constructor.md.nolink)  | コンストラクタ                   | C++23          |
| [`base`](join_with_view/base.md.nolink)                     | `V`の参照を取得する              | C++23          |
| [`begin`](join_with_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する   | C++23          |
| [`end`](join_with_view/end.md.nolink)                       | 番兵を取得する                   | C++23          |

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|-----------------------------------|----------------|
| [`empty`](view_interface/empty.md)           | Rangeが空かどうかを判定する       | C++20          |
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する        | C++20          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する        | C++20          |
| [`cbegin`](view_interface/cbegin.md)         | 定数イテレータを取得する          | C++23          |
| [`cend`](view_interface/cend.md)             | 定数イテレータ（番兵）を取得する  | C++23          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](join_with_view/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++23          |

## 例
```cpp example
#include <ranges>
#include <vector>
#include <string>
#include <print>

int main() {
  using namespace std;
  vector<string> sv = {"hello", "world"};

  for (char c : sv | views::join_with('-')) {
    println("{}", c);
  }
}
```
* views::join_with[color ff0000]

### 出力
```
h
e
l
l
o
-
w
o
r
l
d
```

ネストされた `char` のRangeが平坦な `char` のRangeになっている。

## 例 (結果を文字列にする)
```cpp example
#include <ranges>
#include <vector>
#include <string>
#include <print>

int main() {
  using namespace std;
  vector<string> sv = {"hello", "world"};

  println("{}", sv | views::join_with("-C++23-"sv) | ranges::to<string>());
}
```
* views::join_with[color ff0000]
* ranges::to[link to.md]

### 出力
```
hello-C++23-world
```

`join_with`で得られる `char` のRangeは[`string`](/reference/string/basic_string.md)ではないが、[`ranges::to`](to.md)を使って変換できる。

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目
- [`join_view`](join_view.md)

## 参照
- [N4950 24 Ranges library](https://timsong-cpp.github.io/cppwp/ranges)
