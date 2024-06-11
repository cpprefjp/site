# lazy_split_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {

  template<input_range V, forward_range Pattern>
    requires view<V> && view<Pattern> &&
             indirectly_comparable<iterator_t<V>, iterator_t<Pattern>, ranges::equal_to> &&
             (forward_range<V> || tiny-range<Pattern>)
  class lazy_split_view : public view_interface<lazy_split_view<V, Pattern>> { …… };   // (1)

  namespace views {
    inline constexpr /*unspecified*/ lazy_split = /*unspecified*/;                     // (2)
  }
}
```
* input_range[link input_range.md]
* forward_range[link forward_range.md]
* view[link view.md]
* iterator_t[link iterator_t.md]
* indirectly_comparable[link /reference/iterator/indirectly_comparable.md]
* ranges::equal_to[link /reference/functional/equal_to.md]
* tiny-range[italic]

## 概要

- (1): [`input_range`](input_range.md)を要素、または要素の[`view`](view.md)からなるパターンをデリミタとして分割し、それぞれの部分Rangeを要素とする新たなRangeとして扱う[`view`](view.md)
- (2): `lazy_split_view`を生成するRangeアダプタオブジェクト

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          |       |        | ○    | (1)     |               |               |            | (2)    | ○       | ○   |

- (1): `V`が[`forward_range`](forward_range.md)のとき
- (2): `V`が[`forward_range`](forward_range.md)かつ[`common_range`](common_range.md)のとき

### Rangeコンセプト (各部分Range)

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          |       |        | ○    | (1)     |               |               |            |        | ○       | ○   |

- (1): `V`が[`forward_range`](forward_range.md)のとき

## テンプレートパラメータ制約

説明専用コンセプト`tiny-range`を次のように定義する。

```cpp
template<auto> struct require-constant;

template<class R>
concept tiny-range = sized_range<R> &&
  requires { typename require-constant<remove_reference_t<R>::size()>; } && (remove_reference_t<R>::size() <= 1);
```
* require-constant[italic]
* tiny-range[italic]
* remove_reference_t[link /reference/type_traits/remove_reference.md]

これを用いて、

- [`view`](view.md)`<V>` かつ [`input_range`](input_range.md)`<V>`
- [`view`](view.md)`<Pattern>` かつ [`forward_range`](forward_range.md)`<Pattern>`
- `V`のイテレータと`Pattern`のイテレータが等値比較可能である
- [`forward_range`](forward_range.md)`<V>` または `tiny-range<Pattern>`

## 効果

- (2): 式`views::lazy_split(E, F)`の効果は`lazy_split_view{E, F}`と等しい。

## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](lazy_split_view/op_constructor.md.nolink)  | コンストラクタ                   | C++20          |
| [`base`](lazy_split_view/base.md.nolink)                     | `V`の参照を取得する              | C++20          |
| [`begin`](lazy_split_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する   | C++20          |
| [`end`](lazy_split_view/end.md.nolink)                       | 番兵を取得する                   | C++20          |

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|-----------------------------------|----------------|
| [`empty`](view_interface/empty.md)           | Rangeが空かどうかを判定する       | C++20          |
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する        | C++20          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する        | C++20          |
| [`cbegin`](view_interface/cbegin.md)         | 定数イテレータを取得する             | C++23          |
| [`cend`](view_interface/cend.md)             | 定数イテレータ（番兵）を取得する      | C++23          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](lazy_split_view/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++20          |

## 例

### `range`による`range`の分割

```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  using namespace std;
  std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9};
  std::vector<int> pattern = {4, 5};

  for (auto inner_range : v | views::lazy_split(pattern)) {
    for (int n : inner_range) {
      std::cout << n;
    }
    std::cout << '\n';
  }
}
```
* views::lazy_split[color ff0000]

### 出力
```
123
6789
```

### `input_range`の分割

この場合はデリミタは1要素でなければならず、`range`による分割はできない。

```cpp example
#include <ranges>
#include <vector>
#include <iostream>
#include <sstream>

int main() {
  using namespace std;
  auto iss = istringstream{"1 2 3 1 4 5 6 1 7 8 1 9 1"};

  for (auto inner_range : views::istream<int>(iss) | views::lazy_split(1)) {
    for (int n : inner_range) {
      std::cout << n;
    }
    std::cout << '\n';
  }
}
```
* views::istream[link basic_istream_view.md]
* views::lazy_split[color ff0000]

### 出力
```
23
456
78
9
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
- [P2210R2 Superior String Splitting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2210r2.html)
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
