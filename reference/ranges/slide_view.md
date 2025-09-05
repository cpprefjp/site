# slide_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<view V>
    requires input_range<V>
  class slide_view : public view_interface<slide_view<V>> { …… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ slide = /*unspecified*/;      // (2)
  }
}
```

## 概要

`slide_view`は各要素とそれに隣接する要素を実行時指定の個数ずつ参照する[`view`](view.md)のRange。

指定した個数が元となるRangeの要素数より大きい場合、この[`view`](view.md)は空である。

- (1): `slide_view`のクラス定義
- (2): `slide_view`を生成するカスタマイゼーションポイントオブジェクト

### Rangeコンセプト

外側Range

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          | ※    | 〇     | 〇    | ※      | ※            | ※            |            | ※     | ○       | ○   |

- ※: 元となるRangeに従う

内側Range

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          | ※    | 〇     | 〇    | ※      | ※            | ※            | ※         | ※     | ○       | ○   |

- ※: 元となるRangeに従う

## 効果

- (2): 式`views::slide(E, N)`の効果は`slide_view(E, N)`と等しい。

## 事前条件

- (2): n > 0

## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](slide_view/op_constructor.md)  | コンストラクタ                   | C++23          |
| [`base`](slide_view/base.md)                     | `V`の参照を取得する              | C++23          |
| [`begin`](slide_view/begin.md)                   | 先頭を指すイテレータを取得する   | C++23          |
| [`end`](slide_view/end.md)                       | 番兵を取得する                   | C++23          |
| [`size`](slide_view/size.md)                     | 要素数を取得する                 | C++23          |

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
| [`(deduction_guide)`](slide_view/op_deduction_guide.md) | クラステンプレートの推論補助 | C++23          |

## 例
```cpp example
#include <ranges>
#include <vector>
#include <print>

int main() {
  std::vector v = {1, 2, 3, 4, 5, 6};
  std::println("{}", v | std::views::slide(1));
  std::println("{}", v | std::views::slide(3));
  std::println("{}", v | std::views::slide(6));
  std::println("{}", v | std::views::slide(7));
}
```
* std::views::slide[color ff0000]

### 出力
```
[[1], [2], [3], [4], [5], [6]]
[[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6]]
[[1, 2, 3, 4, 5, 6]]
[]
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 3 [mark verified]

## 関連項目
- [`adjacent_view`](adjacent_view.md): `slide_view` と同じように要素を取得するが、個数をコンパイル時に指定する。内側はRangeではなく[`tuple`](/reference/tuple/tuple.md)となる

## 参照
- [N4950 26 Ranges library](https://timsong-cpp.github.io/cppwp/n4950/ranges)
