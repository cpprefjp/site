# zip_transform_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<move_constructible F, input_range... Views>
    requires (view<Views> && ...) && (sizeof...(Views) > 0) && is_object_v<F> &&
              regular_invocable<F&, range_reference_t<Views>...> &&
              can-reference<invoke_result_t<F&, range_reference_t<Views>...>>
  class zip_transform_view : public view_interface<zip_transform_view<F, Views...>> { …… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ zip_transform = /*unspecified*/;      // (2)
  }
}
```
* can-reference[link /reference/iterator/dereferenceable.md]

## 概要

`zip_transform_view`は複数のRangeから要素を1つずつ取得し、それらを引数として関数を呼び出した結果を要素とする[`view`](view.md)。

`zip_transform_view`の要素を1つ取得するごとに、各Rangeの要素を1つずつ取得する。

zipするRangeのサイズが異なっている場合、`zip_transform_view`のサイズはそれらの中で最小のサイズとなる。

- (1): `zip_transform_view`のクラス定義
- (2): `zip_transform_view`を生成するカスタマイゼーションポイントオブジェクト(Rangeアダプタオブジェクトではない)


### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          | (1)   | 〇     | 〇    | (1)     | (1)           | (1)           |            | (1)    | ○       | ○   |

- (1): [`zip_view`](zip_view.md)`<Views...>`に従う

## 効果

- (2): `F`を部分式、`Es...`を部分式のパックとする。式 `views::zip_transform(F, Es...)` の効果は以下の通り。
    - `Es` が空でないとき、`zip_transform_view(F, Es...)` と等しい
    - `Es` が空のとき、 `FD` を [`decay_t`](/reference/type_traits/decay.md)`<decltype((F))>`として、`((void)F, auto(`[`views::empty`](empty_view.md)`<`[`decay_t`](/reference/type_traits/decay.md)`<`[`invoke_result_t`](/reference/type_traits/invoke_result.md)`<FD&>>>))` と等しい
        - ただし、 [`move_constructible`](/reference/concepts/move_constructible.md)`<FD> && `[`regular_invocable`](/reference/concepts/invocable.md)`<FD&>` が `false`、または [`decay_t`](/reference/type_traits/decay.md)`<`[`invoke_result_t`](/reference/type_traits/invoke_result.md)`<FD&>>` がオブジェクト型でないとき、ill-formed


## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](zip_transform_view/op_constructor.md) | コンストラクタ                   | C++23          |
| [`begin`](zip_transform_view/begin.md)                  | 先頭を指すイテレータを取得する   | C++23          |
| [`end`](zip_transform_view/end.md)                      | 番兵を取得する                   | C++23          |
| [`size`](zip_transform_view/size.md)                    | 要素数を取得する                 | C++23          |

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
| [`(deduction_guide)`](zip_transform_view/op_deduction_guide.md) | クラステンプレートの推論補助 | C++23          |

## 例
```cpp example
#include <ranges>
#include <vector>
#include <print>

int main() {
  std::vector d = {1, 2, 3};
  std::vector p = {1, 10, 100, 1000};

  std::println("{}", std::views::zip_transform([](auto x, auto y){ return x * y; }, d, p));
  std::println("{}", std::views::zip_transform([](auto x, auto y){ return std::pair{x, y}; }, d, p));
}
```
* std::views::zip_transform[color ff0000]

### 出力
```
[1, 20, 300]
[(1, 1), (2, 10), (3, 100)]
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 19 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]

## 関連項目
- [`transform_view`](transform_view.md) zipする範囲が1つの場合
- [`transform`](/reference/algorithm/ranges_transform.md) 2つのRangeから要素を1つずつ取り出して関数を呼び出し、結果を出力するアルゴリズム関数

## 参照
- [N4950 26 Ranges library](https://timsong-cpp.github.io/cppwp/n4950/ranges)
- [P2321R2 zip](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2321r2.html)
