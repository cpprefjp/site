#algorithm

全てのアルゴリズムはデータ構造の実装の詳細から切り離されていて、イテレータによってパラメータ化されている。これはアルゴリズムの要件を満たすイテレータを提供しているなら、どのようなデータ構造であっても動作するということを示している。

関数オブジェクトを使用するアルゴリズムでは、`for_each`以外、引数として渡されたオブジェクトを書き換えてはならない。

ここでは、各アルゴリズムのテンプレートパラメータ名を、型の要件を表すために使っている。アルゴリズムを正しく利用するためには、テンプレートパラメータ名に応じたこれらの要件を満たしている必要がある。以下の通りである。


| | |
|-------------------------------------------------------------------------|------------------------|
| テンプレートパラメータ名 | 要件 |
| InputIterator<br/> InputIterator1<br/> InputIterator2 | input iterator |
| OutputIterator<br/> OutputIterator1<br/> OutputIterator2 | output iterator |
| ForwardIterator<br/> ForwardIterator1<br/> ForwardIterator2 | forward iterator |
| BidirectionalIterator<br/> BidirectionalIterator1<br/> BidirectionalIterator2 | bidirectional iterator |
| RandomAccessIterator<br/> RandomAccessIterator1<br/> RandomAccessIterator2 | random-access iterator |

もし「効果」のセクションで、イテレータの値を書き換えるという旨の文章が書かれている場合、その引数の型は mutable iterator の要件を満たしていなければならないという追加の要件がある。
もちろん、output iterator は常に書き換え可能であるため、この追加の要件は無意味である。

いくつかのアルゴリズムは `_copy` というサフィックスが付いている。これは `_copy` サフィックスの付いていないアルゴリズムと違い、処理の結果を別のイテレータへ出力するアルゴリズムである。コピーバージョンを含めるかどうかの判断は、通常バージョンの計算量を考慮する。操作を行うコストがコピーのコストを大きく上回る場合、コピーバージョンは含めないようになっている。例えば `sort_copy` は存在しない。なぜなら、ソートのコストは大きいし、そのような場合、ユーザは `copy` してから `sort` するからだ。

テンプレートパラメータ名が `Predicate` となっている場合、`Predicate` の値 `pred` と、引数として渡すイテレータ `i` について以下の要件を満たす必要がある
- `pred(*i)` が `bool` として評価できなければならない。
- `pred(*i)` 内で `*i` を書き変えてはならない。

テンプレートパラメータ名が `BinaryPredicate` となっている場合、`BinaryPredicate` の値 `binary_pred` と、引数として渡すイテレータ `i1`, `i2` について以下の要件を満たす必要がある
- `binary_pred(*i1, *i2)` が `bool` として評価できなければならない。
- `binary_pred(*i1, *i2)` 内で `*i1` や `*i2` を書き変えてはならない。

関数オブジェクトを引数に取る `for_each` 以外のアルゴリズムは、その関数オブジェクトを自由にコピーしても構わない。そのため、アルゴリズムの利用者はそのことに注意する必要がある。コピーされてしまうことが問題である場合、`reference_wrapper<T>` や同様の解決手段を使ってオブジェクトの中身をコピーしないようなラッパークラスを使うといった対策を行う必要がある。

アルゴリズムの説明で `+` や `-` を使っているが、random-access iterator 以外のイテレータはそれを定義していない。そういった場合、 `a+n` というのは
```cpp
X tmp = a;
advance(tmp, n);
return tmp;
```
を意味する。また、`b-a` は
```cpp
return distance(a, b);
```
を意味する。


##シーケンスを変更しない操作

| | |
|------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| [`all_of`](./algorithm/all_of.md) | 全ての要素が条件を満たしているかを調べる(C++11) |
| [`any_of`](./algorithm/any_of.md) | どれかの要素が条件を満たしているかを調べる(C++11) |
| [`none_of`](./algorithm/none_of.md) | 全ての要素が条件を満たしていないかを調べる(C++11) |
| [`for_each`](./algorithm/for_each.md) | 全ての要素に対して処理を行う |
| [`find`](./algorithm/find.md) | 指定された値を検索する |
| [`find_if`](./algorithm/find_if.md) | 条件を満たす最初の要素を検索する |
| [`find_if_not`](./algorithm/find_if_not.md) | 条件を満たしていない最初の要素を検索する(C++11) |
| [`find_end`](./algorithm/find_end.md) | 指定された最後のサブシーケンスを検索する |
| [`find_first_of`](./algorithm/find_first_of.md) | ある集合の1つとマッチする最初の要素を検索する |
| [`adjacent_find`](./algorithm/adjacent_find.md) | 隣接する要素で条件を満たしている最初の要素を検索する |
| [`count`](./algorithm/count.md) | 指定された値である要素の数を数える |
| [`count_if`](./algorithm/count_if.md) | 条件を満たしている要素の数を数える |
| [`mismatch`](./algorithm/mismatch.md) | 2つの範囲が一致していない場所を検索する |
| [`equal`](./algorithm/equal.md) | 2つの範囲を等値比較する |
| [`search`](./algorithm/search.md) | 指定された最初のサブシーケンスを検索する |
| [`search_n`](./algorithm/search_n.md) | 指定された最初のサブシーケンスを検索する |


##シーケンスを変更する操作

| | |
|------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`copy`](./algorithm/copy.md) | 指定された範囲の要素をコピーする |
| [`copy_n`](./algorithm/copy_n.md) | 指定された数の要素をコピーする(C++11) |
| [`copy_if`](./algorithm/copy_if.md) | 条件を満たす要素のみをコピーする(C++11) |
| [`copy_backward`](./algorithm/copy_backward.md) | 指定された範囲の要素を後ろからコピーする |
| [`move`](./algorithm/move.md) | 指定された範囲の要素をムーブする(C++11) |
| [`move_backward`](./algorithm/move_backward.md) | 指定された範囲の要素を後ろからムーブする(C++11) |
| [`swap_ranges`](./algorithm/swap_ranges.md) | 指定された2つの範囲同士を swap する |
| [`iter_swap`](./algorithm/iter_swap.md) | 2つのイテレータの要素を swap する |
| [`transform`](./algorithm/transform.md) | 全ての要素に関数を適用する |
| [`replace`](./algorithm/replace.md) | 指定された値と一致する要素を指定された値に置き換える |
| [`replace_if`](./algorithm/replace_if.md) | 条件を満たす要素を指定された値に置き換える |
| [`replace_copy`](./algorithm/replace_copy.md) | 指定された値を一致する要素を指定された値に置き換え、その結果を出力の範囲へコピーする |
| [`replace_copy_if`](./algorithm/replace_copy_if.md) | 条件を満たす要素を指定された値に置き換え、その結果を出力の範囲へコピーする |
| [`fill`](./algorithm/fill.md) | 指定された値で出力の範囲に書き込む |
| [`fill_n`](./algorithm/fill_n.md) | 指定された値で出力の範囲に n 個書き込む |
| [`generate`](./algorithm/generate.md) | 出力の範囲へ関数の結果を書き込む |
| [`generate_n`](./algorithm/generate_n.md) | 出力の範囲へ関数の結果を n 個書き込む |
| [`remove`](./algorithm/remove.md) | 指定された要素を除ける |
| [`remove_if`](./algorithm/remove_if.md) | 条件を満たす要素を除ける |
| [`remove_copy`](./algorithm/remove_copy.md) | 指定された要素を除け、その結果を出力の範囲へコピーする |
| [`remove_copy_if`](./algorithm/remove_copy_if.md) | 条件を満たす要素を除け、その結果を出力の範囲へコピーする |
| [`unique`](./algorithm/unique.md) | 重複した要素を除ける |
| [`unique_copy`](./algorithm/unique_copy.md) | 重複した要素を除け、その結果を出力の範囲へコピーする |
| [`reverse`](./algorithm/reverse.md) | 要素の並びを逆にする |
| [`reverse_copy`](./algorithm/reverse_copy.md) | 要素の並びを逆にし、その結果を出力の範囲へコピーする |
| [`rotate`](./algorithm/rotate.md) | 要素の並びを回転させる |
| [`rotate_copy`](./algorithm/rotate_copy.md) | 要素の並びを回転させ、その結果を出力の範囲へコピーする |
| [`random_shuffle`](./algorithm/random_shuffle.md) | それぞれの要素をランダムな位置に移動させる(一部C++11) |
| [`shuffle`](./algorithm/shuffle.md) | それぞれの要素をランダムな位置に移動させる(C++11) |
| [`is_partitioned`](./algorithm/is_partitioned.md) | 与えられた範囲がパーティションされているか判定する(C++11) |
| [`partition`](./algorithm/partition.md) | 与えられた範囲を条件によって 2 つのグループに分ける |
| [`stable_partition`](./algorithm/stable_partition.md) | 与えられた範囲を条件によって 2 つのグループに順序を保ったまま分ける |
| [`partition_copy`](./algorithm/partition_copy.md) | 与えられた範囲を条件によって 2 つのグループに分け、その結果を出力の範囲へコピーする(C++11) |
| [`partition_point`](./algorithm/partition_point.md) | 与えられた範囲を条件によって 2 つのグループに分け、それらの間の位置を得る(C++11) |


##ソートや、それに関連した操作

####以下の文章はドラフト
25.4 の全ての操作は２つのバージョンがある。一つは `Compare` 型の関数オブジェクトを取る関数、もう一つは `operator<` を使用する関数である。

`Compare` は関数オブジェクト型である。
`Compare` 型のオブジェクトを適用した戻り値が `bool` へ contextually convert できるときは、第一引数が第二引数より小さい場合は `true` を、そうでない場合は `false` を返す。
`Compare` 型の `comp` は、アルゴリズム全体で ordering relation があると仮定する。
また、`comp` は間接参照したイテレータを使って非 `const` な関数を呼び出していないと仮定する。

`Compare` を取るアルゴリズムには全て、代わりに `operator<` を使うバージョンもある。
つまり、`comp(*i, *j) != false` はデフォルトで `*i < *j != false` である
25.4.3（BinarySearch）以外のアルゴリズムでは、`comp` は strict weak ordering でなければならない。

term strict は irreflexive relation (全ての `x` について `!comp(x,x)` である）の要件と term weak の要件を refer している。term weak の要件は、total ordering ほど strong ではない要求であるが、partial ordering よりは strong である。`!comp(a, b) && !comp(b, a)` として `equiv(a, b)` を定義する場合、term weak の要件は `comp` と `equiv` の両方が以下のように transitive relations となることである。
- `comp(a, b) && comp(b, c)` は `comp(a, c)` を意味する
- `equiv(a, b) && equiv(b, c)` は `equiv(a, c)` を意味する

Note: 以下の条件から、それが明らかになる
- `equiv` は equivalence relation である
- `comp` は `equiv` によって確定した equivalence クラスである well-defined な relation を induce する
- その induce された relation は strict total ordering である

シーケンスを指す任意のイテレータ `i` と、`i + n` がシーケンス上の要素を指す有効なイテレータである任意の整数 `n` について、`comp(*(i + n), *i) == false` であれば、シーケンスは comparator comp によってソートされている。

シーケンス `[start,finish)` と関数 `f` があるとき、`0 <= i < `[`distance`](/reference/iterator/distance.md)`(start, finish)` 内の全ての整数 `n` について、`i < n` かつその時に限り `f(*(start + i))` が `true` であれば、シーケンス `[start,finish)` は式 `f(e)` によってパーティションされている。

ordering relationship を処理する関数の説明において、この節では stability のようなコンセプトを説明するために equivalence の概念を頻繁に使う。
この節で refer する equivalence は必ずしも `operator==` が必要というわけではないが、equivalence relation は strict weak ordering によって induce する。つまりそれは、２つの要素 `a`, `b` は `!(a < b) && !(b < a)` かつその時に限り equivalent が考慮されるということである。


###ソート

| | |
|--------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| [`sort`](./algorithm/sort.md) | 範囲を並べ替える |
| [`stable_sort`](./algorithm/stable_sort.md) | 範囲を安定ソートで並べ替える |
| [`partial_sort`](./algorithm/partial_sort.md) | 範囲を部分的にソートし、先頭N個を並んだ状態にする |
| [`partial_sort_copy`](./algorithm/partial_sort_copy.md) | 範囲を部分的にソートした結果を他の範囲にコピーする |
| [`is_sorted`](./algorithm/is_sorted.md) | ソート済みか判定する |
| [`is_sorted_until`](./algorithm/is_sorted_until.md) | ソート済みか判定し、ソートされていない位置のイテレータを取得する |


###N 番目の要素

| | |
|--------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| [`nth_element`](./algorithm/nth_element.md) | 基準となる要素よりも小さい要素が、前に来るよう並べ替える |


###二分探索

これらのアルゴリズムは全て二分探索を行う。これらは探索されたシーケンスが暗黙的または明示的に渡された比較関数でソートされていると仮定している。
これらはランダムアクセスイテレータでない場合でも最小の比較回数で動作する。
これらのアルゴリズムに渡されたイテレータがランダムアクセスイテレータである場合、データ構造を渡るときに対数のステップ数で済むため、このイテレータが適している。ランダムアクセスイテレータでない場合は線形のステップ数になる。

| | |
|------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| [`lower_bound`](./algorithm/lower_bound.md) | 指定された要素以上の値が現れる最初の位置のイテレータを取得する |
| [`upper_bound`](./algorithm/upper_bound.md) | 指定された要素より大きい値が現れる最も後ろの位置のイテレータを取得する |
| [`equal_range`](./algorithm/equal_range.md) | lower_boundとupper_boundの結果を組で取得する |
| [`binary_search`](./algorithm/binary_search.md) | 二分探索法による検索を行う |


###マージ

| | |
|------------------------------------------------------------------------------------------------------|------------------------------------------------------------|
| [`merge`](./algorithm/merge.md) | 2つのソート済み範囲をマージする |
| [`inplace_merge`](./algorithm/inplace_merge.md) | 2つの連続したソート済み範囲をマージする |


###ソート済み構造に対する集合演算

このセクションでは基本的なソート済み構造に対する集合演算を定義する。
これらの演算は、等価な要素を複数格納できる `multiset` であっても動作する。集合演算のセマンティクスは、等価な要素が複数あっても、一般化された標準的な方法で演算できるようになっている。
例えば `set_union()` ならそれぞれの要素の最大数を格納する、`set_intersection()` なら最小数を格納するといったようになる。

| | |
|----------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| [`includes`](./algorithm/includes.md) | 2つのソート済み範囲において、一方の範囲の要素がもう一方の範囲に全て含まれているかを判定する |
| [`set_union`](./algorithm/set_union.md) | 2つのソート済み範囲の和集合を得る |
| [`set_intersection`](./algorithm/set_intersection.md) | 2つのソート済み範囲の積集合を得る |
| [`set_difference`](./algorithm/set_difference.md) | 2つのソート済み範囲の差集合を得る |
| [`set_symmetric_difference`](./algorithm/set_symmetric_difference.md) | 2つのソート済み範囲の互いに素な集合を得る |


###ヒープ

２つのランダムアクセスイテレータ `[a,b)` の範囲を特定の構造で構築したものを heap と呼ぶ。heap には２つの特性がある。
- `*a` より大きい要素は無い
- `*a` は、`pop_heap()` で削除したり、`push_heap()` で要素を追加する操作が O(log(N)) でできる

これらの特性はプライオリティキューで有用である。
`make_heap()` は heap の中の範囲を変換し、`sort_heap()` はソート済みシーケンスの中にある heap を turn する。

| | |
|------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`push_heap`](./algorithm/push_heap.md) | ヒープ化された範囲に要素を追加したヒープ範囲を得る |
| [`pop_heap`](./algorithm/pop_heap.md) | ヒープ化された範囲の先頭と末尾を入れ替え、ヒープ範囲を作り直す |
| [`make_heap`](./algorithm/make_heap.md) | 範囲をヒープ化する |
| [`sort_heap`](./algorithm/sort_heap.md) | ヒープ化された範囲を並べ替える |
| [`is_heap_until`](./algorithm/is_heap_until.md) | 範囲がヒープ化されているか判定し、ヒープ化されていない最初の要素を指すイテレータを取得する(C++11) |
| [`is_heap`](./algorithm/is_heap.md) | 範囲がヒープ化されているか判定する(C++11) |


###最小と最大

| | |
|---------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| [`min`](./algorithm/min.md) | 最小値を取得する |
| [`max`](./algorithm/max.md) | 最大値を取得する |
| [`minmax`](./algorithm/minmax.md) | 最小値と最大値を取得する(C++11) |
| [`min_element`](./algorithm/min_element.md) | 範囲内の最小要素へのイテレータを取得する |
| [`max_element`](./algorithm/max_element.md) | 範囲内の最大要素へのイテレータを取得する |
| [`minmax_element`](./algorithm/minmax_element.md) | 範囲内の最小要素と最大要素へのイテレータを取得する(C++11) |


###辞書式比較

| | |
|---------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------|
| [`lexicographical_compare`](./algorithm/lexicographical_compare.md) | 2つの範囲を辞書式順序で比較する |


###順列

| | |
|-------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| [`next_permutation`](./algorithm/next_permutation.md) | 次の順列を生成する |
| [`prev_permutation`](./algorithm/prev_permutation.md) | 前の順列を生成する |
| [`is_permutation`](./algorithm/is_permutation.md) | 範囲が順列かを判定する(C++11) |


