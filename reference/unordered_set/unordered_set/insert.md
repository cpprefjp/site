# insert
* unordered_set[meta header]
* std[meta namespace]
* unordered_set[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
pair<iterator, bool> insert(const value_type& v);
pair<iterator, bool> insert(value_type&& rv);                  // (1)

iterator insert(const_iterator position, const value_type& v);
iterator insert(const_iterator position, value_type&& rv);     // (2)

template <class InputIterator>
void insert(InputIterator first, InputIterator last);          // (3)

void insert(initializer_list<value_type> il);                  // (4)

insert_return_type insert(node_type&& nh);                     // (5) C++17
iterator insert(const_iterator hint, node_type&& nh);          // (6) C++17
```
* pair[link /reference/utility/pair.md]
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
コンテナに要素を追加する。


## 要件
- `v` を引数にとる形式（(1)、(2)の上側）では、`value_type` はコンテナに対してコピー挿入可能（CopyInsertable）でなければならない。  
	コンテナに対してコピー挿入可能とは、`m` をア�ケータ型 `allocator_type` の左辺値、`p` を要素型 `value_type` へのポインタとすると、以下の式が適格（well-formed）であるということである。

	`std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<allocator_type>::`[`construct`](/reference/memory/allocator_traits/construct.md)`(m, p, v);`

- `rv` を引数にとる形式（(1)、(2)の下側）では、`value_type` はコンテナに対してムーブ挿入可能（MoveInsertable）でなければならない。  
	コンテナに対してムーブ挿入可能とは、`m` をア�ケータ型 `allocator_type` の左辺値、`p` を要素型 `value_type` へのポインタとすると、以下の式が適格（well-formed）であるということである。

	`std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<allocator_type>::`[`construct`](/reference/memory/allocator_traits/construct.md)`(m, p, std::`[`move`](/reference/utility/move.md)`(rv));`

- 引数 `position` は、コンテナの有効な�み取り専用イテレータでなければならない。  
	なお、標準では間接参照可能（dereferenceable）である必要があることになっているが、その必要はない（つまり、最終要素の次を指すイテレータでも良い）ものと思われる。

- 引数 `first`、および、`last`は、入力イテレータの要件を満たし、かつ、範囲 `[first, last)` が当該コンテナ**以外を指す**有効な範囲でなければならない。  
	また、引数 `first`、および、`last` を引数にとる形式（(3)）では、このコンテナの要素型 `value_type` は、コンテナに対して `*first` から直接構築可能（EmplaceConstructible）でなければならない。  
	ここで、コンテナに対して `*first` から直接構築可能とは、`m` をア�ケータ型 `allocator_type` の左辺値、`p` を要素型 `value_type` へのポインタとすると、以下の式が適格（well-formed）であるということである。

	`std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<allocator_type>::`[`construct`](/reference/memory/allocator_traits/construct.md)`(m, p, *first);`

	なお、`first`、および、`last`は、標準では `value_type` を参照しなければならない（つまり、コンテナの `value_type` と `std::`[`iterator_traits`](/reference/iterator/iterator_traits.md)`<decltype(first)>::value_type` が同一の型でなければならない）ことになっているが、実際にはその必要はなく、上記の直接構築可能の要件を満たすだけで良いものと思われる。

- (4)の形式では、`value_type` はコンテナに対してコピー挿入可能でなければならない。

- (5), (6)の形式では、 `nh` は空である、または、`(*this).get_allocator() == nh.get_allocator()`でなければならない。


## 効果
- (1) : 引数 `v`、あるいは `rv` で指定した値と�価な�ーがコンテナに�在していなければ、当該要素を追加する。
- (2) : 引数 `v`、あるいは `rv` で指定した値と�価な�ーがコンテナに�在していなければ、当該要素を追加する。  
	引数 `position` は、要素の挿入位置を探し始める場所のヒントとして使用されるが、実装によって無視されるかもしれない。
- (3) : 範囲 `[first, last)` のすべての要素 `t` に対して、(1)の形式の `insert(t)` を呼び出した場合と�価である。
- (4) : (3)の形式を `insert(il.begin(), il.end())` として呼び出した場合と�価である。
- (5) : `nh`が空の場合、効果はない。
それ以外の場合、`nh.key()`と�価の�ーを持つ要素がコンテナにない場合に限り、`nh`が所有する要素を挿入する。
- (6) : `nh`が空の場合、効果はなく、`(*this).end()`を返す。
それ以外の場合、`nh.key()`と�価の�ーを持つ要素がコンテナにない場合に限り、`nh`が所有する要素を挿入する。`nh.key()`と�価の�ーの要素を指すイテレータを常に返す。
要素は、`p`の直前の位置のできるだけ近くに挿入される。


## 戻り値
- (1) : [`pair`](/reference/utility/pair.md) の `bool` 部分（`second` 部）は、要素が追加されたら `true`、追加されなかったら（既にあったら）`false`。  
	[`pair`](/reference/utility/pair.md) の `iterator` 部分（`first` 部）は、追加された要素（`bool` 部分が `true` の場合）、あるいは、既にあった要素（`bool` 部分が `false` の場合）を指すイテレータ。
- (2) : 新たな要素が追加された場合、その追加された要素を指すイテレータ。  
	新たな要素が追加されなかった場合、既にあった要素を指すイテレータ。
- (3) : なし
- (4) : なし
- (5) : 戻り値としては、[`insert_return_type`](/reference/map/map.md)を返す。`insert_return_type`のイテレータ型メンバ変数`position`、`bool`型メンバ変数`inserted`に格納される値は(1), (2)のものと同じ情報である。`nh`が空の場合は、`position`は終端イテレータである。`node_type`型メンバ変数`node`には、
    - 挿入された場合には、空の[ノードハンドル](/reference/node_handle/node_handle.md)。
    - 挿入されなかった場合には、`nh`の値である。 
- (6) : `nh`が空の場合、`(*this).end()`を返す。そうではない場合、`nh`と�価の�ーの要素を指すイテレータを常に返す。


## 例外
単一要素の形式（(1)と(2)）では、ハッシュ関数以外から例外が投げられた場合には、挿入はされない。


## 計算量
- (1) : 平均的なケースでは定数（O(1)）だが、最悪のケースではコンテナの要素数 [`size`](size.md)`()` に比例（O(N)）。
- (2) : 平均的なケースでは定数（O(1)）だが、最悪のケースではコンテナの要素数 [`size`](size.md)`()` に比例（O(N)）。
- (3) : 平均的なケースでは引数の範囲の要素数 `std::`[`distance`](/reference/iterator/distance.md)`(first, last)` に比例（O(N)）するが、最悪のケースでは引数の範囲の要素数 `std::`[`distance`](/reference/iterator/distance.md)`(first, last)` とコンテナの要素数 [`size()`](size.md) に 1 加えたものの積に比例（O(`std::`[`distance`](/reference/iterator/distance.md)`(first, last) * (`[`size`](size.md)`() + 1)`)）。
- (4) : (3)の形式を `insert(il.begin(), il.end())` として呼び出した場合と�価。

- (5), (6) : 平均的なケースでは `O(1)`、最悪のケースでは `O(size())`。


## 備考
- これらの関数が呼ばれた後も、当該コンテナ内の要素を指す参照は無効にはならない。
	なお、規格書に明確な記載は無いが、当該コンテナ内の要素を指すポインタも無効にはならない。
- これらの関数が呼ばれた後も、呼び出しの前後でこのコンテナのバケット数（[`bucket_count`](bucket_count.md)`()` の戻り値）が変わらなかった場合には当該コンテナを指すイテレータは無効にはならない。  
	それ以外の場合は、当該コンテナを指すイテレータは無効になる可能性がある。  
	コンテナのバケット数が変わらない場合とは、

	* 追加しようとした要素と�価な�ーの要素が全て既にコンテナに�在したため、要素が追加されなかった。
	* 要素追加後の要素数が、要素追加前のバケット数（[`bucket_count`](bucket_count.md)`()` の戻り値）×最大負荷率（[`max_load_factor`](max_load_factor.md)`()` の戻り値）よりも小さかった。

	のいずれかである。  
	なお、後者の条件は「よりも小さい」となっているが、最大負荷率の定義からすると「以下」の方が適切と思われる。[`reserve`](reserve.md) も参照。

 - (5), (6) の場合、要素はコピーもムーブもされない。


## 例
```cpp example
#include <iostream>
#include <unordered_set>
#include <forward_list>
#include <iterator>
#include <algorithm>
#include <string>

template <class C>
void print(const std::string& label, const C& c)
{
  std::cout << label << " : ";
  std::copy(c.begin(), c.end(), std::ostream_iterator<typename C::value_type>(std::cout, " "));
  std::cout << std::endl;
}

int main()
{
  std::cout << std::boolalpha;

  // 一つの要素を挿入（(1)の形式）
  {
    std::unordered_set<int> us{ 0, 1, 2, 3, 4, 5, };

    auto p1 = us.insert(6); // 追加されるケース
    std::cout << p1.second << ' ' << *p1.first << ' ';
    auto p2 = us.insert(2); // 追加されないケース
    std::cout << p2.second << ' ' << *p2.first << std::endl;
    print("insert one element", us);
  }

  // 一つの要素を挿入（(2)の形式）
  {
    std::unordered_set<int> us{ 0, 1, 2, 3, 4, 5, };

    auto it1 = us.insert(us.begin(), 6); // 追加されるケース
    std::cout << *it1 << ' ';
    auto it2 = us.insert(us.begin(), 2); // 追加されないケース
    std::cout << *it2 << std::endl;
    print("insert one element with hint", us);
  }

  // 複数の要素を挿入（(3)の形式）
  {
    std::unordered_set<int> us{ 0, 1, 2, 3, 4, 5, };

    std::forward_list<int> fl{ 5, 6, 0, 8, 7, };
    us.insert(fl.cbegin(), fl.cend()); // forward_list の要素を全部
    print("insert range", us);
  }

  // 複数の要素を挿入（(4)の形式）
  {
    std::unordered_set<int> us{ 0, 1, 2, 3, 4, 5, };

    us.insert({ 5, 6, 0, 8, 7, });
    print("insert initializer_list", us);
  }
}
```
* insert[color ff0000]
* c.begin()[link begin.md]
* c.end()[link end.md]
* us.begin()[link begin.md]
* us.end()[link end.md]
* second[link /reference/utility/pair.md]
* first[link /reference/utility/pair.md]
* fl.cbegin()[link /reference/forward_list/forward_list/cbegin.md]
* fl.cend()[link /reference/forward_list/forward_list/cend.md]

### 出力
```
true 6 false 2
insert one element : 6 5 4 3 2 1 0
6 2
insert one element with hint : 6 5 4 3 2 1 0
insert range : 7 8 6 5 4 3 2 1 0
insert initializer_list : 7 8 6 5 4 3 2 1 0
```

注：[`unordered_set`](/reference/unordered_set/unordered_set.md) は非順序連想コンテナであるため、出力順序は無意味であることに注意


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 実装例
(2)以降の形式は、(1)の形式を使って実装することができる。

```cpp
template <class Key, class Hash, class Pred, class Allocator>
inline iterator unordered_set<Key, Hash, Pred, Allocator>::insert(const_iterator, const value_type& v)
{
  return insert(v).first;
}

template <class Key, class Hash, class Pred, class Allocator>
inline iterator unordered_set<Key, Hash, Pred, Allocator>::insert(const_iterator, value_type&& rv)
{
  return insert(std::move(rv)).first;
}

template <class Key, class Hash, class Pred, class Allocator>
template <class InputIterator>
inline void unordered_set<Key, Hash, Pred, Allocator>::insert(InputIterator first, InputIterator last);
{
  for (; first != last; ++first)
    insert(*first);
}

template <class Key, class Hash, class Pred, class Allocator>
inline void unordered_set<Key, Hash, Pred, Allocator>::insert(initializer_list<Key> il);
{
  insert(il.begin(), il.end());
}
```
* insert[color ff0000]
* std::move[link /reference/utility/move.md]
* il.begin()[link /reference/initializer_list/initializer_list/begin.md]
* il.end()[link /reference/initializer_list/initializer_list/end.md]


## 関連項目

| 名前                                      | 説明                                                   |
|-------------------------------------------|--------------------------------------------------------|
| [`emplace`](emplace.md)                 | コンテナ内への要素の直接構築                           |
| [`emplace_hint`](emplace_hint.md)       | 挿入位置のヒントを使用したコンテナ内への要素の直接構築 |
| [`erase`](erase.md)                     | 要素の削除                                             |
| [`clear`](clear.md)                     | 全要素の削除                                           |
| [`swap`](swap.md)                       | 内容の交換                                             |
| [`bucket_count`](bucket_count.md)       | バケット数の取得                                       |
| [`load_factor`](load_factor.md)         | 現在の負荷率（バケットあたりの要素数の平均）を取得     |
| [`max_load_factor`](max_load_factor.md) | 負荷率の最大値を取得、�定                             |
| [`rehash`](rehash.md)                   | 最小バケット数指定によるバケット数の調整               |
| [`reserve`](reserve.md)                 | 最小要素数指定によるバケット数の調整                   |


## 参照
- [N2350 Container insert/erase and iterator constness (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2350.pdf)
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (4)の経緯となる提案文書
- [Splicing Maps and Sets(Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0083r3.pdf)
    - (5), (6)経緯となる提案文書
