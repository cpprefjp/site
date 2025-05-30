# ref_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<range R>
    requires is_object_v<R>
  class ref_view : public view_interface<ref_view<R>> { …… };
}
```
* range[link range.md]
* is_object_v[link /reference/type_traits/is_object.md]
* view_interface[link view_interface.md]

## 概要

Rangeへの参照として振る舞う[`view`](view.md)。このクラスのオブジェクトは、Rangeアダプタ[`all`](all.md)によって生成される。

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
| ○       | ※    | ※     | ※    | ※      | ※            | ※            | ※         | ※     | ○       | ○   |

※ 参照先のRangeに従う

## メンバ関数

| 名前                                           | 説明                              | 対応バージョン |
|------------------------------------------------|-----------------------------------|----------------|
| [`(constructor)`](ref_view/op_constructor.md)  | コンストラクタ                    | C++20          |
| [`base`](ref_view/base.md)                     | 元となるRangeへの参照を取得する   | C++20          |
| [`begin`](ref_view/begin.md)                   | 先頭を指すイテレータを取得する    | C++20          |
| [`end`](ref_view/end.md)                       | 番兵を取得する                    | C++20          |
| [`empty`](ref_view/empty.md)                   | Rangeが空かどうかを判定する       | C++20          |
| [`size`](ref_view/size.md)                     | 要素数を取得する                  | C++20          |
| [`data`](ref_view/data.md)                     | Rangeの先頭へのポインタを取得する | C++20          |

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
| [`(deduction_guide)`](ref_view/op_deduction_guide.md) | クラステンプレートの推論補助 | C++20          |

## 例
```cpp example
#include <ranges>
#include <iostream>

int main() {
  using namespace std;
  int a[] = {1, 2, 3, 4, 5};

  for (int i : a | views::all) {
    cout << i;
  }
}
```
* views::all[link all.md]

### 出力
```
12345
```

## 実装例
```cpp
namespace std::ranges {
  template<class T, class U>
  concept __different_from = !same_as<remove_cvref_t<T>, remove_cvref_t<U>>;

  void __FUN(R&);
  void __FUN(R&&) = delete;

  template<range R>
    requires is_object_v<R>
  class ref_view : public view_interface<ref_view<R>> {
  private:
    R* r_;
  public:
    template<__different_from<ref_view> T>
      requires convertible_to<T, R&> && requires { __FUN(declval<T>()); }
    constexpr ref_view(T&& t) : r_(addressof(static_cast<R&>(std::forward<T>(t)))) {}

    constexpr R& base() const { return *r_; }

    constexpr iterator_t<R> begin() const {
      return ranges::begin(*r_);
    }

    constexpr sentinel_t<R> end() const {
      return ranges::end(*r_);
    }

    constexpr bool empty() const requires requires { ranges::empty(*r_); } {
      return ranges::empty(*r_);
    }

    constexpr auto size() const requires sized_range<R> {
      return ranges::size(*r_);
    }

    constexpr auto data() const requires contiguous_range<R> {
      return ranges::data(*r_);
    }
  };

  template<class R>
  ref_view(R&) -> ref_view<R>;
}
```
* range[link range.md]
* is_object_v[link /reference/type_traits/is_object.md]
* convertible_to[link /reference/concepts/convertible_to.md]
* declval[link /reference/utility/declval.md]
* std::forward[link /reference/utility/forward.md]
* addressof[link /reference/memory/addressof.md]
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
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
