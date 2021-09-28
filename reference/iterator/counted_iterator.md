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


  // incrementable_traitsにアダプトする
  template<class I>
  struct incrementable_traits<counted_iterator<I>> {
    using difference_type = iter_difference_t<I>;
  };

  // iterator_traitsにアダプトする
  template<input_iterator I>
  struct iterator_traits<counted_iterator<I>> : iterator_traits<I> {
    using pointer = void;
  };
}
```
* input_or_output_iterator[link /reference/iterator/input_or_output_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* incrementable_traits[link /reference/iterator/incrementable_traits.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]
* input_iterator[link /reference/iterator/input_iterator.md]
* iterator_traits[link /reference/iterator/iterator_traits.md]

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
| [`operator++`](counted_iterator/op_increment.md)      | イテレータをインクリメントする | C++20 |
| [`operator--`](counted_iterator/op_decrement.md)      | イテレータをインクリメントする | C++20 |
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
|-----------------|-----|-------|
| `iterator_type` | `I` | C++20 |


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
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 8

## 関連項目

- [`views::counted`](/reference/ranges/counted.md)
- [`take_view`](/reference/ranges/take_view.md)

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [Hidden Friends - yohhoyの日記](https://yohhoy.hatenadiary.jp/entry/20190531/p1)
