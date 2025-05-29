# empty_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class T>
    requires is_object_v<T>
  class empty_view : public view_interface<empty_view<T>> { …… }; // (1)

  namespace views {
    template<class T>
    inline constexpr empty_view<T> empty{}; // (2)
  }
}
```
* is_object_v[link /reference/type_traits/is_object.md]
* view_interface[link view_interface.md]

## 概要
`empty_view`は、空のRangeを表す[`view`](view.md)。

`empty_view`のオブジェクトは(2)の変数テンプレート`views::empty`で取得できる。

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
| ○       | ○    | ○     | ○    | ○      | ○            | ○            | ○         | ○     | ○       | ○   |

## テンプレートパラメータ制約
[`is_object_v`](/reference/type_traits/is_object.md)`<T>`

## 静的メンバ関数

| 名前                           | 説明                             | 対応バージョン |
|--------------------------------|----------------------------------|----------------|
| [`begin`](empty_view/begin.md) | 先頭を指すイテレータを取得する   | C++20          |
| [`end`](empty_view/end.md)     | 番兵を取得する                   | C++20          |
| [`data`](empty_view/data.md)   | 配列の先頭へのポインタを取得する | C++20          |
| [`size`](empty_view/size.md)   | 要素数を取得する                 | C++20          |
| [`empty`](empty_view/empty.md) | Rangeが空かどうかを判定する      | C++20          |

## 継承しているメンバ関数

| 名前                                         | 説明                             | 対応バージョン |
|----------------------------------------------|----------------------------------|----------------|
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する       | C++20          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する       | C++20          |
| [`operator[]`](view_interface/op_at.md)      | 要素へアクセスする               | C++20          |

## カスタマイゼーション

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`enable_borrowed_range`](empty_view/enable_borrowed_range.md.nolink) | `enable_borrowed_range`の特殊化 (variable template) | C++20          |

## 例
```cpp example
#include <ranges>
#include <iostream>

int main() {
  using namespace std;

  static_assert(ranges::empty(views::empty<int>));

  for(int n : views::empty<int>) {
    cout << n;
  }
}
```
* views::empty[color ff0000]
* ranges::empty[link /reference/ranges/empty.md]

### 出力
```
```

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
