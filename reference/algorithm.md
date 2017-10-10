# algorithm
* algorithm[meta header]


全てのアルゴリズムはデータ構造の実装の詳細から切り離されていて、イテレータによってパラメータ化されている。これはアルゴリズムの要件を満たすイテレータを提供しているなら、どのようなデータ構造であっても動作するということを示している。

関数オブジェクトを使用するアルゴリズムでは、`for_each`以外、引数として渡されたオブジェクトを書き換えてはならない。

ここでは、各アルゴリズムのテンプレートパラメータ名を、型の要件を表すために使っている。アルゴリズムを正しく利用するためには、テンプレートパラメータ名に応じたこれらの要件を満たしている必要がある。以下の通りである。


| テンプレートパラメータ名 | 要件 |
|-------------------------------------------------------------------------|------------------------|
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


## シーケンスを変更しない操作

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------|--------------------------------------------|-------|
| [`all_of`](algorithm/all_of.md)               | 全ての要素が条件を満たしているかを調べる   | C++11 |
| [`any_of`](algorithm/any_of.md)               | どれかの要素が条件を満たしているかを調べる | C++11 |
| [`none_of`](algorithm/none_of.md)             | 全ての要素が条件を満たしていないかを調べる | C++11 |
| [`for_each`](algorithm/for_each.md)           | 全ての要素に対して処理を行う               | |
| [`find`](algorithm/find.md)                   | 指定された値を検索する                     | |
| [`find_if`](algorithm/find_if.md)             | 条件を満たす最初の要素を検索する           | |
| [`find_if_not`](algorithm/find_if_not.md)     | 条件を満たしていない最初の要素を検索する   | C++11 |
| [`find_end`](algorithm/find_end.md)           | 指定された最後のサブシーケンスを検索する   | |
| [`find_first_of`](algorithm/find_first_of.md) | ある集合の1つとマッチする最初の要素を検索する | |
| [`adjacent_find`](algorithm/adjacent_find.md) | 隣接する要素で条件を満たしている最初の要素を検索する | |
| [`count`](algorithm/count.md)                 | 指定された値である要素の数を数える | |
| [`count_if`](algorithm/count_if.md)           | 条件を満たしている要素の数を数える | |
| [`mismatch`](algorithm/mismatch.md)           | 2つの範囲が一致していない場所を検索する | |
| [`equal`](algorithm/equal.md)                 | 2つの範囲を等値比較する | |
| [`search`](algorithm/search.md)               | 指定された最初のサブシーケンスを検索する | |
| [`search_n`](algorithm/search_n.md)           | 指定された最初のサブシーケンスを検索する | |


## シーケンスを変更する操作

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------|------------------------------------------|-------|
| [`copy`](algorithm/copy.md)                       | 指定された範囲の要素をコピーする         | |
| [`copy_n`](algorithm/copy_n.md)                   | 指定された数の要素をコピーする           | C++11 |
| [`copy_if`](algorithm/copy_if.md)                 | 条件を満たす要素のみをコピーする         | C++11 |
| [`copy_backward`](algorithm/copy_backward.md)     | 指定された範囲の要素を後ろからコピーする | |
| [`move`](algorithm/move.md)                       | 指定された範囲の要素をムーブする         | C++11 |
| [`move_backward`](algorithm/move_backward.md)     | 指定された範囲の要素を後ろからムーブする | C++11 |
| [`swap_ranges`](algorithm/swap_ranges.md)         | 指定された2つの範囲同士を swap する      | |
| [`iter_swap`](algorithm/iter_swap.md)             | 2つのイテレータの要素を swap する        | |
| [`transform`](algorithm/transform.md)             | 全ての要素に関数を適用する               | |
| [`replace`](algorithm/replace.md)                 | 指定された値と一致する要素を指定された値に置き換える | |
| [`replace_if`](algorithm/replace_if.md)           | 条件を満たす要素を指定された値に置き換える | |
| [`replace_copy`](algorithm/replace_copy.md)       | 指定された値を一致する要素を指定された値に置き換え、その結果を出力の範囲へコピーする | |
| [`replace_copy_if`](algorithm/replace_copy_if.md) | 条件を満たす要素を指定された値に置き換え、その結果を出力の範囲へコピーする | |
| [`fill`](algorithm/fill.md)                       | 指定された値で出力の範囲に書き込む | |
| [`fill_n`](algorithm/fill_n.md)                   | 指定された値で出力の範囲に n 個書き込む | |
| [`generate`](algorithm/generate.md)               | 出力の範囲へ関数の結果を書き込む | |
| [`generate_n`](algorithm/generate_n.md)           | 出力の範囲へ関数の結果を n 個書き込む | |
| [`remove`](algorithm/remove.md)                   | 指定された要素を除ける | |
| [`remove_if`](algorithm/remove_if.md)             | 条件を満たす要素を除ける | |
| [`remove_copy`](algorithm/remove_copy.md)         | 指定された要素を除け、その結果を出力の範囲へコピーする | |
| [`remove_copy_if`](algorithm/remove_copy_if.md)   | 条件を満たす要素を除け、その結果を出力の範囲へコピーする | |
| [`unique`](algorithm/unique.md)                   | 重複した要素を除ける | |
| [`unique_copy`](algorithm/unique_copy.md)         | 重複した要素を除け、その結果を出力の範囲へコピーする | |
| [`reverse`](algorithm/reverse.md)                 | 要素の並びを逆にする | |
| [`reverse_copy`](algorithm/reverse_copy.md)       | 要素の並びを逆にし、その結果を出力の範囲へコピーする | |
| [`rotate`](algorithm/rotate.md)                   | 要素の並びを回転させる | |
| [`rotate_copy`](algorithm/rotate_copy.md)         | 要素の並びを回転させ、その結果を出力の範囲へコピーする | |
| [`random_shuffle`](algorithm/random_shuffle.md)   | それぞれの要素をランダムな位置に移動させる | C++14から非推奨</br> C++17で削除 |
| [`shuffle`](algorithm/shuffle.md)                 | それぞれの要素をランダムな位置に移動させる | C++11 |
| [`is_partitioned`](algorithm/is_partitioned.md)   | 与えられた範囲が条件によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されているか判定する | C++11 |
| [`partition`](algorithm/partition.md)             | 与えられた範囲を条件によって[区分化](/reference/algorithm.md#sequence-is-partitioned)する | |
| [`stable_partition`](algorithm/stable_partition.md) | 与えられた範囲を相対順序を保ちながら条件によって[区分化](/reference/algorithm.md#sequence-is-partitioned)する | |
| [`partition_copy`](algorithm/partition_copy.md)   | 与えられた範囲を条件によって 2 つの出力の範囲へ分けてコピーする | C++11 |
| [`partition_point`](algorithm/partition_point.md) | 与えられた範囲から条件によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されている位置を得る | C++11 |


## ソートや、それに関連した操作

ここで挙げる操作には全て２つのバージョンがある。一つは `Compare` 型の関数オブジェクトを取る関数、もう一つは `operator<` を使用する関数である。

`Compare` は関数オブジェクト型である。  
`Compare` 型のオブジェクトに適用した関数呼び出しの戻り値は、 `bool` へ文脈依存の変換をされたとき、第一引数が第二引数より小さい場合は `true` を、そうでない場合は `false` を返す。  
何らかの順序関係 (ordering relation) を前提とするアルゴリズム全般に対して `Compare` 型の `comp` を使用する。  
`comp` は間接参照したイテレータを通して非 `const` な関数を適用しないものとする。  

`Compare` を取るアルゴリズムには全て、代わりに `operator<` を使うバージョンもある。  
つまり、`comp(*i, *j) != false` はデフォルトで `*i < *j != false` である。  
<a name="strict-weak-ordering"></a>
[二分探索](#alg.binary.search)以外のアルゴリズムでは、`comp` は「狭義の弱順序 (strict weak ordering) 」を示さなければならない。  

ここでの用語「狭義 (strict) 」 は非反射関係 (irreflexive relation) (全ての `x` について `!comp(x,x)` である）の要求を示し、用語「弱 (weak) 」は全順序 (total ordering) ほど強くはないが半順序 (partial ordering) よりは強い要求を示す。`!comp(a, b) && !comp(b, a)` として `equiv(a, b)` を定義する場合、用語「弱」の要求は `comp` と `equiv` の両方が以下のように推移的関係 (transitive relations) となることである。  

- `comp(a, b) && comp(b, c)` は `comp(a, c)` を意味する
- `equiv(a, b) && equiv(b, c)` は `equiv(a, c)` を意味する

  これらの前提のもと、以下を示すことができる。

  - `equiv` は等価関係 (equivalence relation) である
  - `comp` は `equiv` によって決まる同値類の間での明確な関係を示す
  - その示される関係は狭義の全順序 (strict total ordering) である

<a name="sequence-is-sorted"></a>
あるシーケンスを指す任意のイテレータ `i` と、`i + n` がそのシーケンス上の要素を指す有効なイテレータであるような任意の非負整数 `n` について、`comp(*(i + n), *i) == false` であれば、そのシーケンスは比較関数 (comparator) `comp` によってソートされているという。  

<a name="sequence-is-partitioned"></a>
あるシーケンス `[start,finish)` があり、`0 <= i < (finish - start)` 内の全ての整数 `i` について、`i < n` の時かつその時に限り `f(*(start + i))` が `true` となるような整数 `n` が存在するなら、そのシーケンス `[start,finish)` は式 `f(e)` によって区分化されているという。  

- 「区分化されている」と「ソートされている」との関係  
  あるシーケンスが比較関数 `comp` でソートされている場合、そのシーケンスは `comp` に任意の検索キー `k` を部分適用した式 `comp(e, k)` や `!comp(k, e)` などにより区分化されているともいえる。  
  例えば、ソートされた整数列 `[1, 5, 13, 17, 25]` は「 `10` より小さい」によって区分化されている。さらに、そのほかの任意の数値についても「～より小さい」あるいは「～より小さくない（～以上）」などによって区分化されているといえる。  
  C++03 までの二分探索アルゴリズムは比較関数が狭義の弱順序となることおよび対象シーケンスがその比較関数でソートされていることを要求していた。しかしその後、 C++11 で異なる型のキーによる検索を明示的に許すために制限が見直された結果、比較関数そのものに対する要求はなくなり、比較関数に検索キーを部分適用した式による区分化のみに要求が緩められた。（参照: [LWG issue 270 "Binary search requirements overly strict"](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#270) ）  
  これにより、例えばソートされていない整数列 `[5, 1, 25, 13, 17]` に対しても `10` をキーとして [`lower_bound()`](algorithm/lower_bound.md) を用いることにより `10` より小さい範囲の境界を取り出すことが可能になっている。しかし `15` をキーとすることは不正である。  
  ただ、 C++03 の要件に合わない（特にソートされていない範囲に対する）二分探索を行いたい場合は、同じく C++11 で追加された [`partition_point()`](algorithm/partition_point.md) の使用も検討したほうがよい。  

順序関係を扱う関数の説明において、この節では安定性 (stability) のようなコンセプトを説明するために等価性 (equivalence) の概念を頻繁に使う。  
この節で参照する等価性は必ずしも `operator==` ではなく、[狭義の弱順序](/reference/algorithm.md#strict-weak-ordering)によって示される等価関係である。つまりそれは、２つの要素 `a` と `b` は `!(a < b) && !(b < a)` の時かつその時に限り等価とみなされるということである。  


### ソート

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------|---------------------------------------|-------|
| [`sort`](algorithm/sort.md)                           | 範囲を並べ替える | |
| [`stable_sort`](algorithm/stable_sort.md)             | 範囲を安定ソートで並べ替える | |
| [`partial_sort`](algorithm/partial_sort.md)           | 範囲を部分的にソートし、先頭N個を並んだ状態にする | |
| [`partial_sort_copy`](algorithm/partial_sort_copy.md) | 範囲を部分的にソートした結果を他の範囲にコピーする | |
| [`is_sorted`](algorithm/is_sorted.md)                 | ソート済みか判定する | C++11 |
| [`is_sorted_until`](algorithm/is_sorted_until.md)     | ソート済みか判定し、ソートされていない位置のイテレータを取得する | C++11 |


### N 番目の要素

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|----------------------------------------------------------|-------|
| [`nth_element`](algorithm/nth_element.md) | 基準となる要素よりも小さい要素が、前に来るよう並べ替える | |


### <a name="alg.binary.search"></a>二分探索

これらのアルゴリズムは全て二分探索を行う。これらは探索されるシーケンスが検索キーを比較関数（暗黙の `operator <` 、または明示的に渡された `Compare comp` ）の引数として部分適用することで得られる式によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されていると仮定している。  
これらはランダムアクセスイテレータでない場合でも最小の比較回数で動作する。  
これらのアルゴリズムに渡されたイテレータがランダムアクセスイテレータである場合、データ構造を渡るときに対数のステップ数で済むため、このイテレータが適している。ランダムアクセスイテレータでない場合は線形のステップ数になる。

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|----------------------------------------------------------------|-------|
| [`lower_bound`](algorithm/lower_bound.md) | 指定された要素以上の値が現れる最初の位置のイテレータを取得する | |
| [`upper_bound`](algorithm/upper_bound.md) | 指定された要素より大きい値が現れる最も後ろの位置のイテレータを取得する | |
| [`equal_range`](algorithm/equal_range.md) | `lower_bound`と`upper_bound`の結果を組で取得する | |
| [`binary_search`](algorithm/binary_search.md) | 二分探索法による検索を行う | |


### マージ

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------|---------------------------------|-------|
| [`merge`](algorithm/merge.md)                 | 2つのソート済み範囲をマージする | |
| [`inplace_merge`](algorithm/inplace_merge.md) | 2つの連続したソート済み範囲をマージする | |


### ソート済み構造に対する集合演算

このセクションでは基本的なソート済み構造に対する集合演算を定義する。  
これらの演算は、等価な要素を複数格納できる `multiset` であっても動作する。集合演算のセマンティクスは、等価な要素が複数あっても、一般化された標準的な方法で演算できるようになっている。  
例えば [`set_union()`](algorithm/set_union.md) ならそれぞれの要素の最大数を格納する、[`set_intersection()`](algorithm/set_intersection.md) なら最小数を格納するといったようになる。

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------|-----------------------------------|-------|
| [`set_union`](algorithm/set_union.md)               | 2つのソート済み範囲の和集合を得る | |
| [`set_intersection`](algorithm/set_intersection.md) | 2つのソート済み範囲の積集合を得る | |
| [`set_difference`](algorithm/set_difference.md)     | 2つのソート済み範囲の差集合を得る | |
| [`set_symmetric_difference`](algorithm/set_symmetric_difference.md) | 2つのソート済み範囲の互いに素な集合を得る | |
| [`includes`](algorithm/includes.md) | 2つのソート済み範囲において、一方の範囲の要素がもう一方の範囲に全て含まれているかを判定する | |


### ヒープ

２つのランダムアクセスイテレータ `[a,b)` の範囲を特定の構造で構築したものをヒープ(heap)と呼ぶ。ヒープには２つの特性がある。

- `*a` より大きい要素は無い
- `*a` は、`pop_heap()` で削除したり、`push_heap()` で要素を追加する操作が O(log(N)) でできる

これらの特性はプライオリティキューで有用である。  
`make_heap()` は heap の中の範囲を変換し、`sort_heap()` はソート済みシーケンスの中にあるヒープを turn する。

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------|-----------------------------------|-------|
| [`push_heap`](algorithm/push_heap.md)         | ヒープ化された範囲に要素を追加したヒープ範囲を得る | |
| [`pop_heap`](algorithm/pop_heap.md)           | ヒープ化された範囲の先頭と末尾を入れ替え、ヒープ範囲を作り直す | |
| [`make_heap`](algorithm/make_heap.md)         | 範囲をヒープ化する | |
| [`sort_heap`](algorithm/sort_heap.md)         | ヒープ化された範囲を並べ替える | |
| [`is_heap_until`](algorithm/is_heap_until.md) | 範囲がヒープ化されているか判定し、ヒープ化されていない最初の要素を指すイテレータを取得する | C++11 |
| [`is_heap`](algorithm/is_heap.md)             | 範囲がヒープ化されているか判定する | C++11 |


### 最小と最大

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------|-----------------------------------|-------|
| [`min`](algorithm/min.md)                       | 最小値を取得する | |
| [`max`](algorithm/max.md)                       | 最大値を取得する | |
| [`minmax`](algorithm/minmax.md)                 | 最小値と最大値を取得する | C++11 |
| [`min_element`](algorithm/min_element.md)       | 範囲内の最小要素へのイテレータを取得する | |
| [`max_element`](algorithm/max_element.md)       | 範囲内の最大要素へのイテレータを取得する | |
| [`minmax_element`](algorithm/minmax_element.md) | 範囲内の最小要素と最大要素へのイテレータを取得する | C++11 |


### 辞書式比較

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------------|---------------------------------|-------|
| [`lexicographical_compare`](algorithm/lexicographical_compare.md) | 2つの範囲を辞書式順序で比較する | |


### 順列

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------|------------------------|-------|
| [`next_permutation`](algorithm/next_permutation.md) | 次の順列を生成する     | |
| [`prev_permutation`](algorithm/prev_permutation.md) | 前の順列を生成する     | |
| [`is_permutation`](algorithm/is_permutation.md)     | 範囲が順列かを判定する | C++11 |


## 関連項目
- [`<numeric>`](/reference/numeric.md)
    - 数値計算のアルゴリズム

