# move_sentinel
* iterator[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<semiregular S>
  class move_sentinel {

  private:
    S last; // 説明専用メンバ変数
  };
}
```
* semiregular[link /reference/concepts/semiregular.md]

## 概要
`move_sentinel`は、[`move_iterator`](/reference/iterator/move_iterator.md)と共に任意のイテレータと番兵のペアをラップして、要素をムーブする範囲を表すための番兵アダプタである。

イテレータ型と番兵型が異なり、番兵型がイテレータとしての要件を満たさない場合終端を指す`move_iterator`を構成する事が出来ない。その場合にこのクラスを利用する事で、`move_iterator`の終端を構成する事が出来るようになる。

任意の入力イテレータ型`I`とその番兵型`S`が[`sentinel_for`](/reference/iterator/sentinel_for.md)`<S, I>`のモデルである時、`move_iterator<I>`と`move_sentinel<S>`もまた`sentinel_for<move_sentinel<S>, move_iterator<I>>`のモデルとなる。

## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| [`(constructor)`](move_sentinel/op_constructor.md) | コンストラクタ | C++20 |
| [`operator=`](move_sentinel/op_assign.md)          | 代入演算子 | C++20 |
| [`base`](move_sentinel/base.md)                    | 元の番兵を取得する | C++20 |

### `move_iterator`との間の操作

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| [`operator==`](move_iterator/op_equal.md)         | 等値比較 | C++20 |
| [`operator!=`](move_iterator/op_equal.md)     | 非等値比較（`==`により使用可能） | C++20 |
| [`operator-`](move_iterator/op_minus.md)          | `move_iterator`との距離を求める | C++20 |

## 利用例

例えば次のようなアルゴリズムを構成する際に利用する事ができる。

```cpp example
#include <iostream>
#include <algorithm>
#include <iterator>

// 範囲[first, last)から条件を満たす要素だけをムーブしてoutへ出力する
template<std::input_iterator I, std::sentinel_for<I> S, std::weakly_incrementable O, std::indirect_unary_predicate<I> Pred>
  requires std::indirectly_movable<I, O>
void move_if(I first, S last, O out, Pred pred) {
  // 番兵型SがIと異なり、イテレータ要件を満たさなかったとしても、move_iterator<I>の終端として扱う事ができる
  std::ranges::copy_if(std::move_iterator<I>{first}, std::move_sentinel<S>{last}, out, pred);
}
```
* std::move_sentinel[color ff0000]
* input_iterator[link /reference/iterator/input_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* indirectly_movable[link /reference/iterator/indirectly_movable.md]
* copy_if[link /reference/algorithm/copy_if.md]


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 7 [mark verified]

## 関連項目

- [`move_iterator`](/reference/iterator/move_iterator.md)

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
