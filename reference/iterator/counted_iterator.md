# counted_iterator
* iterator[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<input_or_output_iterator I>
  class counted_iterator {

  private:
    I current = I();                  // 説明専用メンバ変数
    iter_difference_t<I> length = 0;  // 説明専用メンバ変数
  };


  // iterator_traitsにアダプトする
  template<input_iterator I>
    requires same_as<ITER_TRAITS(I), iterator_traits<I>>
  struct iterator_traits<counted_iterator<I>> : iterator_traits<I> {
    using pointer = conditional_t<contiguous_iterator<I>, add_pointer_t<iter_reference_t<I>>, void>;
  };
}
```
* input_or_output_iterator[link /reference/iterator/input_or_output_iterator.md]
* input_iterator[link /reference/iterator/input_iterator.md]
* same_as[link /reference/concepts/same_as.md]
* ITER_TRAITS[link /reference/iterator/input_iterator.md#iter_concept]
* iterator_traits[link /reference/iterator/iterator_traits.md]
* conditional_t[link /reference/type_traits/conditional.md]
* contiguous_iterator[link /reference/iterator/contiguous_iterator.md]
* add_pointer_t[link /reference/type_traits/add_pointer.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]

## 概要
`counted_iterator`は、イテレータをラップしてそこから指定されたカウント数の範囲を表現するイテレータアダプタである。

イテレータを受け取る汎用アルゴリズムにおいて、終了位置を事前に知ることなくある位置から任意の個数の要素の範囲を表現し、操作するのに利用できる。

`counted_iterator`は指定されたカウント数の範囲内でのみ進行可能である事を除けば、元のイテレータと同じ動作をする。

## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| [`(constructor)`](counted_iterator/op_constructor.md) | コンストラクタ | C++20 |
| [`operator=`](counted_iterator/op_assign.md)          | 代入演算子 | C++20 |
| [`base`](counted_iterator/base.md)          | 元のイテレータを取得する | C++20 |
| [`count`](counted_iterator/count.md)          | 代入演算子 | C++20 |
| [`operator*`](counted_iterator/op_deref.md)           | 間接参照演算子 | C++20 |
| [`operator->`](counted_iterator/op_arrow.md)          | メンバアクセス演算子 | C++20 |
| [`operator++`](counted_iterator/op_increment.md)      | イテレータをインクリメントする | C++20 |
| [`operator--`](counted_iterator/op_decrement.md)      | イテレータをデクリメントする | C++20 |
| [`operator+`](counted_iterator/op_plus.md)      | イテレータを進める | C++20 |
| [`operator+=`](counted_iterator/op_plus_assign.md)    | イテレータ自身を進める | C++20 |
| [`operator-`](counted_iterator/op_unary_minus.md)     | イテレータを逆に進める | C++20 |
| [`operator-=`](counted_iterator/op_minus_assign.md)   | イテレータ自身を逆に進める | C++20 |
| [`operator[]`](counted_iterator/op_at.md)             | 任意の位置にランダムアクセスする | C++20 |

## 非メンバ（*Hidden friends*）関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| [`operator-`](counted_iterator/op_minus.md)          | 2つの`counted_iterator`の差を求める | C++20 |
| [`operator+`](counted_iterator/op_plus.md)           | イテレータを進める | C++20 |
| [`operator==`](counted_iterator/op_equal.md)         | 等値比較 | C++20 |
| `operator!=`     | 非等値比較 ([`==`](counted_iterator/op_equal.md)により使用可能) | C++20 |
| [`operator<=>`](counted_iterator/op_compare_3way.md)          | 三方比較 | C++20 |
| `operator<`           | 左辺が右辺より小さいかの判定を行う ([`<=>`](counted_iterator/op_compare_3way.md)により使用可能) | C++20 |
| `operator<=`    | 左辺が右辺以下かの判定を行う ([`<=>`](counted_iterator/op_compare_3way.md)により使用可能) | C++20 |
| `operator>`        | 左辺が右辺より大きいかの判定を行う ([`<=>`](counted_iterator/op_compare_3way.md)により使用可能) | C++20 |
| `operator>=` | 左辺が右辺以上かの判定を行う ([`<=>`](counted_iterator/op_compare_3way.md)により使用可能) | C++20 |
| [`iter_move`](counted_iterator/iter_move.md)     | イテレータの要素の移動 | C++20 |
| [`iter_swap`](counted_iterator/iter_swap.md)     | イテレータの要素の交換 | C++20 |

## メンバ型

| 名前 | 説明 | 対応バージョン |
|---------------------|-----|-------|
| `iterator_type`     | `I` | C++20 |
| `value_type`        | [`iter_value_t`](/reference/iterator/iter_value_t.md)`<I>`※1 | C++20 |
| `difference_type`   | [`iter_difference_t`](/reference/iterator/iter_difference_t.md)`<I>` | C++20 |
| `iterator_concept`  | `typename I::iterator_concept`※2 | C++20 |
| `iterator_category` | `typename I::iterator_category`※2 | C++20 |

- ※1 `I`が[`indirectly_readable`](/reference/iterator/indirectly_readable.md)のモデルである場合にのみ定義される
- ※2 どちらも、対応するメンバ型が定義されている場合にのみ定義される

## 例

```cpp example
#include <iostream>
#include <iterator>
#include <ranges>
#include <vector>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

  std::counted_iterator ci{std::ranges::begin(vec) + 3, 5};

  // 既存のシーケンスの部分範囲をイテレートする
  for (; ci != std::default_sentinel; ++ci) {
    std::cout << *ci << " ";
  }

  std::cout << '\n';

  // subrangeと共に用いて範囲forでイテレートする
  for (auto n : std::ranges::subrange{std::counted_iterator{std::ranges::begin(vec), 5}, std::default_sentinel}) {
    std::cout << n << " ";
  }
}
```
* std::counted_iterator[color ff0000]
* ranges::begin[link /reference/ranges/begin.md]
* default_sentinel[link /reference/iterator/default_sentinel_t.md]
* ranges::subrange[link /reference/ranges/subrange.md]

### 出力

```
4 5 6 7 8 
1 2 3 4 5 
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 8 [mark verified]

## 関連項目

- [`views::counted`](/reference/ranges/counted.md)
- [`take_view`](/reference/ranges/take_view.md)

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [Hidden Friends - yohhoyの日記](https://yohhoy.hatenadiary.jp/entry/20190531/p1)
- [P2259R1 Repairing input range adaptors and `counted_iterator`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2259r1.html)
