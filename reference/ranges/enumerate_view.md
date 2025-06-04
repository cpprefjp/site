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
| [`(constructor)`](enumerate_view/op_constructor.md)  | コンストラクタ                   | C++23          |
| [`base`](enumerate_view/base.md)                     | `V`の参照を取得する              | C++23          |
| [`begin`](enumerate_view/begin.md)                   | 先頭を指すイテレータを取得する   | C++23          |
| [`end`](enumerate_view/end.md)                       | 番兵を取得する                   | C++23          |
| [`size`](enumerate_view/size.md)                     | 要素数を取得する                 | C++23          |

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|-----------------------------------|----------------|
| [`empty`](view_interface/empty.md)           | Rangeが空かどうかを判定する       | C++23          |
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++23          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する        | C++23          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する        | C++23          |
| [`cbegin`](view_interface/cbegin.md)         | 定数イテレータを取得する          | C++23          |
| [`cend`](view_interface/cend.md)             | 定数イテレータ（番兵）を取得する  | C++23          |
| [`operator[]`](view_interface/op_at.md)      | 要素へアクセスする                | C++23          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](enumerate_view/op_deduction_guide.md) | クラステンプレートの推論補助 | C++23          |

## 例
```cpp example
#include <iostream>
#include <ranges>
#include <vector>

int main() {
  const std::vector v = {'a', 'b', 'c'};

  for (auto [index, x] : v | std::views::enumerate) {
    std::cout << index << ' ' << x << std::endl;
  }
}
```
* std::views::enumerate[color ff0000]

### 出力
```
0 a
1 b
2 c
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 7 [mark verified]

## 参照
- [N4950 26 Ranges library](https://timsong-cpp.github.io/cppwp/n4950/ranges)
