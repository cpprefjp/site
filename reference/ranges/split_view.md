# split_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {

  template<forward_range V, forward_range Pattern>
    requires view<V> && view<Pattern> &&
             indirectly_comparable<iterator_t<V>, iterator_t<Pattern>, ranges::equal_to>
  class split_view : public view_interface<split_view<V, Pattern>> { …… };   // (1)

  namespace views {
    inline constexpr /*unspecified*/ split = /*unspecified*/;                // (2)
  }
}
```
* forward_range[link forward_range.md]
* view[link view.md]
* iterator_t[link iterator_t.md]
* indirectly_comparable[link /reference/iterator/indirectly_comparable.md]
* ranges::equal_to[link /reference/functional/equal_to.md]


## 概要

指定した区切り文字（デリミタ）によって、入力文字範囲の分割を行うRangeアダプタ。

- (1): 入力の文字範囲を、その要素型の文字または文字列からなるパターンをデリミタとして分割し、切り出した文字列（部分Range）を要素とする新たなRangeに変換する[`view`](view.md)
- (2): `split_view`を生成するRangeアダプタオブジェクト

入力範囲`V`もデリミタ`Pattern`も共に[`forward_range`](forward_range.md)（かつ`view`）であることしか求められていないため、実際には文字列の分割に限らず、任意の`forward_range`を`forward_range`によって表現されるパターンによって分割することができる。

### Rangeコンセプト（`split_view`そのもの）

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          |       |        | ○    | ○      |               |               |            | (1)    | ○       | ○   |

- (1): `V`が[`common_range`](common_range.md)のとき

### Rangeコンセプト (`split_view`の要素である、切り出した部分文字列を示す各部分Range)

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
| ○       | ※    | ※     | ○    | ○      | ※            | ※            | ※         | ※     | ○       | ○   |

- ※: `V`に従う

## テンプレートパラメータ制約

- `V`、`Pattern`が[`view`](view.md)かつ[`forward_range`](forward_range.md)
- `V`のイテレータと`Pattern`のイテレータが等値比較可能である

## 効果

- (2): 式`views::split(E, F)`の効果は`split_view(E, F)`と等しい。

## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](split_view/op_constructor.md.nolink)  | コンストラクタ                   | C++20          |
| [`base`](split_view/base.md.nolink)                     | `V`の参照を取得する              | C++20          |
| [`begin`](split_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する   | C++20          |
| [`end`](split_view/end.md.nolink)                       | 番兵を取得する                   | C++20          |

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|-----------------------------------|----------------|
| [`empty`](view_interface/empty.md)           | Rangeが空かどうかを判定する       | C++20          |
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する        | C++20          |
| [`cbegin`](view_interface/cbegin.md)         | 定数イテレータを取得する             | C++23          |
| [`cend`](view_interface/cend.md)             | 定数イテレータ（番兵）を取得する      | C++23          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](split_view/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++20          |

## 例
```cpp example
#include <ranges>
#include <string_view>
#include <iostream>

int main() {
  using namespace std;
  using namespace std::literals;

  for (auto sv : "hello, world"sv | views::split(", "sv)) {
    std::cout << string_view{sv.begin(), sv.end()} << '\n';
  }
}
```
* views::split[color ff0000]

パターンとしてC文字列を使うとき、ヌル文字を特別扱いしないため注意。

### 出力
```
hello
world
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
- [P2367R0 Remove misuses of list-initialization from Clause 24](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2367r0.html) (本提案文書はC++20に遡って適用されている)
