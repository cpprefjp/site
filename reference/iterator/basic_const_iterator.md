# basic_const_iterator
* iterator[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template<input_iterator Iterator>
  class basic_const_iterator;
}
```
* input_iterator[link ./input_iterator.md]

## 概要

`basic_const_iterator`は、イテレータをラップし、元の要素を定数（`const`）として参照するイテレータアダプタである。その他の操作は、元のイテレータそのものの動作をする。

## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| [`(constructor)`](basic_const_iterator/op_constructor.md) | コンストラクタ | C++23 |
| [`base`](basic_const_iterator/base.md)                    | 元のイテレータを取得する | C++23 |
| [`operator*`](basic_const_iterator/op_deref.md)           | 間接参照演算子 | C++23 |
| [`operator->`](basic_const_iterator/op_arrow.md)          | メンバアクセス演算子 | C++23 |
| [`operator++`](basic_const_iterator/op_increment.md)      | イテレータをインクリメントする | C++23 |
| [`operator--`](basic_const_iterator/op_decrement.md)      | イテレータをデクリメントする | C++23 |
| [`operator+=`](basic_const_iterator/op_plus_assign.md)    | イテレータ自身を進める | C++23 |
| [`operator-=`](basic_const_iterator/op_minus_assign.md)   | イテレータ自身を逆に進める | C++23 |
| [`operator-`](basic_const_iterator/op_minus.md)          | 2つの`basic_const_iterator`の差を求める | C++23 |
| [`operator[]`](basic_const_iterator/op_at.md)             | 任意の位置にランダムアクセスする | C++23 |
| [`operator==`](basic_const_iterator/op_equal.md)         | 等値比較 | C++23 |
| `operator!=`     | 非等値比較 ([`==`](basic_const_iterator/op_equal.md)により使用可能) | C++23 |
| [`operator<`](basic_const_iterator/op_less.md)           | 左辺が右辺より小さいかの判定を行う | C++23 |
| [`operator<=`](basic_const_iterator/op_less_equal.md)    | 左辺が右辺以下かの判定を行う | C++23 |
| [`operator>`](basic_const_iterator/op_greater.md)        | 左辺が右辺より大きいかの判定を行う | C++23 |
| [`operator>=`](basic_const_iterator/op_greater_equal.md) | 左辺が右辺以上かの判定を行う | C++23 |
| [`operator<=>`](basic_const_iterator/op_compare_3way.md)           | 三方比較を行う | C++23 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| `iterator_concept` | `Iterator`がモデルとなる最も強いイテレータコンセプトに対応する[イテレータタグ型](/reference/iterator/iterator_tag.md) | C++23 |
| `iterator_category` | `Iterator`が[`forward_iterator`](/reference/iterator/forward_iterator.md)のモデルである場合にのみ[`iterator_traits`](/reference/iterator/iterator_traits.md)`<Iterator>::iterator_category`として定義される | C++23 |
| `value_type` | [`iter_value_t`](/reference/iterator/iter_value_t.md)`<Iterator>` | C++23 |
| `difference_type` | [`iter_difference_t`](/reference/iterator/iter_difference_t.md)`<Iterator>` | C++23 |

`iterator_concept`は次のように決定される

- `Iterator`が[`contiguous_iterator`](/reference/iterator/contiguous_iterator.md)のモデルとなる場合
    - `contiguous_iterator_tag`
- そうではなく、`Iterator`が[`random_access_iterator`](/reference/iterator/random_access_iterator.md)のモデルとなる場合
    - `random_access_iterator_tag`
- そうではなく、`Iterator`が[`bidirectional_iterator`](/reference/iterator/bidirectional_iterator.md)のモデルとなる場合
    - `bidirectional_iterator_tag`
- そうではなく、`Iterator`が[`forward_iterator`](/reference/iterator/forward_iterator.md)のモデルとなる場合
    - `forward_iterator_tag`
- それ以外の場合
    - `input_iterator_tag`

## 非メンバ（*Hidden friends*）関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| [`operator<`](basic_const_iterator/op_less.md)           | 左辺が右辺より小さいかの判定を行う | C++23 |
| [`operator<=`](basic_const_iterator/op_less_equal.md)    | 左辺が右辺以下かの判定を行う | C++23 |
| [`operator>`](basic_const_iterator/op_greater.md)        | 左辺が右辺より大きいかの判定を行う | C++23 |
| [`operator>=`](basic_const_iterator/op_greater_equal.md) | 左辺が右辺以上かの判定を行う | C++23 |
| [`operator+`](basic_const_iterator/op_plus.md)           | イテレータを進める | C++23 |
| [`operator-`](basic_const_iterator/op_unary_minus.md)     | イテレータを逆に進める | C++23 |
| [`operator-`](basic_const_iterator/op_minus.md)          | 2つの`basic_const_iterator`の差を求める | C++23 |
| [`iter_move`](basic_const_iterator/iter_move.md)     | イテレータの要素の移動 | C++23 |

## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| [`make_const_iterator`](make_const_iterator.md)     | `basic_const_iterator`のヘルパ関数 | C++23 |
| [`make_const_sentinel`](make_const_sentinel.md)     | `basic_const_iterator`のヘルパ関数 | C++23 |

## 特殊化

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| [`common_type`](basic_const_iterator/common_type.md)     | `basic_const_iterator`とイテレータ型の間の共通の型を求める | C++23 |


## 例

```cpp example
#include <iterator>
#include <vector>
#include <iostream>

int main() {
  std::vector vec = {1, 2, 3, 4, 5};

  auto cit = std::make_const_iterator(vec.begin());

  std::cout << *cit << '\n';

  ++cit;

  std::cout << *cit << '\n';

  // 要素を変更できない
  //*cit = 0;
}
```

### 出力
```
1
2
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]

## 参照

- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
