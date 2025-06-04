# owning_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<range R>
    requires movable<R> && (!is-initializer-list<R>)
  class owning_view : public view_interface<owning_view<R>> { …… };
}
```
* range[link range.md]
* movable[link /reference/concepts/movable.md]
* is-initializer-list[italic]
* view_interface[link view_interface.md]

## 概要
Rangeの右辺値をムーブして所有する[`view`](view.md)。このクラスのオブジェクトは、Rangeアダプタ[`all`](all.md)によって生成される。

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          | ※    | ※     | ※    | ※      | ※            | ※            | ※         | ※     | ○       | ○   |

※ 参照先のRangeに従う

## メンバ関数

| 名前                                              | 説明                              | 対応バージョン |
|---------------------------------------------------|-----------------------------------|----------------|
| [`(constructor)`](owning_view/op_constructor.md)  | コンストラクタ                    | C++20          |
| [`base`](owning_view/base.md)                     | `R`の参照を取得する               | C++20          |
| [`begin`](owning_view/begin.md)                   | 先頭を指すイテレータを取得する    | C++20          |
| [`end`](owning_view/end.md)                       | 番兵を取得する                    | C++20          |
| [`empty`](owning_view/empty.md)                   | Rangeが空かどうかを判定する       | C++20          |
| [`size`](owning_view/size.md)                     | 要素数を取得する                  | C++20          |
| [`data`](owning_view/data.md)                     | Rangeの先頭へのポインタを取得する | C++20          |

`r`を参照先のRangeとする。`empty`、`size`、`data`は、それぞれ[`ranges::empty`](empty.md)`(r)`、[`ranges::size`](size.md)`(r)`、[`ranges::data`](data.md)`(r)`が有効な式であるときに定義される。

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|-----------------------------------|----------------|
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する        | C++20          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する        | C++20          |
| [`operator[]`](view_interface/op_at.md)      | 要素へアクセスする                | C++20          |
| [`cbegin`](view_interface/cbegin.md)         | 定数イテレータを取得する          | C++23          |
| [`cend`](view_interface/cend.md)             | 定数イテレータ（番兵）を取得する  | C++23          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](owning_view/op_deduction_guide.md) | クラステンプレートの推論補助 | C++20          |

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  auto ov1 = std::views::all(std::vector<int>{1, 2, 3});
  for (int n : ov1) {
    std::cout << n;  // 123
  }

  std::cout << '\n';

  auto ov2 = std::vector<int>{1, 2, 3} | std::views::all;
  for (int n : ov2) {
    std::cout << n;  // 123
  }
}
```
* views::all[link all.md]

### 出力
```
123
123
```


## 実装例
```cpp
namespace std::ranges {
  template<range R>
    requires movable<R> && (!is-initializer-list<R>)
  class owning_view : public view_interface<owning_view<R>> {
  private:
    R r_ = R();
  public:
    owning_view() requires default_initializable<R> = default;
    constexpr owning_view(R&& t) : r_(std::move(t)) {}

    owning_view(owning_view&&) = default;
    owning_view& operator=(owning_view&&) = default;

    constexpr R& base() & noexcept { return r_; }
    constexpr const R& base() const & noexcept { return r_; }
    constexpr R&& base() && noexcept { return std::move(r_); }
    constexpr const R&& base() const && noexcept { return std::move(r_); }

    constexpr iterator_t<R> begin() { return ranges::begin(r_); }
    constexpr sentinel_t<R> end() { return ranges::end(r_); }

    constexpr auto begin() const requires range<const R> {
      return ranges::begin(r_);
    }
    constexpr auto end() const requires range<const R> {
      return ranges::end(r_);
    }

    constexpr bool empty() requires requires { ranges::empty(r_); } {
      return ranges::empty(r_);
    }
    constexpr bool empty() const requires requires { ranges::empty(r_); } {
      return ranges::empty(r_);
    }

    constexpr auto size() requires sized_range<R> {
      return ranges::size(r_);
    }
    constexpr auto size() const requires sized_range<const R> {
      return ranges::size(r_);
    }

    constexpr auto data() requires contiguous_range<R> {
      return ranges::data(r_);
    }
    constexpr auto data() const requires contiguous_range<const R> {
      return ranges::data(r_);
    }
  };
}
```
* is-initializer-list[italic]
* range[link range.md]
* default_initializable[link /reference/concepts/default_initializable.md]
* iterator_t[link iterator_t.md]
* sentinel_t[link sentinel_t.md]
* ranges::begin[link begin.md]
* ranges::end[link end.md]
* ranges::empty[link empty.md]
* ranges::size[link size.md]
* ranges::data[link data.md]
* sized_range[link sized_range.md]
* contiguous_range[link contiguous_range.md]
* view_interface[link view_interface.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4892 24 Ranges library](https://timsong-cpp.github.io/cppwp/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [［C++］ `<ranges>`のviewを見る19 - owning_view](https://zenn.dev/onihusube/articles/fd07528b68ae0c)
- [P2415R2 What is a `view`?](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2415r2.html) (本提案文書はC++20に遡って適用されている)
