# algorithm
* algorithm[meta header]


全てのアルゴリズムはデータ構造の実装の詳細から切り離されていて、イテレータによってパラメータ化されている。これはアルゴリズムの要件を満たすイテレータを提供しているなら、どのようなデータ構造であっても動作するということを示している。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<initializer_list>`](initializer_list.md) (C++11)


### テンプレートパラメータ名とイテレータ要件

`<algorithm>`ヘッダでは、各アルゴリズムのテンプレートパラメータ名を、型の要件を表すために使っている。アルゴリズムを正しく利用するためには、テンプレートパラメータ名に応じたこれらの要件を満たしている必要がある。以下の通りである。

| テンプレートパラメータ名 | 要件 |
|-------------------------------------------------------------------------|------------------------|
| InputIterator<br/> InputIterator1<br/> InputIterator2 | input iterator |
| OutputIterator<br/> OutputIterator1<br/> OutputIterator2 | output iterator |
| ForwardIterator<br/> ForwardIterator1<br/> ForwardIterator2 | forward iterator |
| BidirectionalIterator<br/> BidirectionalIterator1<br/> BidirectionalIterator2 | bidirectional iterator |
| RandomAccessIterator<br/> RandomAccessIterator1<br/> RandomAccessIterator2 | random-access iterator |

もし「効果」のセクションで、イテレータの値を書き換えるという旨の文章が書かれている場合、その引数の型は mutable iterator の要件を満たしていなければならないという追加の要件がある。
もちろん、output iterator は常に書き換え可能であるため、この追加の要件は無意味である。

テンプレートパラメータ名が `Predicate` となっている場合、`Predicate` の値 `pred` と、引数として渡すイテレータ `i` について以下の要件を満たす必要がある

- `pred(*i)` が `bool` として評価できなければならない。
- `pred(*i)` 内で `*i` を書き変えてはならない。

テンプレートパラメータ名が `BinaryPredicate` となっている場合、`BinaryPredicate` の値 `binary_pred` と、引数として渡すイテレータ `i1`, `i2` について以下の要件を満たす必要がある

- `binary_pred(*i1, *i2)` が `bool` として評価できなければならない。
- `binary_pred(*i1, *i2)` 内で `*i1` や `*i2` を書き変えてはならない。

### 要素の書き換え操作
関数オブジェクトを使用するアルゴリズムでは、`for_each`と`for_each_n`以外、プログラム定義の関数に引数として渡された要素を書き換えてはならない。

### 関数オブジェクトの取り扱い
関数オブジェクトを引数に取る `for_each`, `for_each_n` 以外のアルゴリズムは、内部処理においてその関数オブジェクトをコピーする可能性がある。

そのため、アルゴリズムの利用者はそのことに注意する必要がある。コピーされてしまうことが問題である場合、`reference_wrapper<T>` や同様の解決手段を使ってオブジェクトの中身をコピーしないようなラッパークラスを使うといった対策を行う必要がある。

### `_copy`サフィックス付きアルゴリズム
いくつかのアルゴリズムは `_copy` というサフィックスが付いている。これは `_copy` サフィックスの付いていないアルゴリズムと違い、処理の結果を別のイテレータへ出力するアルゴリズムである。

コピーバージョンを含めるかどうかの判断は、通常バージョンの計算量を考慮する。操作を行うコストがコピーのコストを大きく上回る場合、コピーバージョンは含めないようになっている。例えば `sort_copy` は存在しない。なぜなら、ソートのコストは大きいし、そのような場合、ユーザは `copy` してから `sort` するからだ。

### イテレータ操作に関する補足
アルゴリズムの説明で `+` や `-` を使っているが、random-access iterator 以外のイテレータはそれを定義していない。そういった場合、 `a+n` というのは

```cpp
X tmp = a;
advance(tmp, n);
return tmp;
```
* advance[link /reference/iterator/advance.md]

を意味する。また、`b-a` は

```cpp
return distance(a, b);
```
* distance[link /reference/iterator/distance.md]

を意味する。

### 射影とRangeサポート（C++20）
C++20ではアルゴリズム関数の新しいバージョンが`std::ranges`名前空間に追加された。従来の関数と比べて以下の点が異なる：

* テンプレート引数がコンセプトによって制約される
* イテレータの組に加えて、範囲(Range)も直接渡せる
* 射影(Projection)をサポートする
* [ADLで発見されない](/article/lib/disable_adl_function.md)

新しいアルゴリズム関数には範囲(Range)を直接渡すことができる。

```cpp
// 従来のアルゴリズム関数
sort(v.begin(), v.end());
// C++20以降の新しいアルゴリズム関数: Rangeを直接渡せる
ranges::sort(v);
// イテレータ対も渡せる
ranges::sort(v.begin(), v.end());
```
* sort[link algorithm/sort.md]
* ranges::sort[link algorithm/ranges_sort.md]

射影は、述語とは別に渡すことができる関数オブジェクトで、特定のメンバだけを対象にアルゴリズムを実行するために用いる。

例えば、クラス型の配列のソートでは、特定のメンバによってソートしたいことはよくある。しかし、従来のアルゴリズム関数では特定のメンバで比較を行う述語を用意しなければならなかった。

```cpp
struct Person {
  string name;
  int age = 0;
};

vector<Person> pv = { … };

sort(pv.begin(), pv.end(), [](auto&& a, auto&& b){ return a.name < b.name; });
```
* sort[link algorithm/sort.md]

これは、述語がメンバの選択と比較という2つの仕事をしてしまっている点でよくない。この責務を分割し、メンバの選択だけを行うようにしたものが射影である。

```cpp
// デフォルトの述語(ranges::less{})で、nameでソート
ranges::sort(pv, {}, [](auto&& a){ return a.name; });
// std::invokeで呼び出されるため、メンバ変数ポインタでもよい
ranges::sort(pv, {}, &Parson::name);
```
* ranges::sort[link algorithm/ranges_sort.md]
* ranges::less[link /reference/functional/ranges_less.md]
* std::invoke[link /reference/functional/invoke.md]

なお、各関数の説明においては、射影の影響は無視していることがある。


## シーケンスを変更しない操作

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------|--------------------------------------------|-------|
| [`all_of`](algorithm/all_of.md)               | 全ての要素が条件を満たしているかを調べる   | C++11 |
| [`any_of`](algorithm/any_of.md)               | どれかの要素が条件を満たしているかを調べる | C++11 |
| [`none_of`](algorithm/none_of.md)             | 全ての要素が条件を満たしていないかを調べる | C++11 |
| [`for_each`](algorithm/for_each.md)           | 全ての要素に対して処理を行う               | |
| [`for_each_n`](algorithm/for_each_n.md)       | 範囲の先頭N個の要素に対して処理を行う      | C++17 |
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
| [`ranges::all_of`](algorithm/ranges_all_of.md)               | 全ての要素が条件を満たしているかを調べる             | C++20 |
| [`ranges::any_of`](algorithm/ranges_any_of.md)               | どれかの要素が条件を満たしているかを調べる           | C++20 |
| [`ranges::none_of`](algorithm/ranges_none_of.md)             | 全ての要素が条件を満たしていないかを調べる           | C++20 |
| [`ranges::for_each`](algorithm/ranges_for_each.md)           | 全ての要素に対して処理を行う                         | C++20 |
| [`ranges::for_each_n`](algorithm/ranges_for_each_n.md)       | 範囲の先頭N個の要素に対して処理を行う                | C++20 |
| [`ranges::find`](algorithm/ranges_find.md)                   | 指定された値を検索する                               | C++20 |
| [`ranges::find_if`](algorithm/ranges_find_if.md)             | 条件を満たす最初の要素を検索する                     | C++20 |
| [`ranges::find_if_not`](algorithm/ranges_find_if_not.md)     | 条件を満たしていない最初の要素を検索する             | C++20 |
| [`ranges::find_end`](algorithm/ranges_find_end.md)           | 指定された最後のサブシーケンスを検索する             | C++20 |
| [`ranges::find_first_of`](algorithm/ranges_find_first_of.md) | ある集合の1つとマッチする最初の要素を検索する        | C++20 |
| [`ranges::adjacent_find`](algorithm/ranges_adjacent_find.md) | 隣接する要素で条件を満たしている最初の要素を検索する | C++20 |
| [`ranges::count`](algorithm/ranges_count.md)                 | 指定された値である要素の数を数える                   | C++20 |
| [`ranges::count_if`](algorithm/ranges_count_if.md)           | 条件を満たしている要素の数を数える                   | C++20 |
| [`ranges::mismatch`](algorithm/ranges_mismatch.md)           | 2つの範囲が一致していない場所を検索する              | C++20 |
| [`ranges::equal`](algorithm/ranges_equal.md)                 | 2つの範囲を等値比較する                              | C++20 |
| [`ranges::search`](algorithm/ranges_search.md)               | 指定された最初のサブシーケンスを検索する             | C++20 |
| [`ranges::search_n`](algorithm/ranges_search_n.md)           | 指定された最初のサブシーケンスを検索する             | C++20 |
| [`ranges::starts_with`](algorithm/ranges_starts_with.md)     | 先頭が指定されたシーケンスと一致するかを調べる       | C++23 |
| [`ranges::ends_with`](algorithm/ranges_ends_with.md)         | 末尾が指定されたシーケンスと一致するかを調べる       | C++23 |

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
| [`shift_left`](algorithm/shift_left.md)           | 要素を左にシフトさせる | C++20 |
| [`shift_right`](algorithm/shift_right.md)         | 要素を右にシフトさせる | C++20 |
| [`sample`](algorithm/sample.md)                   | 範囲から指定された個数の要素をランダムに抽出する | C++17 |
| [`random_shuffle`](algorithm/random_shuffle.md)   | それぞれの要素をランダムな位置に移動させる | C++14から非推奨<br/> C++17で削除 |
| [`shuffle`](algorithm/shuffle.md)                 | それぞれの要素をランダムな位置に移動させる | C++11 |
| [`is_partitioned`](algorithm/is_partitioned.md)   | 与えられた範囲が条件によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されているか判定する | C++11 |
| [`partition`](algorithm/partition.md)             | 与えられた範囲を条件によって[区分化](/reference/algorithm.md#sequence-is-partitioned)する | |
| [`stable_partition`](algorithm/stable_partition.md) | 与えられた範囲を相対順序を保ちながら条件によって[区分化](/reference/algorithm.md#sequence-is-partitioned)する | |
| [`partition_copy`](algorithm/partition_copy.md)   | 与えられた範囲を条件によって 2 つの出力の範囲へ分けてコピーする | C++11 |
| [`partition_point`](algorithm/partition_point.md) | 与えられた範囲から条件によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されている位置を得る | C++11 |
| [`ranges::copy`](algorithm/ranges_copy.md)                         | 指定された範囲の要素をコピーする                                                                                | C++20 |
| [`ranges::copy_n`](algorithm/ranges_copy_n.md)                     | 指定された数の要素をコピーする                                                                                  | C++20 |
| [`ranges::copy_if`](algorithm/ranges_copy_if.md)                   | 条件を満たす要素のみをコピーする                                                                                | C++20 |
| [`ranges::copy_backward`](algorithm/ranges_copy_backward.md)       | 指定された範囲の要素を後ろからコピーする                                                                        | C++20 |
| [`ranges::move`](algorithm/ranges_move.md)                         | 指定された範囲の要素をムーブする                                                                                | C++20 |
| [`ranges::move_backward`](algorithm/ranges_move_backward.md)       | 指定された範囲の要素を後ろからムーブする                                                                        | C++20 |
| [`ranges::swap_ranges`](algorithm/ranges_swap_ranges.md)           | 指定された2つの範囲同士を swap する                                                                             | C++20 |
| [`ranges::transform`](algorithm/ranges_transform.md)               | 全ての要素に関数を適用する                                                                                      | C++20 |
| [`ranges::replace`](algorithm/ranges_replace.md)                   | 指定された値と一致する要素を指定された値に置き換える                                                            | C++20 |
| [`ranges::replace_if`](algorithm/ranges_replace_if.md)             | 条件を満たす要素を指定された値に置き換える                                                                      | C++20 |
| [`ranges::replace_copy`](algorithm/ranges_replace_copy.md)         | 指定された値を一致する要素を指定された値に置き換え、その結果を出力の範囲へコピーする                            | C++20 |
| [`ranges::replace_copy_if`](algorithm/ranges_replace_copy_if.md)   | 条件を満たす要素を指定された値に置き換え、その結果を出力の範囲へコピーする                                      | C++20 |
| [`ranges::fill`](algorithm/ranges_fill.md)                         | 指定された値で出力の範囲に書き込む                                                                              | C++20 |
| [`ranges::fill_n`](algorithm/ranges_fill_n.md)                     | 指定された値で出力の範囲に n 個書き込む                                                                         | C++20 |
| [`ranges::generate`](algorithm/ranges_generate.md)                 | 出力の範囲へ関数の結果を書き込む                                                                                | C++20 |
| [`ranges::generate_n`](algorithm/ranges_generate_n.md)             | 出力の範囲へ関数の結果を n 個書き込む                                                                           | C++20 |
| [`ranges::remove`](algorithm/ranges_remove.md)                     | 指定された要素を除ける                                                                                          | C++20 |
| [`ranges::remove_if`](algorithm/ranges_remove_if.md)               | 条件を満たす要素を除ける                                                                                        | C++20 |
| [`ranges::remove_copy`](algorithm/ranges_remove_copy.md)           | 指定された要素を除け、その結果を出力の範囲へコピーする                                                          | C++20 |
| [`ranges::remove_copy_if`](algorithm/ranges_remove_copy_if.md)     | 条件を満たす要素を除け、その結果を出力の範囲へコピーする                                                        | C++20 |
| [`ranges::unique`](algorithm/ranges_unique.md)                     | 重複した要素を除ける                                                                                            | C++20 |
| [`ranges::unique_copy`](algorithm/ranges_unique_copy.md)           | 重複した要素を除け、その結果を出力の範囲へコピーする                                                            | C++20 |
| [`ranges::reverse`](algorithm/ranges_reverse.md)                   | 要素の並びを逆にする                                                                                            | C++20 |
| [`ranges::reverse_copy`](algorithm/ranges_reverse_copy.md)         | 要素の並びを逆にし、その結果を出力の範囲へコピーする                                                            | C++20 |
| [`ranges::rotate`](algorithm/ranges_rotate.md)                     | 要素の並びを回転させる                                                                                          | C++20 |
| [`ranges::rotate_copy`](algorithm/ranges_rotate_copy.md)           | 要素の並びを回転させ、その結果を出力の範囲へコピーする                                                          | C++20 |
| [`ranges::shift_left`](algorithm/ranges_shift_left.md)             | 要素を左にシフトさせる                                                                                          | C++23 |
| [`ranges::shift_right`](algorithm/ranges_shift_right.md)           | 要素を右にシフトさせる                                                                                          | C++23 |
| [`ranges::sample`](algorithm/ranges_sample.md)                     | 範囲から指定された個数の要素をランダムに抽出する                                                                | C++20 |
| [`ranges::shuffle`](algorithm/ranges_shuffle.md)                   | それぞれの要素をランダムな位置に移動させる                                                                      | C++20 |
| [`ranges::is_partitioned`](algorithm/ranges_is_partitioned.md)     | 与えられた範囲が条件によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されているか判定する       | C++20 |
| [`ranges::partition`](algorithm/ranges_partition.md)               | 与えられた範囲を条件によって[区分化](/reference/algorithm.md#sequence-is-partitioned)する                       | C++20 |
| [`ranges::stable_partition`](algorithm/ranges_stable_partition.md) | 与えられた範囲を相対順序を保ちながら条件によって[区分化](/reference/algorithm.md#sequence-is-partitioned)する   | C++20 |
| [`ranges::partition_copy`](algorithm/ranges_partition_copy.md)     | 与えられた範囲を条件によって 2 つの出力の範囲へ分けてコピーする                                                 | C++20 |
| [`ranges::partition_point`](algorithm/ranges_partition_point.md)   | 与えられた範囲から条件によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されている位置を得る     | C++20 |

## ソートや、それに関連した操作

ここで挙げる操作には全て２つのバージョンがある。一つは `Compare` 型の関数オブジェクトを取る関数、もう一つは `operator<` を使用する関数である。

`Compare` は関数オブジェクト型である。  
`Compare` 型のオブジェクトに適用した関数呼び出しの戻り値は、 `bool` へ文脈依存の変換をされたとき、第一引数が第二引数より小さい場合は `true` を、そうでない場合は `false` を返す。  
何らかの順序関係 (ordering relation) を前提とするアルゴリズム全般に対して `Compare` 型の `comp` を使用する。  
`comp` は間接参照したイテレータを通して非 `const` な関数を適用しないものとする。  

`Compare` を取るアルゴリズムには全て、代わりに `operator<` を使うバージョンもある。  
つまり、`comp(*i, *j) != false` はデフォルトで `*i < *j != false` である。  
<a id="strict-weak-ordering"></a>
[二分探索](#alg.binary.search)以外のアルゴリズムでは、`comp` は「狭義の弱順序 (strict weak ordering) 」を示さなければならない。  

ここでの用語「狭義 (strict) 」 は非反射関係 (irreflexive relation) (全ての `x` について `!comp(x,x)` である）の要求を示し、用語「弱 (weak) 」は全順序 (total ordering) ほど強くはないが半順序 (partial ordering) よりは強い要求を示す。`!comp(a, b) && !comp(b, a)` として `equiv(a, b)` を定義する場合、用語「弱」の要求は `comp` と `equiv` の両方が以下のように推移的関係 (transitive relations) となることである。  

- `comp(a, b) && comp(b, c)` は `comp(a, c)` を意味する
- `equiv(a, b) && equiv(b, c)` は `equiv(a, c)` を意味する

  これらの前提のもと、以下を示すことができる。

  - `equiv` は同値関係 (equivalence relation) である
  - `comp` は `equiv` によって決まる同値類 (equivalence class) の間での明確な関係を示す
  - その示される関係は狭義の全順序 (strict total ordering) である

数学用語の日本語訳として "equivalence relation" には「同値関係」 "equivalence class" には「同値類」が定着しており、同じく数学的な文脈では上記 `equiv` を満たす２つの値を「同値」 (equivalent) であると言う。しかし特に数学的でない文脈で「同値」と言った場合は `operator==` による "equal" の関係と誤解される可能性が高いと考えられるため、本サイトでは上記 `equiv` による "equivalent" の関係を「等価」 `operator==` による "equal" の関係を「等値」として区別する。

<a id="sequence-is-sorted"></a>
あるシーケンスを指す任意のイテレータ `i` と、`i + n` がそのシーケンス上の要素を指す有効なイテレータであるような任意の非負整数 `n` について、`comp(*(i + n), *i) == false` であれば、そのシーケンスは比較関数 (comparator) `comp` によってソートされているという。  

<a id="sequence-is-partitioned"></a>
あるシーケンス `[start,finish)` があり、`0 <= i < (finish - start)` 内の全ての整数 `i` について、`i < n` の時かつその時に限り `f(*(start + i))` が `true` となるような整数 `n` が存在するなら、そのシーケンス `[start,finish)` は式 `f(e)` によって区分化されているという。  

- 「区分化されている」と「ソートされている」との関係  
  あるシーケンスが比較関数 `comp` でソートされている場合、そのシーケンスは `comp` に任意の検索キー `k` を部分適用した式 `comp(e, k)` や `!comp(k, e)` などにより区分化されているともいえる。  
  例えば、ソートされた整数列 `[1, 5, 13, 17, 25]` は「 `10` より小さい」によって区分化されている。さらに、そのほかの任意の数値についても「～より小さい」あるいは「～より小さくない（～以上）」などによって区分化されているといえる。  
  C++03 までの二分探索アルゴリズムは比較関数が狭義の弱順序となることおよび対象シーケンスがその比較関数でソートされていることを要求していた。しかしその後、 C++11 で異なる型のキーによる検索を明示的に許すために制限が見直された結果、比較関数そのものに対する要求はなくなり、比較関数に検索キーを部分適用した式による区分化のみに要求が緩められた。（参照: [LWG issue 270 "Binary search requirements overly strict"](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#270) ）  
  これにより、例えばソートされていない整数列 `[5, 1, 25, 13, 17]` に対しても `10` をキーとして [`lower_bound()`](algorithm/lower_bound.md) を用いることにより `10` より小さい範囲の境界を取り出すことが可能になっている。しかし `15` をキーとすることは不正である。  
  ただ、 C++03 の要件に合わない（特にソートされていない範囲に対する）二分探索を行いたい場合は、同じく C++11 で追加された [`partition_point()`](algorithm/partition_point.md) の使用も検討したほうがよい。  

順序関係を扱う関数の説明において、この節では安定性 (stability) のような考え方を説明するために同値性 (equivalence) の概念を頻繁に使う。
この節で参照する同値性は必ずしも `operator==` ではなく、[狭義の弱順序](/reference/algorithm.md#strict-weak-ordering)によって示される同値関係である。つまりそれは、２つの要素 `a` と `b` は `!(a < b) && !(b < a)` の時かつその時に限り同値とみなされるということである。  


### ソート

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------|---------------------------------------|-------|
| [`sort`](algorithm/sort.md)                           | 範囲を並べ替える | |
| [`stable_sort`](algorithm/stable_sort.md)             | 範囲を安定ソートで並べ替える | |
| [`partial_sort`](algorithm/partial_sort.md)           | 範囲を部分的にソートし、先頭N個を並んだ状態にする | |
| [`partial_sort_copy`](algorithm/partial_sort_copy.md) | 範囲を部分的にソートした結果を他の範囲にコピーする | |
| [`is_sorted`](algorithm/is_sorted.md)                 | ソート済みか判定する | C++11 |
| [`is_sorted_until`](algorithm/is_sorted_until.md)     | ソート済みか判定し、ソートされていない位置のイテレータを取得する | C++11 |
| [`ranges::sort`](algorithm/ranges_sort.md)                           | 範囲を並べ替える                                                 | C++20 |
| [`ranges::stable_sort`](algorithm/ranges_stable_sort.md)             | 範囲を安定ソートで並べ替える                                     | C++20 |
| [`ranges::partial_sort`](algorithm/ranges_partial_sort.md)           | 範囲を部分的にソートし、先頭N個を並んだ状態にする                | C++20 |
| [`ranges::partial_sort_copy`](algorithm/ranges_partial_sort_copy.md) | 範囲を部分的にソートした結果を他の範囲にコピーする               | C++20 |
| [`ranges::is_sorted`](algorithm/ranges_is_sorted.md)                 | ソート済みか判定する                                             | C++20 |
| [`ranges::is_sorted_until`](algorithm/ranges_is_sorted_until.md)     | ソート済みか判定し、ソートされていない位置のイテレータを取得する | C++20 |

### N 番目の要素

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|----------------------------------------------------------|-------|
| [`nth_element`](algorithm/nth_element.md) | 基準となる要素よりも小さい要素が、前に来るよう並べ替える | |
| [`ranges::nth_element`](algorithm/ranges_nth_element.md) | 基準となる要素よりも小さい要素が、前に来るよう並べ替える | C++20 |


### <a id="alg.binary.search"></a>二分探索

これらのアルゴリズムは全て二分探索を行う。これらは探索されるシーケンスが検索キーを比較関数（暗黙の `operator <` 、または明示的に渡された `Compare comp` ）の引数として部分適用することで得られる式によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されていると仮定している。  
これらはランダムアクセスイテレータでない場合でも最小の比較回数で動作する。  
これらのアルゴリズムに渡されたイテレータがランダムアクセスイテレータである場合、データ構造を渡るときに対数のステップ数で済むため、このイテレータが適している。ランダムアクセスイテレータでない場合は線形のステップ数になる。

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|----------------------------------------------------------------|-------|
| [`lower_bound`](algorithm/lower_bound.md) | 指定された要素以上の値が現れる最初の位置のイテレータを取得する | |
| [`upper_bound`](algorithm/upper_bound.md) | 指定された要素より大きい値が現れる最初の位置のイテレータを取得する | |
| [`equal_range`](algorithm/equal_range.md) | `lower_bound`と`upper_bound`の結果を組で取得する | |
| [`binary_search`](algorithm/binary_search.md) | 二分探索法による検索を行う | |
| [`ranges::lower_bound`](algorithm/ranges_lower_bound.md)     | 指定された要素以上の値が現れる最初の位置のイテレータを取得する     | C++20 |
| [`ranges::upper_bound`](algorithm/ranges_upper_bound.md)     | 指定された要素より大きい値が現れる最初の位置のイテレータを取得する | C++20 |
| [`ranges::equal_range`](algorithm/ranges_equal_range.md)     | 指定した値と等しい範囲を取得する                                   | C++20 |
| [`ranges::binary_search`](algorithm/ranges_binary_search.md) | 二分探索法による検索を行う                                         | C++20 |


### マージ

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------|---------------------------------|-------|
| [`merge`](algorithm/merge.md)                 | 2つのソート済み範囲をマージする | |
| [`inplace_merge`](algorithm/inplace_merge.md) | 2つの連続したソート済み範囲をマージする | |
| [`ranges::merge`](algorithm/ranges_merge.md)                 | 2つのソート済み範囲をマージする         | C++20 |
| [`ranges::inplace_merge`](algorithm/ranges_inplace_merge.md) | 2つの連続したソート済み範囲をマージする | C++20 |

### ソート済み構造に対する集合演算

このセクションでは基本的なソート済み構造に対する集合演算を定義する。  
これらの演算は、等価なキーの要素を複数格納できる `multiset` であっても動作する。集合演算のセマンティクスは、等価なキーの要素が複数あっても、一般化された標準的な方法で演算できるようになっている。  
例えば [`set_union()`](algorithm/set_union.md) ならそれぞれの要素の最大数を格納する、[`set_intersection()`](algorithm/set_intersection.md) なら最小数を格納するといったようになる。

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------|-----------------------------------|-------|
| [`set_union`](algorithm/set_union.md)               | 2つのソート済み範囲の和集合を得る | |
| [`set_intersection`](algorithm/set_intersection.md) | 2つのソート済み範囲の積集合を得る | |
| [`set_difference`](algorithm/set_difference.md)     | 2つのソート済み範囲の差集合を得る | |
| [`set_symmetric_difference`](algorithm/set_symmetric_difference.md) | 2つのソート済み範囲の対称差集合を得る | |
| [`includes`](algorithm/includes.md) | 2つのソート済み範囲において、一方の範囲の要素がもう一方の範囲に全て含まれているかを判定する | |
| [`ranges::set_union`](algorithm/ranges_set_union.md)                               | 2つのソート済み範囲の和集合を得る                                                           | C++20 |
| [`ranges::set_intersection`](algorithm/ranges_set_intersection.md)                 | 2つのソート済み範囲の積集合を得る                                                           | C++20 |
| [`ranges::set_difference`](algorithm/ranges_set_difference.md)                     | 2つのソート済み範囲の差集合を得る                                                           | C++20 |
| [`ranges::set_symmetric_difference`](algorithm/ranges_set_symmetric_difference.md) | 2つのソート済み範囲の対称差集合を得る                                                       | C++20 |
| [`ranges::includes`](algorithm/ranges_includes.md)                                 | 2つのソート済み範囲において、一方の範囲の要素がもう一方の範囲に全て含まれているかを判定する | C++20 |

### ヒープ

２つのランダムアクセスイテレータ `[a,b)` の範囲を特定の構造で構築したものをヒープ(heap)と呼ぶ。ヒープには２つの特性がある。

- `*a` より大きい要素は無い
- `*a` は、`pop_heap()` で削除したり、`push_heap()` で要素を追加する操作が O(log(N)) でできる

これらの特性はプライオリティキューで有用である。  
`make_heap()` は heap の中の範囲を変換し、`sort_heap()` はソート済みシーケンスの中にあるヒープを turn する。

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------|-----------------------------------|-------|
| [`push_heap`](algorithm/push_heap.md)         | ヒープ化された範囲に要素を追加する | |
| [`pop_heap`](algorithm/pop_heap.md)           | ヒープ化された範囲の先頭と末尾を入れ替え、ヒープ範囲を作り直す | |
| [`make_heap`](algorithm/make_heap.md)         | 範囲をヒープ化する | |
| [`sort_heap`](algorithm/sort_heap.md)         | ヒープ化された範囲を並べ替える | |
| [`is_heap_until`](algorithm/is_heap_until.md) | 範囲がヒープ化されているか判定し、ヒープ化されていない最初の要素を指すイテレータを取得する | C++11 |
| [`is_heap`](algorithm/is_heap.md)             | 範囲がヒープ化されているか判定する | C++11 |
| [`ranges::push_heap`](algorithm/ranges_push_heap.md)         | ヒープ化された範囲に要素を追加する                                         | C++20 |
| [`ranges::pop_heap`](algorithm/ranges_pop_heap.md)           | ヒープ化された範囲の先頭と末尾を入れ替え、ヒープ範囲を作り直す                             | C++20 |
| [`ranges::make_heap`](algorithm/ranges_make_heap.md)         | 範囲をヒープ化する                                                                         | C++20 |
| [`ranges::sort_heap`](algorithm/ranges_sort_heap.md)         | ヒープ化された範囲を並べ替える                                                             | C++20 |
| [`ranges::is_heap_until`](algorithm/ranges_is_heap_until.md) | 範囲がヒープ化されているか判定し、ヒープ化されていない最初の要素を指すイテレータを取得する | C++20 |
| [`ranges::is_heap`](algorithm/ranges_is_heap.md)             | 範囲がヒープ化されているか判定する                                                         | C++20 |

### 最小と最大

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------|-----------------------------------|-------|
| [`min`](algorithm/min.md)                       | 最小値を取得する | |
| [`max`](algorithm/max.md)                       | 最大値を取得する | |
| [`minmax`](algorithm/minmax.md)                 | 最小値と最大値を取得する | C++11 |
| [`min_element`](algorithm/min_element.md)       | 範囲内の最小要素へのイテレータを取得する | |
| [`max_element`](algorithm/max_element.md)       | 範囲内の最大要素へのイテレータを取得する | |
| [`minmax_element`](algorithm/minmax_element.md) | 範囲内の最小要素と最大要素へのイテレータを取得する | C++11 |
| [`clamp`](algorithm/clamp.md)                   | 値を範囲内に収める | C++17 |
| [`ranges::min`](algorithm/ranges_min.md)                       | 最小値を取得する                                   | C++20 |
| [`ranges::max`](algorithm/ranges_max.md)                       | 最大値を取得する                                   | C++20 |
| [`ranges::minmax`](algorithm/ranges_minmax.md)                 | 最小値と最大値を取得する                           | C++20 |
| [`ranges::min_element`](algorithm/ranges_min_element.md)       | 範囲内の最小要素へのイテレータを取得する           | C++20 |
| [`ranges::max_element`](algorithm/ranges_max_element.md)       | 範囲内の最大要素へのイテレータを取得する           | C++20 |
| [`ranges::minmax_element`](algorithm/ranges_minmax_element.md) | 範囲内の最小要素と最大要素へのイテレータを取得する | C++20 |
| [`ranges::clamp`](algorithm/ranges_clamp.md)                   | 値を範囲内に収める                                 | C++20 |

### 辞書式比較

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------------|---------------------------------|-------|
| [`lexicographical_compare`](algorithm/lexicographical_compare.md) | 2つの範囲を辞書式順序で比較する | |
| [`ranges::lexicographical_compare`](algorithm/ranges_lexicographical_compare.md) | 2つの範囲を辞書式順序で比較する | C++20 |

### 三方比較アルゴリズム

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------------|---------------------------------|-------|
| [`lexicographical_compare_three_way`](algorithm/lexicographical_compare_three_way.md) | 2つの範囲を辞書式順序で比較する | C++20 |


### 順列

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------|------------------------|-------|
| [`next_permutation`](algorithm/next_permutation.md) | 次の順列を生成する     | |
| [`prev_permutation`](algorithm/prev_permutation.md) | 前の順列を生成する     | |
| [`is_permutation`](algorithm/is_permutation.md)     | 範囲が順列かを判定する | C++11 |
| [`ranges::next_permutation`](algorithm/ranges_next_permutation.md) | 次の順列を生成する     | C++20 |
| [`ranges::prev_permutation`](algorithm/ranges_prev_permutation.md) | 前の順列を生成する     | C++20 |
| [`ranges::is_permutation`](algorithm/ranges_is_permutation.md)     | 範囲が順列かを判定する | C++20 |

### `fold`アルゴリズム

`fold`操作は、初期値及び累積値とともに範囲の各要素について与えられた関数を適用していき、その結果を返すものである。これは、数値集計処理に特化した[`accumulate`](/reference/numeric/accumulate.md)を改善しより汎用的にしたものである。処理を範囲のどちら側から始めるかによって、`foldl`（`fold_left`）と`foldr`（`fold_right`）の2種類がある。

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------|------------------------|-------|
| [`ranges::fold_left`](algorithm/ranges_fold_left.md)  | 範囲の左（先頭）からの`fold` | C++23 |
| [`ranges::fold_right`](algorithm/ranges_fold_right.md)| 範囲の右（終端）からの`fold` | C++23 |
| [`ranges::fold_left_first`](algorithm/ranges_fold_left_first.md)| 範囲の左（先頭）からの`fold`、初期値を省略する | C++23 |
| [`ranges::fold_right_last`](algorithm/ranges_fold_right_last.md)| 範囲の右（終端）からの`fold`、初期値を省略する | C++23 |
| [`ranges::fold_left_with_iter`](algorithm/ranges_fold_left_with_iter.md)  | 範囲の左（先頭）からの`fold`、終端イテレータを返す      | C++23 |
| [`ranges::fold_left_first_with_iter`](algorithm/ranges_fold_left_first_with_iter.md.nolink)  | 範囲の左（先頭）からの`fold`、初期値を省略し終端イテレータを返す      | C++23 |

### 戻り値

これらの型は、複数の値を1つの戻り値として返すために使われる汎用的な型である。構造化束縛で受け取ることが想定されている。

| 名前                                                                 | 説明                                     | 対応バージョン |
|----------------------------------------------------------------------|------------------------------------------|----------------|
| [`ranges::in_fun_result`](algorithm/ranges_in_fun_result.md)         | イテレータと関数オブジェクトを格納する型 | C++20          |
| [`ranges::in_in_result`](algorithm/ranges_in_in_result.md)           | 2つのイテレータを格納する型              | C++20          |
| [`ranges::in_out_result`](algorithm/ranges_in_out_result.md)         | 2つのイテレータを格納する型              | C++20          |
| [`ranges::in_in_out_result`](algorithm/ranges_in_in_out_result.md)   | 3つのイテレータを格納する型              | C++20          |
| [`ranges::in_out_out_result`](algorithm/ranges_in_out_out_result.md) | 3つのイテレータを格納する型              | C++20          |
| [`ranges::min_max_result`](algorithm/ranges_min_max_result.md)       | 2つの値または参照を格納する型            | C++20          |
| [`ranges::in_found_result`](algorithm/ranges_in_found_result.md)     | イテレータとbool値を格納する型           | C++20          |
| [`ranges::in_value_result`](algorithm/ranges_in_value_result.md)     | イテレータと値を格納する型               | C++23          |
| [`ranges::out_value_result`](algorithm/ranges_out_value_result.md)   | イテレータと値を格納する型               | C++23          |


## 関連項目
- [`<numeric>`](/reference/numeric.md)
    - 数値計算のアルゴリズム


## 参照
- [N2930 Range-Based For Loop Wording (Without Concepts)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2930.html)
- [N4821 25 Algorithms library](https://timsong-cpp.github.io/cppwp/n4861/algorithms)
