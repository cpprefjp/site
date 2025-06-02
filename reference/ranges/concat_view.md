# concat_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::ranges {
  template<input_range... Views>
  requires (view<Views> && ...) && (sizeof...(Views) > 0) && concatable<Views...>
  class concat_view : public view_interface<concat_view<Views...>> {…… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ concat = /*unspecified*/;      // (2)
  }
}
```

## 概要

`concat_view`は複数のRangeを連結し、1つのRangeとする[`view`](view.md)。

- (1): `concat_view`のクラス定義
- (2): `concat_view`を生成するカスタマイゼーションポイントオブジェクト(Rangeアダプタオブジェクトではない)

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          | (1)   | 〇     | 〇    | (2)     | (3)           | (4)           |            | (5)    | ○       | ○   |

- (1): 連結するすべてのRangeが[`sized_range`](sized_range.md)のとき
- (2): 連結するすべてのRangeが[`forward_range`](forward_range.md)のとき
- (3): 連結するすべてのRangeが[`bidirectional_range`](bidirectional_range.md)であり、少なくとも最後のRange以外が[`common_range`](common_range.md)のとき
- (4): 連結するすべてのRangeが[`random_access_range`](random_access_range.md)であり、少なくとも最後のRange以外が[`common_range`](common_range.md)のとき
- (5): 最後のRangeが[`common_range`](common_range.md)のとき

## テンプレートパラメータ制約

連結するすべてのビューに対して、

- それらの要素に共通の値型`Cv`、参照型`Cr`、右辺値参照型`Crr` が存在し、
- `Cr&&`と`Cv&`、`Cr&&`と`Crr&&`、`Crr&&`と`Cv const&`にそれぞれ共通の参照型があり、
- 連結するすべてのビューのイテレーター`it`について、
    - `*it`が`Cr`に変換可能であり、
    - `ranges::iter_move(it)`が`Crr`に変換可能であること。

## 効果

- (2): 式`views::concat(Es...)`の効果は次の通り
    - `Es...`が1要素で、その型が [`input_range`](input_range.md)のモデルであるとき、[`views::all`](all.md)`(Es...)` と等しい
    - それ以外のとき、`concat_view(Es...)` と等しい

## 備考

本説明に用いる説明専用要素を以下のように定義する。

```cpp
namespace std::ranges {
  template<class... Rs>
  using concat-reference-t = common_reference_t<range_reference_t<Rs>...>;

  template<class... Rs>
  using concat-value-t = common_type_t<range_value_t<Rs>...>;

  template<class... Rs>
  using concat-rvalue-reference-t = common_reference_t<range_rvalue_reference_t<Rs>...>;

  template<class Ref, class RRef, class It>
  concept concat-indirectly-readable-impl =
    requires (const It it) {
      { *it } -> convertible_to<Ref>;
      { ranges::iter_move(it) } -> convertible_to<RRef>;
    };

  template<class... Rs>
  concept concat-indirectly-readable =
    common_reference_with<concat-reference-t<Rs...>&&, concat-value-t<Rs...>&> &&
    common_reference_with<concat-reference-t<Rs...>&&, concat-rvalue-reference-t<Rs...>&&> &&
    common_reference_with<concat-rvalue-reference-t<Rs...>&&, concat-value-t<Rs...> const&> &&
    (concat-indirectly-readable-impl<concat-reference-t<Rs...>, concat-rvalue-reference-t<Rs...>, iterator_t<Rs>> && ...);

  template<class... Rs>
  concept concatable = requires {
    typename concat-reference-t<Rs...>;
    typename concat-value-t<Rs...>;
    typename concat-rvalue-reference-t<Rs...>;
  } && concat-indirectly-readable<Rs...>;

  // Fs を Rs の末尾を除いたパックとする

  template<bool Const, class... Rs>
  concept concat-is-random-access =
    all-random-access<Const, Rs...> &&
    (common_range<maybe-const<Const, Fs>> && ...);

  template<bool Const, class... Rs>
  concept concat-is-bidirectional =
    all-bidirectional<Const, Rs...> &&
    (common_range<maybe-const<Const, Fs>> && ...);
}
```
* all-random-access[link all-random-access.md]
* all-bidirectional[link all-bidirectional.md]


## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](concat_view/op_constructor.md)  | コンストラクタ                   | C++26          |
| [`begin`](concat_view/begin.md)                   | 先頭を指すイテレータを取得する   | C++26          |
| [`end`](concat_view/end.md)                       | 番兵を取得する                   | C++26          |
| [`size`](concat_view/size.md)                     | 要素数を取得する                 | C++26          |

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|-----------------------------------|----------------|
| [`empty`](view_interface/empty.md)           | Rangeが空かどうかを判定する       | C++26          |
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++26          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する        | C++26          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する        | C++26          |
| [`cbegin`](view_interface/cbegin.md)         | 定数イテレータを取得する          | C++26          |
| [`cend`](view_interface/cend.md)             | 定数イテレータ（番兵）を取得する  | C++26          |
| [`operator[]`](view_interface/op_at.md)      | 要素へアクセスする                | C++26          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](concat_view/op_deduction_guide.md) | クラステンプレートの推論補助 | C++26          |

## 例
```cpp example
import std;

int main() {
  std::vector<int> v1{1, 2, 3}, v2{4, 5}, v3{};
  std::array a{6, 7, 8};
  auto s = std::views::single(9);
  std::print("{} ", std::views::concat(v1, v2, v3, a, s));
}
```
* std::views::concat[color ff0000]
* std::views::single[link single_view.md]

### 出力
```
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 20 [mark noimpl]
- [GCC](/implementation.md#gcc): 15 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 14 [mark noimpl]

## 参照
- [26.7.18 Concat view](https://timsong-cpp.github.io/cppwp/range.concat) (2024-08-10)
- [P2542R8 views::concat](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2542r8.html)
