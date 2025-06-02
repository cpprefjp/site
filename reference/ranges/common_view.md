# common_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<view V>
    requires (!common_range<V> && copyable<iterator_t<V>>)
  class common_view : public view_interface<common_view<V>> { …… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ common = /*unspecified*/;      // (2)
  }
}
```
* view[link view.md]
* view_interface[link view_interface.md]
* common_range[link common_range.md]
* copyable[link /reference/concepts/copyable.md]
* iterator_t[link iterator_t.md]

## 概要
- (1): 任意のRangeを[`common_range`](common_range.md)にする[`view`](view.md)
- (2): `common_view`または同じ効果を実現する[`view`](view.md)を生成するRangeアダプタオブジェクト

イテレータと番兵の型が同じである必要があるレガシーなアルゴリズム関数に対して、イテレータと番兵が異なるRangeを渡したい場合 (たとえば[`iota_view`](iota_view.md))、このビューで[`common_range`](common_range.md)に変換することで、同じ型のイテレータペアを取得できるようになる。


### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
| ※       | ※    | ※     | ※    | ※      | ※            | ※            | ※         | ○     | ○       | ○   |

※ 参照先のRangeに従う

## テンプレートパラメータ制約

- [`view`](view.md)`<V>`
- `!`[`common_range`](common_range.md)`<V>`
- [`copyable`](/reference/concepts/copyable.md)`<`[`iterator_t`](iterator_t.md)`<V>>`

## 効果

- (2): 式`views::common(E)`の効果は次の通り
    - [`decltype`](/lang/cpp11/decltype.md)`((E))`が[`common_range`](common_range.md)のモデルであり、[`views::all`](all.md)`(E)`が有効な式であれば、[`views::all`](all.md)`(E)`と等しい
    - それ以外のとき、`common_view{E}`と等しい

## メンバ関数

| 名前                                             | 説明                              | 対応バージョン |
|--------------------------------------------------|-----------------------------------|----------------|
| [`(constructor)`](common_view/op_constructor.md.nolink)  | コンストラクタ                    | C++20          |
| [`base`](common_view/base.md.nolink)                     | `R`の参照を取得する               | C++20          |
| [`begin`](common_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する    | C++20          |
| [`end`](common_view/end.md.nolink)                       | 番兵を取得する                    | C++20          |
| [`size`](common_view/size.md.nolink)                     | 要素数を取得する                  | C++20          |

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
| [`cbegin`](view_interface/cbegin.md)         | 定数イテレータを取得する             | C++23          |
| [`cend`](view_interface/cend.md)             | 定数イテレータ（番兵）を取得する      | C++23          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](common_view/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++20          |

## 例
```cpp example
#include <ranges>
#include <concepts>
#include <string_view>

int main() {
  using namespace std;

  // 無限長のiotaはcommon_rangeではない
  static_assert(!ranges::common_range<decltype(views::iota(0))>);
  // commonを適用するとcommon_rangeになる
  static_assert(ranges::common_range<decltype(views::iota(0) | views::common)>);

  // 元からcommon_rangeなviewに適用しても型は変わらない
  static_assert(same_as<decltype(string_view{} | views::common), string_view>);
}
```
* views::common[color ff0000]
* views::iota[link iota_view.md]

### 出力
```
```

## 実装例
```cpp
namespace std::ranges {
  template<view V>
    requires (!common_range<V> && copyable<iterator_t<V>>)
  class common_view : public view_interface<common_view<V>> {
  private:
    V base_ = V();
  public:
    common_view() requires default_initializable<V> = default;

    constexpr explicit common_view(V r) : base_(std::move(r)) {}

    constexpr V base() const & requires copy_constructible<V> { return base_; }
    constexpr V base() && { return std::move(base_); }

    constexpr auto begin() {
      if constexpr (random_access_range<V> && sized_range<V>)
        return ranges::begin(base_);
      else
        return common_iterator<iterator_t<V>, sentinel_t<V>>(ranges::begin(base_));
    }

    constexpr auto begin() const requires range<const V> {
      if constexpr (random_access_range<const V> && sized_range<const V>)
        return ranges::begin(base_);
      else
        return common_iterator<iterator_t<const V>, sentinel_t<const V>>(ranges::begin(base_));
    }

    constexpr auto end() {
      if constexpr (random_access_range<V> && sized_range<V>)
        return ranges::begin(base_) + ranges::size(base_);
      else
        return common_iterator<iterator_t<V>, sentinel_t<V>>(ranges::end(base_));
    }

    constexpr auto end() const requires range<const V> {
      if constexpr (random_access_range<const V> && sized_range<const V>)
        return ranges::begin(base_) + ranges::size(base_);
      else
        return common_iterator<iterator_t<const V>, sentinel_t<const V>>(ranges::end(base_));
    }

    constexpr auto size() requires sized_range<V> {
      return ranges::size(base_);
    }
    constexpr auto size() const requires sized_range<const V> {
      return ranges::size(base_);
    }
  };

  template<class R>
  common_view(R&&) -> common_view<views::all_t<R>>;
}
```
* view[link view.md]
* view_interface[link view_interface.md]
* common_range[link common_range.md]
* random_access_range[link random_access_range.md]
* sized_range[link sized_range.md]
* copyable[link /reference/concepts/copyable.md]
* default_initializable[link /reference/concepts/default_initializable.md]
* copy_constructible[link /reference/concepts/copy_constructible.md]
* common_iterator[link /reference/iterator/common_iterator.md]
* iterator_t[link iterator_t.md]
* sentinel_t[link sentinel_t.md]
* ranges::begin[link begin.md]
* ranges::end[link end.md]
* ranges::size[link size.md]
* views::all_t[link all.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 関連項目

- [C++17 範囲 for ループの制限緩和](/lang/cpp17/generalizing_the_range-based_for_loop.md)  
  範囲for文は、C++17の時点で先行して[`common_range`](common_range.md)ではない範囲を扱えるようになっている。

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [P2017R1 Conditionally borrowed ranges](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2017r1.html)
