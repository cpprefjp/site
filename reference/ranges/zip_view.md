# zip_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<input_range... Views>
  requires (view<Views> && ...) && (sizeof...(Views) > 0)
  class zip_view : public view_interface<zip_view<Views...>> { …… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ zip = /*unspecified*/;      // (2)
  }
}
```

## 概要

`zip_view`は複数のRangeから要素を1つずつ取得した[`tuple`](/reference/tuple/tuple.md)を要素とする[`view`](view.md)。

`zip_view`の要素を1つ取得するごとに、各Rangeの要素を1つずつ取得する。

zipするRangeのサイズが異なっている場合、`zip_view`のサイズはそれらの中で最小のサイズとなる。

- (1): `zip_view`のクラス定義
- (2): `zip_view`を生成するカスタマイゼーションポイントオブジェクト(Rangeアダプタオブジェクトではない)

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          | (1)   | 〇     | 〇    | (2)     | (3)           | (4)           |            | (5)    | ○       | ○   |

- (1): zipするすべてのRangeが[`sized_range`](sized_range.md)のとき
- (2): zipするすべてのRangeが[`forward_range`](forward_range.md)のとき
- (3): zipするすべてのRangeが[`bidirectional_range`](bidirectional_range.md)のとき
- (4): zipするすべてのRangeが[`random_access_range`](random_access_range.md)のとき
- (5): *zip-is-common*のとき

## 効果

- (2): 式`views::zip(Es...)`の効果は次の通り
    - `Es`が空でないとき、`zip_view<`[`views::all_t`](all.md)`<decltype((Es))>...>(Es...)` と等しい
    - `Es`が空のとき、`auto(`[`views::empty`](empty_view.md)`<`[`tuple`](/reference/tuple/tuple.md)`<>>)` と等しい


## 備考

本説明に用いる説明専用要素を以下のように定義する。

```cpp
namespace std::ranges {
  // 説明専用
  template<class... Rs>
  concept zip-is-common =
    (sizeof...(Rs) == 1 && (common_range<Rs> && ...)) ||
    (!(bidirectional_range<Rs> && ...) && (common_range<Rs> && ...)) ||
    ((random_access_range<Rs> && ...) && (sized_range<Rs> && ...));
}
```

## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](zip_view/op_constructor.md)  | コンストラクタ                   | C++23          |
| [`begin`](zip_view/begin.md)                   | 先頭を指すイテレータを取得する   | C++23          |
| [`end`](zip_view/end.md)                       | 番兵を取得する                   | C++23          |
| [`size`](zip_view/size.md)                     | 要素数を取得する                 | C++23          |

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
| [`(deduction_guide)`](zip_view/op_deduction_guide.md) | クラステンプレートの推論補助 | C++23          |

## 例
```cpp example
#include <ranges>
#include <vector>
#include <list>
#include <unordered_map>
#include <print>

int main() {
  std::vector v = {1, 2};
  const std::list l = {'a', 'b', 'c'};

  std::println("{}", std::views::zip(v, l));

  for (auto&& [i, c] : std::views::zip(v, l)) {
    i *= 10; // 要素を書き換えても良い
  }
  std::println("{}", std::views::zip(v, l));

  // zipした結果を連想コンテナに変換する
  const auto m = std::views::zip(v, l) | std::ranges::to<std::unordered_map<int, char>>();
  std::println("{}", m);

  // 何もzipしていないときは空になる
  std::println("{}", std::views::zip());
}
```
* std::views::zip[color ff0000]
* std::ranges::to[link to.md]

### 出力
```
[(1, 'a'), (2, 'b')]
[(10, 'a'), (20, 'b')]
{20: 'b', 10: 'a'}
[]
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 13.2 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 5 [mark verified]

## 関連項目
- [`elements_view`](elements_view.md) zipの逆(タプルから要素を取り出す)
- [`zip_transform_view`](zip_transform_view.md) zipして関数を適用する

## 参照
- [N4950 26 Ranges library](https://timsong-cpp.github.io/cppwp/n4950/ranges)
- [P2321R2 zip](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2321r2.html)
