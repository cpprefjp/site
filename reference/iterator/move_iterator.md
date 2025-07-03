# move_iterator
* iterator[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Iterator>
  class move_iterator;
}
```

## 概要
`move_iterator`は、イテレータをラップし、間接参照時に参照先の要素をムーブするイテレータアダプタである。その他の操作は、元のイテレータそのものの動作をする。


## 要件

`move_iterator`クラスのテンプレートパラメータ`Iterator`は、入力イテレータの要件を満たすか[`input_iterator`](/reference/iterator/input_iterator.md)のモデルであること。  
さらに、双方向またはランダムアクセスの横断を必要とする操作を行う場合は、それぞれ双方向イテレータまたはランダムアクセスイテレータの要件を満たすか、それぞれ[`bidirectional_iterator`](/reference/iterator/bidirectional_iterator.md)または[`random_access_iterator`](/reference/iterator/random_access_iterator.md)のモデルであること。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| [`(constructor)`](move_iterator/op_constructor.md) | コンストラクタ | C++11 |
| `~move_iterator() = default`                         | デストラクタ | C++11 |
| [`operator=`](move_iterator/op_assign.md)          | 代入演算子 | C++11 |
| [`base`](move_iterator/base.md)                    | 元のイテレータを取得する | C++11 |
| [`operator*`](move_iterator/op_deref.md)           | 間接参照演算子 | C++11 |
| [`operator->`](move_iterator/op_arrow.md)          | メンバアクセス演算子 | C++11 |
| [`operator++`](move_iterator/op_increment.md)      | イテレータをインクリメントする | C++11 |
| [`operator--`](move_iterator/op_decrement.md)      | イテレータをデクリメントする | C++11 |
| [`operator+`](move_iterator/op_unary_plus.md)      | イテレータを進める | C++11 |
| [`operator+=`](move_iterator/op_plus_assign.md)    | イテレータ自身を進める | C++11 |
| [`operator-`](move_iterator/op_unary_minus.md)     | イテレータを逆に進める | C++11 |
| [`operator-=`](move_iterator/op_minus_assign.md)   | イテレータ自身を逆に進める | C++11 |
| [`operator[]`](move_iterator/op_at.md)             | 任意の位置にランダムアクセスする | C++11 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| `iterator_type` | 元となるイテレータ型 `Iterator` | C++11 |
| [`difference_type`](move_iterator/type-difference_type.md) | イテレータ間の差を表す数値型 | C++11 |
| `pointer` | ポインタ型 `Iterator` | C++11 |
| [`value_type`](move_iterator/type-value_type.md) | イテレータが指す値型 | C++11 |
| [`iterator_category`](move_iterator/type-iterator_category.md) | イテレータの分類を表す型 | C++11 |
| [`iterator_concept`](move_iterator/type-iterator_concept.md) | イテレータコンセプトを表す型 | C++20 |
| [`reference`](move_iterator/type-reference.md) | イテレータを間接参照する型 | C++11 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| [`operator==`](move_iterator/op_equal.md)         | 等値比較 | C++11 |
| [`operator!=`](move_iterator/op_not_equal.md)     | 非等値比較 | C++11 |
| [`operator<`](move_iterator/op_less.md)           | 左辺が右辺より小さいかの判定を行う | C++11 |
| [`operator<=`](move_iterator/op_less_equal.md)    | 左辺が右辺以下かの判定を行う | C++11 |
| [`operator>`](move_iterator/op_greater.md)        | 左辺が右辺より大きいかの判定を行う | C++11 |
| [`operator>=`](move_iterator/op_greater_equal.md) | 左辺が右辺以上かの判定を行う | C++11 |
| [`operator<=>`](move_iterator/op_compare_3way.md)           | 三方比較を行う | C++20 |
| [`operator-`](move_iterator/op_minus.md)          | 2つの`move_iterator`の差を求める | C++11 |
| [`operator+`](move_iterator/op_plus.md)           | イテレータを進める | C++11 |
| [`make_move_iterator`](make_move_iterator.md)     | `move_iterator`のヘルパ関数 | C++11 |
| [`iter_move`](move_iterator/iter_move.md)     | イテレータの要素の移動 | C++20 |
| [`iter_swap`](move_iterator/iter_swap.md)     | イテレータの要素の交換 | C++20 |

### [`move_sentinel`](move_sentinel.md)との間の操作

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| [`operator==`](move_iterator/op_equal.md)         | 等値比較 | C++20 |
| [`operator!=`](move_iterator/op_equal.md)     | 非等値比較（`==`により使用可能） | C++20 |
| [`operator-`](move_iterator/op_minus.md)          | `move_iterator`と終端との差を求める | C++20 |


## 例
```cpp example
#include <iostream>
#include <vector>
#include <memory>
#include <algorithm>
#include <iterator>

int main()
{
  std::vector<std::unique_ptr<int>> v;
  for (int i = 0; i < 5; ++i)
    v.emplace_back(new int(i));

  std::vector<std::unique_ptr<int>> v2;
  v2.assign(std::make_move_iterator(v.begin()),
            std::make_move_iterator(v.end()));

  std::for_each(v2.begin(), v2.end(),
    [](const std::unique_ptr<int>& v) { std::cout << *v << std::endl; });
}
```
* std::make_move_iterator[color ff0000]
* v.emplace_back[link /reference/vector/vector/emplace_back.md]

### 出力
```
0
1
2
3
4
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++11 右辺値参照・ムーブセマンティクス](/lang/cpp11/rvalue_ref_and_move_semantics.md)


## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
