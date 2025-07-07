# as_rvalue_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<view V>
    requires (input_range<V>)
  class as_rvalue_view : public view_interface<as_rvalue_view<V>> { …… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ as_rvalue = /*unspecified*/;      // (2)
  }
}
```

## 概要

- (1): 要素をrvalueにする[`view`](view.md)
- (2): `as_rvalue_view`または同じ効果を実現する[`view`](view.md)を生成するRangeアダプタオブジェクト

この[`view`](view.md)は、あるRangeの要素をムーブして別のコンテナに挿入する場合などに利用できる。

```cpp
std::vector<std::string> words = {"the", "quick", "brown", "fox", "ate", "a", "pterodactyl"};
std::vector<std::string> new_words;
std::ranges::copy(words | views::as_rvalue, std::back_inserter(new_words));
```
* std::ranges::copy[link /reference/algorithm/ranges_copy.md]

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
| ※       | ※    | ※     | ※    | ※      | ※            | ※            | ※         | ※     | ○       | ○   |

※ 参照先のRangeに従う

## テンプレートパラメータ制約

- [`view`](view.md)`<V>`
- `!`[`common_range`](common_range.md)`<V>`
- [`copyable`](/reference/concepts/copyable.md)`<`[`iterator_t`](iterator_t.md)`<V>>`

## 効果

- (2): 式`views::as_rvalue(E)`はRangeアダプタオブジェクトを表し、その効果は次の通り
    - 要素がすでに右辺値参照であれば(`T = decltype((E))`として、[`same_as`](/reference/concepts/same_as.md)`<`[`range_rvalue_reference_t`](range_rvalue_reference_t.md)`<T>, `[`range_reference_t`](range_reference_t.md)`<T>>`)、[`views::all`](all.md)`(E)`と等しい
    - それ以外のとき、`as_rvalue_view{E}`と等しい

## メンバ関数

| 名前                                                | 説明                           | 対応バージョン |
|-----------------------------------------------------|--------------------------------|----------------|
| [`(constructor)`](as_rvalue_view/op_constructor.md) | コンストラクタ                 | C++23          |
| [`base`](as_rvalue_view/base.md)                    | 元となるRangeを取得する        | C++23          |
| [`begin`](as_rvalue_view/begin.md)                  | 先頭を指すイテレータを取得する | C++23          |
| [`end`](as_rvalue_view/end.md)                      | 番兵を取得する                 | C++23          |
| [`size`](as_rvalue_view/size.md)                    | 要素数を取得する               | C++23          |

`r`を参照先のRangeとする。`size`は、[`ranges::size`](size.md)`(r)`が有効な式であるときに定義される。

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|-----------------------------------|----------------|
| [`empty`](view_interface/empty.md)           | Rangeが空かどうかを判定する       | C++20          |
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++20          |
| [`data`](view_interface/data.md)             | Rangeの先頭へのポインタを取得する | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する        | C++20          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する        | C++20          |
| [`operator[]`](view_interface/op_at.md)      | 要素へアクセスする                | C++20          |
| [`cbegin`](view_interface/cbegin.md)         | 定数イテレータを取得する          | C++23          |
| [`cend`](view_interface/cend.md)             | 定数イテレータ（番兵）を取得する  | C++23          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](as_rvalue_view/op_deduction_guide.md) | クラステンプレートの推論補助 | C++23          |

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iterator>
#include <algorithm>
#include <print>

int main() {
  std::vector<std::string> words = {"the", "quick", "brown", "fox", "ate", "a", "pterodactyl"};
  std::vector<std::string> new_words;
  std::ranges::copy(words | std::views::as_rvalue, std::back_inserter(new_words));
  std::println("{}", new_words);
}
```
* std::views::as_rvalue[color ff0000]

### 出力
```
["the", "quick", "brown", "fox", "ate", "a", "pterodactyl"]
```

## 実装例
```cpp
namespace std::ranges {
  template<view V>
    requires input_range<V>
  class as_rvalue_view : public view_interface<as_rvalue_view<V>> {
    V base_ = V();      // exposition only

  public:
    as_rvalue_view() requires default_initializable<V> = default;
    constexpr explicit as_rvalue_view(V base);

    constexpr V base() const & requires copy_constructible<V> { return base_; }
    constexpr V base() && { return std::move(base_); }

    constexpr auto begin() requires (!simple-view<V>) {
      return move_iterator(ranges::begin(base_));
    }

    constexpr auto begin() const requires range<const V> {
      return move_iterator(ranges::begin(base_));
    }

    constexpr auto end() requires (!simple-view<V>) {
      if constexpr (common_range<V>) {
        return move_iterator(ranges::end(base_));
      } else {
        return move_sentinel(ranges::end(base_));
      }
    }

    constexpr auto end() const requires range<const V> {
      if constexpr (common_range<const V>) {
        return move_iterator(ranges::end(base_));
      } else {
        return move_sentinel(ranges::end(base_));
      }
    }

    constexpr auto size() requires sized_range<V> { return ranges::size(base_); }
    constexpr auto size() const requires sized_range<const V> { return ranges::size(base_); }
  };

  template<class R>
    as_rvalue_view(R&&) -> as_rvalue_view<views::all_t<R>>;
}

constexpr explicit as_rvalue_view(V base);
```
* simple-view[link simple-view.md]
* move_iterator[link /reference/iterator/move_iterator.md]
* views::all_t[link all.md]

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 4 [mark verified]

## 参照
- [P2446R2 `views::as_rvalue`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2446r2.html)
