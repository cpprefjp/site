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
* view[link view.md]
* view_interface[link view_interface.md]
* input_range[link input_range.md]

## 概要

- (1): 要素をrvalueにする[`view`](view.md)
- (2): `as_rvalue_view`または同じ効果を実現する[`view`](view.md)を生成するRangeアダプタオブジェクト

この[`view`](view.md)は、あるRangeの要素をムーブして別のコンテナに挿入する場合などに利用できる。

```cpp
vector<string> words = {"the", "quick", "brown", "fox", "ate", "a", "pterodactyl"};
vector<string> new_words;
ranges::copy(words | views::as_rvalue, back_inserter(new_words));
```

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
    - 要素がすでに右辺値参照であれば([`same_as`](/reference/concepts/same_as.md)`<`[`range_rvalue_reference_t`](range_rvalue_reference_t.md)`<T>, `[`range_reference_t`](range_reference_t.md)`<T>>`)、[`views::all`](all.md)`(E)`と等しい
    - それ以外のとき、`as_rvalue_view{E}`と等しい

## メンバ関数

| 名前                                             | 説明                              | 対応バージョン |
|--------------------------------------------------|-----------------------------------|----------------|
| [`(constructor)`](as_rvalue_view/op_constructor.md.nolink)  | コンストラクタ                    | C++20          |
| [`base`](as_rvalue_view/base.md.nolink)                     | `R`の参照を取得する               | C++20          |
| [`begin`](as_rvalue_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する    | C++20          |
| [`end`](as_rvalue_view/end.md.nolink)                       | 番兵を取得する                    | C++20          |
| [`size`](as_rvalue_view/size.md.nolink)                     | 要素数を取得する                  | C++20          |

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
| [`(deduction_guide)`](as_rvalue_view/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++20          |

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iterator>
#include <print>

int main() {
  using namespace std;

  vector<string> words = {"the", "quick", "brown", "fox", "ate", "a", "pterodactyl"};
  vector<string> new_words;
  ranges::copy(words | views::as_rvalue, back_inserter(new_words));
  print("{}", new_words);
}
```
* views::as_rvalue[color ff0000]
* print[link /reference/print/print.md]

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
* view[link view.md]
* view_interface[link view_interface.md]
* common_range[link common_range.md]
* sized_range[link sized_range.md]
* simple-view[link simple-view.md]
* default_initializable[link /reference/concepts/default_initializable.md]
* copy_constructible[link /reference/concepts/copy_constructible.md]
* move_iterator[link /reference/iterator/move_iterator.md]
* ranges::begin[link begin.md]
* ranges::end[link end.md]
* ranges::size[link size.md]
* views::all_t[link all.md]

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 参照
- [N4950 24 Ranges library](https://timsong-cpp.github.io/cppwp/ranges)
