# enumerate_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<view V>
    requires range-with-movable-references<V>
  class enumerate_view : public view_interface<enumerate_view<V>> { …… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ enumerate = /*unspecified*/;      // (2)
  }
}
```
* range-with-movable-references[link range-with-movable-references.md]

## 概要

`enumerate_view`はインデックスを付ける[`view`](view.md)。

`enumerate_view`の要素は、インデックスと元のRangeの要素からなる[`tuple`](/reference/tuple/tuple.md) ([`tuple`](/reference/tuple/tuple.md)`<`[`range_difference_t`](range_difference_t.md)`<Base>, `[`range_value_t`](range_value_t.md)`<Base>>`)である。

- (1): `enumerate_view`のクラス定義
- (2): `enumerate_view`を生成するRangeアダプタオブジェクト

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          | ※    | ※     | 〇    | ※      | ※            | ※            |            | ※     | ○       | ○   |

- ※: 元となるRangeに従う

## 効果

- (2): 式`views::enumerate(E)`の効果は`enumerate_view<`[`views::all_t`](all.md)`<decltype((E))>>(E)` と等しい


## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](enumerate_view/op_constructor.md.nolink)  | コンストラクタ                   | C++23          |
| [`base`](enumerate_view/base.md.nolink)                     | `V`の参照を取得する              | C++23          |
| [`begin`](enumerate_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する   | C++23          |
| [`end`](enumerate_view/end.md.nolink)                       | 番兵を取得する                   | C++23          |
| [`size`](enumerate_view/size.md.nolink)                     | 要素数を取得する                 | C++23          |

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|-----------------------------------|----------------|
| [`empty`](view_interface/empty.md)           | Rangeが空かどうかを判定する       | C++20          |
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する        | C++20          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する        | C++20          |
| [`cbegin`](view_interface/cbegin.md)         | 定数イテレータを取得する          | C++23          |
| [`cend`](view_interface/cend.md)             | 定数イテレータ（番兵）を取得する  | C++23          |
| [`operator[]`](view_interface/op_at.md)      | 要素へアクセスする                | C++20          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](enumerate_view/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++23          |

## 例
```cpp example
#include <ranges>
#include <vector>
#include <print>

int main() {
  const std::vector v = {'a', 'b', 'c'};

  std::println("{}", v | std::views::enumerate);
}
```
* std::views::enumerate[color ff0000]

### 出力
```
[(0, 'a'), (1, 'b'), (2, 'c')]
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [N4950 26 Ranges library](https://timsong-cpp.github.io/cppwp/n4950/ranges)
