# iterator
* iterator[meta header]

`<iterator>`ヘッダでは、イテレータに関する機能群を提供する。
イテレータは日本語では反復子とも呼ばれ、配列やコンテナのような範囲を横断する手段として使用できる。

C++標準ライブラリのイテレータは、以下のように階層的に定義される。
この階層はC++言語機能の継承と同じように見なせる。たとえば、入力イテレータと前方向イテレータはis a関係が成り立っており、前方向イテレータは入力イテレータと見なすことができる。

![](https://raw.githubusercontent.com/cpprefjp/image/master/reference/iterator/iterators.jpg)

C++20以降の標準ライブラリでは、任意のイテレータに対して可能な操作によって上記5つに隣接イテレータ（*contiguous iterator*）を加えた6つのイテレータカテゴリを定義する。それぞれ次のイテレータコンセプトが対応する。

- 入力イテレータ : [`input_iterator`](iterator/input_iterator.md)
- 出力イテレータ : [`output_iterator`](iterator/output_iterator.md)
- 前方向イテレータ : [`forward_iterator`](iterator/forward_iterator.md)
- 双方向イテレータ : [`bidirectional_iterator`](iterator/bidirectional_iterator.md)
- ランダムアクセスイテレータ : [`random_access_iterator`](iterator/random_access_iterator.md)
- 隣接イテレータ : [`contiguous_iterator`](iterator/contiguous_iterator.md)

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<concepts>`](concepts.md) (C++20)
- [`<compare>`](compare.md) (C++20)

## イテレータコンセプト

| 名前                         | 説明                                            | 対応バージョン |
|------------------------------|-------------------------------------------------|----------------|
| [`indirectly_readable`](iterator/indirectly_readable.md) | 間接参照によって読み取り可能 (concept)           | C++20          |
| [`indirectly_writable`](iterator/indirectly_writable.md) | 間接参照によって書き込み可能 (concept)           | C++20          |
| [`weakly_incrementable`](iterator/weakly_incrementable.md) | 前置/後置インクリメント可能 (concept)           | C++20          |
| [`incrementable`](iterator/incrementable.md) | `weakly_incrementable`かつ[正則](/reference/concepts/regular.md) (concept)           | C++20          |
| [`input_or_output_iterator`](iterator/input_or_output_iterator.md) | 基礎的なイテレータコンセプト (concept)           | C++20          |
| [`sentinel_for`](iterator/sentinel_for.md) | 同じ範囲についてのイテレータと番兵 (concept)           | C++20          |
| [`sized_sentinel_for`](iterator/sized_sentinel_for.md) | 距離を定義可能なイテレータ (concept)           | C++20          |
| [`disable_sized_sentinel_for`](iterator/disable_sized_sentinel_for.md) | `sentinel_for<S, I>`について、`sized_sentinel_for`を不適合にする (variable template)           | C++20          |
| [`input_iterator`](iterator/input_iterator.md) | 入力イテレータ (concept)           | C++20          |
| [`output_iterator`](iterator/output_iterator.md) | 出力イテレータ (concept)           | C++20          |
| [`forward_iterator`](iterator/forward_iterator.md) | 前方向イテレータ (concept)           | C++20          |
| [`bidirectional_iterator`](iterator/bidirectional_iterator.md) | 双方向イテレータ (concept)           | C++20          |
| [`random_access_iterator`](iterator/random_access_iterator.md) | ランダムアクセスイテレータ (concept)           | C++20          |
| [`contiguous_iterator`](iterator/contiguous_iterator.md) | 隣接イテレータ (concept)           | C++20          |

## イテレータを介した関数呼び出しに関するコンセプト

| 名前                         | 説明                                            | 対応バージョン |
|------------------------------|-------------------------------------------------|----------------|
| [`indirectly_unary_invocable`](iterator/indirectly_unary_invocable.md) | イテレータの要素型によって呼び出し可能 (concept)           | C++20          |
| [`indirectly_regular_unary_invocable`](iterator/indirectly_unary_invocable.md) | 正則な`indirectly_unary_invocable` (concept)           | C++20          |
| [`indirect_unary_predicate`](iterator/indirect_unary_predicate.md) | イテレータの要素型についての単項述語 (concept)           | C++20          |
| [`indirect_binary_predicate`](iterator/indirect_binary_predicate.md) | 2つのイテレータの要素型についての二項述語 (concept)           | C++20          |
| [`indirect_equivalence_relation`](iterator/indirect_equivalence_relation.md) | 2つのイテレータの要素型についての同値関係 (concept)           | C++20          |
| [`indirect_strict_weak_order`](iterator/indirect_strict_weak_order.md) | 2つのイテレータの要素型についての狭義の弱順序 (concept)           | C++20          |

## イテレータによるアルゴリズムに関するコンセプト

| 名前                         | 説明                                            | 対応バージョン |
|------------------------------|-------------------------------------------------|----------------|
| [`indirectly_movable`](iterator/indirectly_movable.md) | 片方のイテレータからもう片方のイテレータへ要素をムーブ可能 (concept)           | C++20          |
| [`indirectly_movable_storable`](iterator/indirectly_movable_storable.md) | 片方のイテレータからもう片方のイテレータへ中間オブジェクトを介して要素をムーブ可能 (concept)           | C++20          |
| [`indirectly_copyable`](iterator/indirectly_copyable.md) | 片方のイテレータからもう片方のイテレータへ要素をコピー可能 (concept)           | C++20          |
| [`indirectly_copyable_storable`](iterator/indirectly_copyable_storable.md) | 片方のイテレータからもう片方のイテレータへ中間オブジェクトを介して要素をコピー可能 (concept)           | C++20          |
| [`indirectly_swappable`](iterator/indirectly_swappable.md) | 2つのイテレータ間で要素を交換可能 (concept)           | C++20          |
| [`indirectly_comparable`](iterator/indirectly_comparable.md) | 2つのイテレータ間で要素を比較可能 (concept)           | C++20          |
| [`permutable`](iterator/permutable.md) | イテレータを介して要素を並べ替え可能 (concept)           | C++20          |
| [`mergeable`](iterator/mergeable.md) | イテレータを介して範囲をマージ可能 (concept)           | C++20          |
| [`sortable`](iterator/sortable.md) | イテレータを介して範囲をソート可能 (concept)           | C++20          |

## イテレータの情報

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|------------------------------------------|-------|
| [`iterator_traits`](iterator/iterator_traits.md) | イテレータに関する型情報(class template) | |
| [`iterator`](iterator/iterator.md) | イテレータを定義するための基底クラス(class template) | C++17から非推奨 |
| [`iter_difference_t`](iterator/iter_difference_t.md) | イテレータの`difference_type`を取得する (alias template) | C++20 |
| [`iter_value_t`](iterator/iter_value_t.md) | イテレータの`value_type`を取得する (alias template)           | C++20          |
| [`iter_reference_t`](iterator/iter_reference_t.md) | イテレータの`reference_type`を取得する (alias template)           | C++20          |
| [`iter_rvalue_reference_t`](iterator/iter_rvalue_reference_t.md) | イテレータの指す要素の右辺値参照型を取得する (alias template)           | C++20          |
| [`iter_common_reference_t`](iterator/iter_common_reference_t.md) | イテレータの`value_type`と`reference_type`の[`common_reference`](/reference/type_traits/common_reference.md)を取得する (alias template)           | C++20          |
| [`iter_const_reference_t`](iterator/iter_const_reference_t.md) | イテレータの参照型（`iter_reference_t`）を`const`化したものを取得する (alias template)           | C++23          |
| [`indirect_result_t`](iterator/indirect_result_t.md) | 関数呼び出し可能な型`F`を複数のイテレータ`Is...`によって呼び出した時の戻り値型を取得する (alias template)           | C++20          |
| [`projected`](iterator/projected.md) | イテレータ`I`の`Proj`による射影操作の結果を表すことのできる[`indirectly_readable`](/reference/iterator/indirectly_readable.md)なクラス (class template)           | C++20          |
| [`projected_value_t`](iterator/projected_value_t.md) | イテレータ`I`の`Proj`による射影操作の結果となる値型を取得する (alias template) | C++26 |
| [`incrementable_traits`](iterator/incrementable_traits.md)   | `iter_difference_t`にアダプトするためのカスタマイゼーションポイント (class template)               | C++20          |
| [`indirectly_readable_traits`](iterator/indirectly_readable_traits.md) | `iter_value_t`にアダプトするためのカスタマイゼーションポイント (class template)           | C++20          |
| [`input_iterator_tag`](iterator/iterator_tag.md) | 入力イテレータを表すタグ(class) | |
| [`output_iterator_tag`](iterator/iterator_tag.md) | 出力イテレータを表すタグ(class) | |
| [`forward_iterator_tag`](iterator/iterator_tag.md) | 前方向イテレータを表すタグ(class) | |
| [`bidirectional_iterator_tag`](iterator/iterator_tag.md) | 双方向イテレータを表すタグ(class) | |
| [`random_access_iterator_tag`](iterator/iterator_tag.md) | ランダムアクセスイテレータを表すタグ(class) | |
| [`contiguous_iterator_tag`](iterator/iterator_tag.md) | 隣接イテレータを表すタグ(class) | C++20 |

## イテレータの進行と距離

| 名前                               | 説明                                                 | 対応バージョン |
|------------------------------------|------------------------------------------------------|----------------|
| [`advance`](iterator/advance.md)   | `n`回イテレータを進める(function template)           |                |
| [`distance`](iterator/distance.md) | イテレータ間の距離を求める(function template)        |                |
| [`next`](iterator/next.md)         | `n`回前方に進めたイテレータを返す(function template) | C++11          |
| [`prev`](iterator/prev.md)         | `n`回後方に進めたイテレータを返す(function template) | C++11          |
| [`ranges::advance`](iterator/ranges_advance.md)   | イテレータを進める(function template)           | C++20          |
| [`ranges::distance`](iterator/ranges_distance.md) | 範囲の長さを求める(function template)        | C++20          |
| [`ranges::next`](iterator/ranges_next.md)         | 前方に進めたイテレータを返す(function template) | C++20          |
| [`ranges::prev`](iterator/ranges_prev.md)         | 後方に進めたイテレータを返す(function template) | C++20          |

## 逆順イテレータ

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|------------------------------------------|-------|
| [`reverse_iterator`](iterator/reverse_iterator.md) | 逆方向に進むイテレータアダプタ(class template) | |
| [`make_reverse_iterator`](iterator/make_reverse_iterator.md) | `reverse_iterator`オブジェクトを作るヘルパ関数(function template) | C++14 |

## 挿入イテレータ

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|------------------------------------------|-------|
| [`back_insert_iterator`](iterator/back_insert_iterator.md) | 末尾に要素を挿入する出力イテレータアダプタ(class template) | |
| [`back_inserter`](iterator/back_inserter.md) | `back_insert_iterator`オブジェクトを作るヘルパ関数(function template) | |
| [`front_insert_iterator`](iterator/front_insert_iterator.md) | 先頭に要素を挿入する出力イテレータアダプタ(class template) | |
| [`front_inserter`](iterator/front_inserter.md) | `front_insert_iterator`オブジェクトを作るヘルパ関数(function template) | |
| [`insert_iterator`](iterator/insert_iterator.md) | 任意の位置に要素を挿入する出力イテレータアダプタ(class template) | |
| [`inserter`](iterator/inserter.md) | `insert_iterator`オブジェクトを作るヘルパ関数(function template) | |

## 要素を移動するイテレータ

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|------------------------------------------|-------|
| [`move_iterator`](iterator/move_iterator.md) | 間接参照時にムーブするイテレータアダプタ(class template) | C++11 |
| [`make_move_iterator`](iterator/make_move_iterator.md) | `move_iterator`オブジェクトを作るヘルパ関数(function template) | C++11 |
| [`move_sentinel`](iterator/move_sentinel.md) | `move_iterator`の終端を表す番兵型(class template) | C++20 |

## ストリームイテレータ

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|------------------------------------------|-------|
| [`istream_iterator`](iterator/istream_iterator.md) | 入力ストリームイテレータ(class template) | |
| [`ostream_iterator`](iterator/ostream_iterator.md) | 出力ストリームイテレータ(class template) | |
| [`istreambuf_iterator`](iterator/istreambuf_iterator.md) | 入力ストリームバッファイテレータ(class template) | |
| [`ostreambuf_iterator`](iterator/ostreambuf_iterator.md) | 出力ストリームバッファイテレータ(class template) | |

## 定数イテレータ

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|------------------------------------------|-------|
| [`basic_const_iterator`](iterator/basic_const_iterator.md) | イテレータの要素を`const`化するラッパーイテレータ(class template) | C++23 |
| [`const_iterator`](iterator/const_iterator.md) | 要素が`const`化されたイテレータ型を取得する (alias template)           | C++23 |
| [`const_sentinel`](iterator/const_sentinel.md) | 要素が`const`化された番兵型を取得する (alias template)           | C++23 |
| [`make_const_iterator`](iterator/make_const_iterator.md) | `const_iterator`オブジェクトを作るヘルパ関数(function template) | C++23 |
| [`make_const_sentinel`](iterator/make_const_sentinel.md) | `const_sentinel`オブジェクトを作るヘルパ関数(function template) | C++23 |

## その他のイテレータアダプタ

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|------------------------------------------|-------|
| [`common_iterator`](iterator/common_iterator.md) | イテレータ型と番兵型が異なる場合に型を共通化するためのラッパーイテレータ(class template) | C++20 |
| [`counted_iterator`](iterator/counted_iterator.md) | 予め指定された`N`個の要素だけをイテレートするラッパーイテレータ(class template) | C++20 |

## 番兵型

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|------------------------------------------|-------|
| [`default_sentinel_t`](iterator/default_sentinel_t.md) | 任意の範囲の終端を表すことのできるデフォルトの番兵型(class template) | C++20 |
| [`default_sentinel`](iterator/default_sentinel_t.md) | 任意の範囲の終端を表すことのできるデフォルトの番兵オブジェクト(constant variable) | C++20 |
| [`unreachable_sentinel_t`](iterator/unreachable_sentinel_t.md) | 別の方法で終端が指定される範囲の仮想的な終端を表す番兵型(class template) | C++20 |
| [`unreachable_sentinel`](iterator/unreachable_sentinel_t.md) | 別の方法で終端が指定される範囲の仮想的な終端を表す番兵オブジェクト(class template) | C++20 |

## 先頭イテレータと末尾イテレータ

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|------------------------------------------|-------|
| [`begin`](iterator/begin.md) | 範囲の先頭を指すイテレータを取得する(function template) | C++11 |
| [`end`](iterator/end.md) | 範囲の末尾の次を指すイテレータを取得する(function template) | C++11 |
| [`cbegin`](iterator/cbegin.md) | 範囲の先頭を指す読み取り専用イテレータを取得する(function template) | C++14 |
| [`cend`](iterator/cend.md) | 範囲の末尾の次を指す読み取り専用イテレータを取得する(function template) | C++14 |
| [`rbegin`](iterator/rbegin.md) | 範囲の末尾を指す逆イテレータを取得する(function template) | C++14 |
| [`rend`](iterator/rend.md) | 範囲の先頭の前を指す逆イテレータを取得する(function template) | C++14 |
| [`crbegin`](iterator/crbegin.md) | 範囲の末尾を指す読み取り専用逆イテレータを取得する(function template) | C++14 |
| [`crend`](iterator/crend.md) | 範囲の先頭の前を指す読み取り専用逆イテレータを取得する(function template) | C++14 |

## コンテナアクセス

| 名前                         | 説明                                            | 対応バージョン |
|------------------------------|-------------------------------------------------|----------------|
| [`size`](iterator/size.md)   | コンテナの要素数を取得する (function)               | C++17          |
| [`ssize`](iterator/ssize.md) | コンテナの要素数を、符号付き整数型で取得する (function) | C++20 |
| [`empty`](iterator/empty.md) | コンテナが空かどうかを判定する (function)           | C++17          |
| [`data`](iterator/data.md)   | コンテナの要素配列へのポインタを取得する (function) | C++17          |

## カスタマイゼーションポイントオブジェクト

| 名前                         | 説明                                            | 対応バージョン |
|------------------------------|-------------------------------------------------|----------------|
| [`ranges::iter_move`](iterator/iter_move.md)   | イテレータの指す要素をムーブする (customization point object)               | C++20          |
| [`ranges::iter_swap`](iterator/iter_swap.md) | 2つのイテレータの指す要素を*swap*する (customization point object) | C++20 |

## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [P2051R0 C++ Standard Library Issues to be moved in Prague](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2051r0.html)
- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
