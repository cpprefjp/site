# adjacent_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]
* adjacent,pairwise[meta alias]

```cpp
namespace std::ranges {
  template<forward_range V, size_t N>
    requires view<V> && (N > 0)
  class adjacent_view : public view_interface<adjacent_view<V, N>> { …… }; // (1)

  namespace views {
    template<std::size_t N>
    inline constexpr /*unspecified*/ adjacent = /*unspecified*/;      // (2)

    inline constexpr auto pairwise = adjacent<2>;                     // (3)
  }
}
```

## 概要

`adjacent_view`は各要素とそれに隣接する要素をコンパイル時指定の個数ずつ取り出した[`tuple`](/reference/tuple/tuple.md)を要素とする[`view`](view.md)。

`adjacent_view`の要素を1つ取得するごとに、`V` の要素を `N` 個取得する。

`N` が元となるRangeの要素数より大きい場合、この[`view`](view.md)は空である。

- (1): `adjacent_view`のクラス定義
- (2): `adjacent_view`を生成するカスタマイゼーションポイントオブジェクト(変数テンプレート)
- (3): `adjacent<2>` の別名

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          | (1)   | 〇     | 〇    | (1)     | (1)           | (1)           |            | (1)    | ○       | ○   |

- (1): 元となるRangeに従う

## 効果

- (2): 式`views::adjacent<N>(E)`の効果は次の通り
    - `N` > 0 のとき、`adjacent_view<`[`views::all_t`](all.md)`<decltype((E))>, N>(E)` と等しい
    - `N` = 0 のとき、`auto((void)E,` [`views::empty`](empty_view.md)`<`[`tuple`](/reference/tuple/tuple.md)`<>>)` と等しい


## メンバ関数

| 名前                                                | 説明                             | 対応バージョン |
|-----------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](adjacent_view/op_constructor.md)  | コンストラクタ                   | C++23          |
| [`base`](adjacent_view/base.md)                     | `V`の参照を取得する              | C++23          |
| [`begin`](adjacent_view/begin.md)                   | 先頭を指すイテレータを取得する   | C++23          |
| [`end`](adjacent_view/end.md)                       | 番兵を取得する                   | C++23          |
| [`size`](adjacent_view/size.md)                     | 要素数を取得する                 | C++23          |

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
| [`(deduction_guide)`](adjacent_view/op_deduction_guide.md) | クラステンプレートの推論補助 | C++23          |

## 例
```cpp example
#include <ranges>
#include <vector>
#include <print>

int main() {
  std::vector v = {1, 2, 3, 4, 5, 6};
  std::println("{}", v | std::views::adjacent<0>);
  std::println("{}", v | std::views::adjacent<1>);
  std::println("{}", v | std::views::adjacent<3>);
  std::println("{}", v | std::views::adjacent<6>);
  std::println("{}", v | std::views::adjacent<7>);
}
```
* std::views::adjacent[color ff0000]

### 出力
```
[]
[(1), (2), (3), (4), (5), (6)]
[(1, 2, 3), (2, 3, 4), (3, 4, 5), (4, 5, 6)]
[(1, 2, 3, 4, 5, 6)]
[]
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 19 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 7 [mark verified]

## 関連項目
- [`adjacent_transform_view`](adjacent_transform_view.md): `adjacent_view` と同じように要素を取得して関数を適用する
- [`slide_view`](slide_view.md): `adjacent_view` と同じように要素を取得するが、個数を実行時に指定する。内側は[`tuple`](/reference/tuple/tuple.md)ではなく[`view`](view.md)となる

## 参照
- [N4950 26 Ranges library](https://timsong-cpp.github.io/cppwp/n4950/ranges)
- [P2321R2 zip](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2321r2.html)
