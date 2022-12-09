# reverse_iterator
* iterator[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class Iterator>
  class reverse_iterator
    : public iterator<typename iterator_traits<Iterator>::iterator_category,
                      typename iterator_traits<Iterator>::value_type,
                      typename iterator_traits<Iterator>::difference_type,
                      typename iterator_traits<Iterator>::pointer,
                      typename iterator_traits<Iterator>::reference>;

  // 距離を求められないイテレータペアについて、sized_sentinel_forを無効化する（C++20）
  template<class Iterator1, class Iterator2>
    requires (!sized_sentinel_for<Iterator1, Iterator2>)
  inline constexpr bool disable_sized_sentinel_for<reverse_iterator<Iterator1>,
                                                   reverse_iterator<Iterator2>> = true;
}
```
* iterator[link /reference/iterator/iterator.md]
* iterator_traits[link /reference/iterator/iterator_traits.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* disable_sized_sentinel_for[link /reference/iterator/disable_sized_sentinel_for.md]

## 概要
`reverse_iterator`は、イテレータを、逆方向に進むイテレータとしてラップするイテレータアダプタである。

`end`イテレータを`reverse_iterator`でラップした場合、`end - 1` (つまり終端要素)を指し、`begin - 1`のイテレータを終端値としてみなす。


## 要件

- C++17まで : テンプレートパラメータ`Iterator`は、双方向イテレータの要件を満たすこと。ランダムアクセスイテレータであることを必要とする横断操作を使用する場合は、ランダムアクセスイテレータの要件を満たすこと。
- C++20 : テンプレートパラメータ`Iterator`は、[`bidirectional_iterator`](/reference/iterator/bidirectional_iterator.md)のモデルとなること。ランダムアクセスイテレータであることを必要とする横断操作を使用する場合は、[`random_access_iterator`](/reference/iterator/random_access_iterator.md)のモデルとなること。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------------|--------------------------------------------------|-------|
| [`(constructor)`](reverse_iterator/op_constructor.md) | コンストラクタ | |
| `~reverse_iterator() = default` | デストラクタ | |
| [`operator=`](reverse_iterator/op_assign.md) | 代入演算子 | |
| [`base`](reverse_iterator/base.md) | 元となったイテレータを取得する | |
| [`operator*`](reverse_iterator/op_deref.md) | 間接参照演算子 | |
| [`operator->`](reverse_iterator/op_arrow.md) | メンバアクセス演算子 | |
| [`operator++`](reverse_iterator/op_increment.md) | イテレータをインクリメントする | |
| [`operator--`](reverse_iterator/op_decrement.md) | イテレータをデクリメントする | |
| [`operator+`](reverse_iterator/op_unary_plus.md) | イテレータを進める | |
| [`operator+=`](reverse_iterator/op_plus_assign.md) | イテレータ自身を進める | |
| [`operator-`](reverse_iterator/op_unary_minus.md) | イテレータを逆に進める | |
| [`operator-=`](reverse_iterator/op_minus_assign.md) | イテレータ自身を逆に進める | |
| [`operator[]`](reverse_iterator/op_at.md) | 任意の位置にランダムアクセスする | |


## protectedメンバ変数

| 変数名    | 型         | 対応バージョン |
|-----------|------------|-------|
| `current` | `Iterator` | |


## メンバ型

### C++17まで

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------|----------------------------------------|-------|
| `iterator_type` | `Iterator` | |
| `difference_type` | [`iterator_traits`](/reference/iterator/iterator_traits.md)`<Iterator>::difference_type` | |
| `pointer` | [`iterator_traits`](/reference/iterator/iterator_traits.md)`<Iterator>::pointer` | |
| `value_type` | [`iterator_traits`](/reference/iterator/iterator_traits.md)`<Iterator>::value_type` | |
| `iterator_category` | [`iterator_traits`](/reference/iterator/iterator_traits.md)`<Iterator>::iterator_category` | |
| `reference` | [`iterator_traits`](/reference/iterator/iterator_traits.md)`<Iterator>::reference` | |

### C++20

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| `iterator_type` | `Iterator` | |
| `difference_type` | [`iter_difference_t`](/reference/iterator/iter_difference_t.md)`<Iterator>` | C++20 |
| `pointer` | `Iterator` | |
| `value_type` | [`iter_value_t`](/reference/iterator/iter_value_t.md)`<Iterator>` | C++20 |
| `iterator_category` | [`iterator_traits`](/reference/iterator/iterator_traits.md)`<Iterator>::iterator_category` <br/> ただし、[`contiguous_iterator_tag`](/reference/iterator/iterator_tag.md)となるときは`random_access_iterator_tag` | C++20 |
| `iterator_concept` | [`bidirectional_iterator_tag`](/reference/iterator/iterator_tag.md) <br/> ただし、`Iterator`が[`random_access_iterator`](/reference/iterator/random_access_iterator.md)のモデルとなるときは[`random_access_iterator_tag`](/reference/iterator/iterator_tag.md)  | C++20 |
| `reference` | [`iter_reference_t`](/reference/iterator/iter_reference_t.md)`<Iterator>`  | C++20 |

## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------|------------------------|-------|
| [`operator==`](reverse_iterator/op_equal.md) | 等値比較 | |
| [`operator!=`](reverse_iterator/op_not_equal.md) | 非等値比較 | |
| [`operator<`](reverse_iterator/op_less.md) | 左辺が右辺より小さいかの判定を行う | |
| [`operator<=`](reverse_iterator/op_less_equal.md) | 左辺が右辺以下かの判定を行う | |
| [`operator>`](reverse_iterator/op_greater.md) | 左辺が右辺より大きいかの判定を行う | |
| [`operator>=`](reverse_iterator/op_greater_equal.md) | 左辺が右辺以上かの判定を行う | |
| [`operator<=>`](reverse_iterator/op_compare_3way.md)           | 三方比較を行う | C++20 |
| [`operator-`](reverse_iterator/op_minus.md) | 2つの`reverse_iterator`の差を求める | |
| [`operator+`](reverse_iterator/op_plus.md) | イテレータを進める | |
| [`iter_move`](reverse_iterator/iter_move.md)     | イテレータの要素の移動 | C++20 |
| [`iter_swap`](reverse_iterator/iter_swap.md)     | イテレータの要素の交換 | C++20 |

### ヘルパ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`make_reverse_iterator`](make_reverse_iterator.md) | `reverse_iterator`オブジェクトを作るヘルパ関数 | C++14 |


## 例
```cpp example
#include <iostream>
#include <vector>
#include <iterator>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  // 逆順に走査する
  std::reverse_iterator<decltype(v)::iterator> first(v.end());
  std::reverse_iterator<decltype(v)::iterator> last(v.begin());

  std::for_each(first, last, [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::reverse_iterator[color ff0000]

### 出力
```
5
4
3
2
1
```

### 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
