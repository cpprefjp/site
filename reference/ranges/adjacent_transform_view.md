# adjacent_transform_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<forward_range V, move_constructible F, size_t N>
    requires view<V> && (N > 0) && is_object_v<F> &&
             regular_invocable<F&, REPEAT(range_reference_t<V>, N)...> &&
             can-reference<invoke_result_t<F&, REPEAT(range_reference_t<V>, N)...>>
  class adjacent_transform_view : public view_interface<adjacent_transform_view<V, F, N>> { …… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ adjacent_transform = /*unspecified*/;      // (2)
  }
}
```
* REPEAT[italic]
* can-reference[link /reference/iterator/dereferenceable.md]

## 概要

`adjacent_transform_view`は各要素とそれに隣接する要素をコンパイル時指定の個数ずつ取り出し、それらを引数として関数を呼び出した結果を要素とする[`view`](view.md)。

`adjacent_transform_view`の要素を1つ取得するごとに、`V` の要素を `N` 個取得する。

`N` が元となるRangeの要素数より大きい場合、この[`view`](view.md)は空である。

- (1): `adjacent_transform_view`のクラス定義
- (2): `adjacent_transform_view`を生成するカスタマイゼーションポイントオブジェクト


### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          | (1)   | 〇     | 〇    | (1)     | (1)           | (1)           |            | (1)    | ○       | ○   |

- (1): [`adjacent_view`](adjacent_view.md)`<V, N>`に従う

## 効果

- (2): 式 `views::adjacent_transform<N>(E, F)` の効果は以下の通り。
    - `N` > 0 のとき、`adjacent_transform_view<`[`views::all_t`](all.md)`<decltype((E))>,` [`decay_t`](/reference/type_traits/decay.md)`<decltype((F))>, N>(E, F)` と等しい
    - `N` = 0 のとき、`((void)E,` [`views::zip_transform`](zip_transform_view.md)`(F))` と等しい(ただし`E`と`F`の評価順は不定)

## 備考

`REPEAT(T, N)` をT型のN個のパックとする。

## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](adjacent_transform_view/op_constructor.md)  | コンストラクタ                   | C++23          |
| [`base`](adjacent_transform_view/base.md)                     | `V`の参照を取得する              | C++23          |
| [`begin`](adjacent_transform_view/begin.md)                   | 先頭を指すイテレータを取得する   | C++23          |
| [`end`](adjacent_transform_view/end.md)                       | 番兵を取得する                   | C++23          |
| [`size`](adjacent_transform_view/size.md)                     | 要素数を取得する                 | C++23          |

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
| [`(deduction_guide)`](adjacent_transform_view/op_deduction_guide.md) | クラステンプレートの推論補助 | C++23          |

## 例
```cpp example
#include <iostream>
#include <vector>
#include <ranges>

int main() {
  // 隣接する要素間の差を計算する
  std::vector v = {9, 2, 5, 3, 6, 7};
  for (int x : v | std::views::adjacent_transform<2>(
                     [](auto x, auto y) { return y - x; })) {
    std::cout << x << std::endl;
  }
}
```
* std::views::adjacent_transform[color ff0000]

### 出力
```
-7
3
-2
3
1
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 20 [mark noimpl]
- [GCC](/implementation.md#gcc): 15 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 14 [mark noimpl]

## 関連項目
- [`std::adjacent_difference`](/reference/numeric/adjacent_difference.md)
    - 隣接する2つの要素間の差を計算するアルゴリズム関数


## 参照
- [N4950 26 Ranges library](https://timsong-cpp.github.io/cppwp/n4950/ranges)
- [P2321R2 zip](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2321r2.html)
