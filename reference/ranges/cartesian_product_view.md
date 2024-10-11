# cartesian_product_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<input_range First, forward_range... Vs>
    requires (view<First> && ... && view<Vs>)
  class cartesian_product_view : public view_interface<cartesian_product_view<First, Vs...>> {…… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ cartesian_product = /*unspecified*/;      // (2)
  }
}
```

## 概要

`cartesian_product_view`は複数のRangeの直積をとり、その要素を[`tuple`](/reference/tuple/tuple.md)として見せる[`view`](view.md)。

この[`view`](view.md)の要素数は、すべての指定したRangeの要素数の積である。

- (1): `cartesian_product_view`のクラス定義
- (2): `cartesian_product_view`を生成するカスタマイゼーションポイントオブジェクト(Rangeアダプタオブジェクトではない)

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          | (1)   | 〇     | 〇    | 〇      | (2)           | (3)           |            | (4)    | ○       | ○   |

- (1): すべてのRangeが[`sized_range`](sized_range.md)のとき
- (2): すべてのRangeが[`bidirectional_range`](bidirectional_range.md)かつ、先頭以外のRangeが*cartesian-product-common-arg*のとき
- (3): すべてのRangeが[`random_access_range`](random_access_range.md)かつ、先頭のRangeが[`sized_range`](sized_range.md)のとき
- (4): 先頭のRangeが*cartesian-product-common-arg*のとき

## 効果

- (2): 式`views::cartesian_product(Es...)`の効果は次の通り
    - `Es`が空でないとき、`cartesian_product_view<`[`views::all_t`](all.md)`<decltype((Es))>...>(Es...)` と等しい
    - `Es`が空のとき、[`views::single`](single_view.md)`(`[`tuple`](/reference/tuple/tuple.md)`())` と等しい


## 備考

本説明に用いる説明専用要素を以下のように定義する。

```cpp
namespace std::ranges {
  template<bool Const, class First, class... Vs>
  concept cartesian-product-is-random-access =          // exposition only
    (random_access_range<maybe-const<Const, First>> && ... &&
      (random_access_range<maybe-const<Const, Vs>>
        && sized_range<maybe-const<Const, Vs>>));

  template<class R>
  concept cartesian-product-common-arg =                // exposition only
    common_range<R> || (sized_range<R> && random_access_range<R>);

  template<bool Const, class First, class... Vs>
  concept cartesian-product-is-bidirectional =          // exposition only
    (bidirectional_range<maybe-const<Const, First>> && ... &&
      (bidirectional_range<maybe-const<Const, Vs>>
        && cartesian-product-common-arg<maybe-const<Const, Vs>>));

  template<class First, class... Vs>
  concept cartesian-product-is-common =                 // exposition only
    cartesian-product-common-arg<First>;

  template<class... Vs>
  concept cartesian-product-is-sized =                  // exposition only
    (sized_range<Vs> && ...);

  template<bool Const, template<class> class FirstSent, class First, class... Vs>
    concept cartesian-is-sized-sentinel =               // exposition only
      (sized_sentinel_for<FirstSent<maybe-const<Const, First>>,
          iterator_t<maybe-const<Const, First>>> && ...
        && (sized_range<maybe-const<Const, Vs>>
          && sized_sentinel_for<iterator_t<maybe-const<Const, Vs>>,
              iterator_t<maybe-const<Const, Vs>>>));

  template<cartesian-product-common-arg R>
  constexpr auto cartesian-common-arg-end(R& r) {       // exposition only
    if constexpr (common_range<R>) {
      return ranges::end(r);
    } else {
      return ranges::begin(r) + ranges::distance(r);
    }
  }
}
```

## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](cartesian_product_view/op_constructor.md.nolink)  | コンストラクタ                   | C++23          |
| [`begin`](cartesian_product_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する   | C++23          |
| [`end`](cartesian_product_view/end.md.nolink)                       | 番兵を取得する                   | C++23          |
| [`size`](cartesian_product_view/size.md.nolink)                     | 要素数を取得する                 | C++23          |

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
| [`(deduction_guide)`](cartesian_product_view/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++23          |

## 例
```cpp example
#include <ranges>
#include <vector>
#include <list>
#include <print>

int main() {
  std::vector v = {1, 2};
  const std::list l = {'a', 'b', 'c'};

  std::println("{}", std::views::cartesian_product(v, l));

  // 空になる場合
  std::println("{}", std::views::cartesian_product());
}
```
* std::views::cartesian_product[color ff0000]

### 出力
```
[(1, 'a'), (1, 'b'), (1, 'c'), (2, 'a'), (2, 'b'), (2, 'c')]
[]
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 13.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [N4950 26 Ranges library](https://timsong-cpp.github.io/cppwp/n4950/ranges)
