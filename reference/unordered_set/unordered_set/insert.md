#insert
```cpp
pair<iterator, bool> insert(const value_type& v);
pair<iterator, bool> insert(value_type&& rv);                  // (1)

iterator insert(const_iterator position, const value_type& v);
iterator insert(const_iterator position, value_type&& rv);     // (2)

template <class InputIterator>
void insert(InputIterator first, InputIterator last);          // (3)

void insert(initializer_list<value_type> il);                  // (4)
```
* pair[link /reference/utility/pair.md]
* initializer_list[link /reference/initializer_list.md]

##概要

コンテナに要素を追加する。


##要件

<li><code style='color:black'>v</code> を引数にとる形式（(1)、(2)の上側）では、<code style='color:black'>value_type</code> はコンテナに対してコピー挿入可能（CopyInsertable）でなければならない。
コンテナに対してコピー挿入可能とは、<code style='color:black'>m</code> をアロケータ型 <code style='color:black'>allocator_type</code> の lvalue、<code style='color:black'>p</code> を要素型 <code style='color:black'>value_type</code> へのポインタとすると、以下の式が適格（well-formed）であるということである。
<blockquote>
<pre style='margin:0'><code style='color:black'>std::[allocator_traits](/site/cpprefjp/reference/memory/allocator_traits)[construct](/site/cpprefjp/reference/memory/allocator_traits/construct)(m, p, v);</code></pre>
</blockquote>
</li>
<li><code style='color:black'>rv</code> を引数にとる形式（(1)、(2)の下側）では、<code style='color:black'>value_type</code> はコンテナに対してムーブ挿入可能（MoveInsertable）でなければならない。
コンテナに対してムーブ挿入可能とは、<code style='color:black'>m</code> をアロケータ型 <code style='color:black'>allocator_type</code> の lvalue、<code style='color:black'>p</code> を要素型 <code style='color:black'>value_type</code> へのポインタとすると、以下の式が適格（well-formed）であるということである。
<blockquote>
<pre style='margin:0'><code style='color:black'>std::[allocator_traits](/site/cpprefjp/reference/memory/allocator_traits)[construct](/site/cpprefjp/reference/memory/allocator_traits/construct)(m, p, std::[move](/reference/utility/move.md)(rv));</code></pre>
</blockquote>
</li>
<li>引数 <code style='color:black'>position</code> は、コンテナの有効な読み取り専用イテレータでなければならない。
なお、標準では間接参照可能（dereferenceable）である必要があることになっているが、その必要はない（つまり、最終要素の次を指すイテレータでも良い）ものと思われる。</li>
<li>引数 <code style='color:black'>first</code>、および、<code style='color:black'>last</code>は、入力イテレータの要件を満たし、かつ、範囲 <code style='color:black'>[first, last)</code> が当該コンテナ<strong>以外を指す</strong>有効な範囲でなければならない。
また、引数 <code style='color:black'>first</code>、および、<code style='color:black'>last</code> を引数にとる形式（(3)）では、このコンテナの要素型 <code style='color:black'>value_type</code> は、コンテナに対して <code style='color:black'>*first</code> から直接構築可能（EmplaceConstructible）でなければならない。
ここで、コンテナに対して <code style='color:black'>*first</code> から直接構築可能とは、<code style='color:black'>m</code> をアロケータ型 <code style='color:black'>allocator_type</code> の lvalue、<code style='color:black'>p</code> を要素型 <code style='color:black'>value_type</code> へのポインタとすると、以下の式が適格（well-formed）であるということである。
<blockquote><code style='color:black'>std::[allocator_traits](/site/cpprefjp/reference/memory/allocator_traits)[construct](/site/cpprefjp/reference/memory/allocator_traits/construct)(m, p, *first);</code></blockquote>
なお、<code style='color:black'>first</code>、および、<code style='color:black'>last</code>は、標準では <code style='color:black'>value_type</code> を参照しなければならない（つまり、コンテナの <code style='color:black'>value_type</code> と <code style='color:black'>std::[iterator_traits](/reference/iterator/iterator_traits.md)<decltype(first)>::value_type</code> が同一の型でなければならない）ことになっているが、実際にはその必要はなく、上記の直接構築可能の要件を満たすだけで良いものと思われる。</li>

- (4)の形式では、<code style='color:black'>value_type</code> はコンテナに対してコピー挿入可能でなければならない。


##効果

- (1)	引数 `v`、あるいは `rv` で指定した値と等価なキーがコンテナに存在していなければ、当該要素を追加する。
- (2)	引数 `v`、あるいは `rv` で指定した値と等価なキーがコンテナに存在していなければ、当該要素を追加する。引数 `position` は、要素の挿入位置を探し始める場所のヒントとして使用されるが、実装によって無視されるかもしれない。
- (3)	範囲 `[first, last)` のすべての要素 `t` に対して、(1)の形式の `insert(t)` を呼び出した場合と同等である。
- (4)	(3)の形式を `insert(il.begin(), il.end())` として呼び出した場合と同等である。


##戻り値

- (1)	[`pair`](/reference/utility/pair.md) の `bool` 部分（`second` 部）は、要素が追加されたら `true`、追加されなかったら（既にあったら）`false`。[`pair`](/reference/utility/pair.md) の `iterator` 部分（`first` 部）は、追加された要素（`bool` 部分が `true` の場合）、あるいは、既にあった要素（`bool` 部分が `false` の場合）を指すイテレータ。 
- (2)	新たな要素が追加された場合、その追加された要素を指すイテレータ。新たな要素が追加されなかった場合、既にあった要素を指すイテレータ。
- (3)	なし
- (4)	なし


##例外

単一要素の形式（(1)と(2)）では、ハッシュ関数以外から例外が投げられた場合には、挿入はされない。


##計算量

- (1)	平均的なケースでは定数（O(1)）だが、最悪のケースではコンテナの要素数 [`size()`](/reference/unordered_set/unordered_set/size.md) に比例（O(N)）。
- (2)	平均的なケースでは定数（O(1)）だが、最悪のケースではコンテナの要素数 [`size()`](/reference/unordered_set/unordered_set/size.md) に比例（O(N)）。
- (3)	平均的なケースでは引数の範囲の要素数 `std::[distance](/reference/iterator/distance.md)(first, last)` に比例（O(N)）するが、最悪のケースでは引数の範囲の要素数 `std::[distance](/reference/iterator/distance.md)(first, last)` とコンテナの要素数 [`size()`](/reference/unordered_set/unordered_set/size.md) に 1 加えたものの積に比例（O(N^2)）。
- (4)	(3)の形式を `insert(il.begin(), il.end())` として呼び出した場合と同等。




##備考


- これらの関数が呼ばれた後も、当該コンテナ内の要素を指す参照は無効にはならない。なお、標準に明確な記載は無いが、当該コンテナ内の要素を指すポインタも無効にはならない。
<li>これらの関数が呼ばれた後も、呼び出しの前後でこのコンテナのバケット数（<code style='color:black'>[bucket_count](/reference/unordered_set/unordered_set/bucket_count.md)()</code> の戻り値）が変わらなかった場合には当該コンテナを指すイテレータは無効にはならない。
それ以外の場合は、当該コンテナを指すイテレータは無効になる可能性がある。
コンテナのバケット数が変わらない場合とは、
<ol>
- 追加しようとした要素と等価なキーの要素が全て既にコンテナに存在したため、要素が追加されなかった。

- 要素追加後の要素数が、要素追加前のバケット数（<code style='color:black'>[bucket_count](/reference/unordered_set/unordered_set/bucket_count.md)()</code> の戻り値）×最大負荷率（<code style='color:black'>[max_load_factor](/reference/unordered_set/unordered_set/max_load_factor.md)()</code> の戻り値）よりも小さかった。
</ol>
のいずれかである。
なお、後者の条件は「よりも小さい」となっているが、最大負荷率の定義からすると「以下」の方が適切と思われる。<code style='color:black'>[reserve](/reference/unordered_set/unordered_set/reserve.md)</code> も参照。</li>


##例

```cpp
<pre style='margin:0'><code style='color:black'>#include <iostream>
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
}</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* unordered_set[link /reference/unordered_set.md]
* forward_list[link /reference/forward_list.md]
* iterator[link /reference/iterator.md]
* algorithm[link /reference/algorithm.md]
* string[link /reference/string.md]
* copy[link /reference/algorithm/copy.md]
* begin[link /reference/unordered_set/unordered_set/begin.md]
* end[link /reference/unordered_set/unordered_set/end.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]
* second[link /reference/utility/pair.md]
* first[link /reference/utility/pair.md]
* cbegin[link /reference/forward_list/cbegin.md]
* cend[link /reference/forward_list/cend.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>true 6 false 2
insert one element : 6 5 4 3 2 1 0
6 2
insert one element with hint : 6 5 4 3 2 1 0
insert range : 7 8 6 5 4 3 2 1 0
insert initializer_list : 7 8 6 5 4 3 2 1 0</pre>
```

注：<code style='color:black'>[unordered_set](/reference/unordered_set/unordered_set.md)</code> は非順序連想コンテナであるため、出力順序は無意味であることに注意


##バージョン


###言語

- C++11

###処理系

- [Clang](/implementation#clang.md): -

- [Clang, C++0x mode](/implementation#clang.md): 3.1

- [GCC](/implementation#gcc.md): -

- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0

- [ICC](/implementation#icc.md): ?

- [Visual C++](/implementation#visual_cpp.md): ?

##実装例

(2)以降の形式は、(1)の形式を使って実装することができる。

```cpp
<pre style='margin:0'><code style='color:black'>template <class Key, class Hash, class Pred, class Allocator>
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
}</pre>
```
* move[link /reference/utility/move.md]
* initializer_list[link /reference/initializer_list.md]
* begin[link /site/cpprefjp/reference/initializer_list/begin]
* end[link /site/cpprefjp/reference/initializer_list/end]

##参照

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[emplace](/reference/unordered_set/unordered_set/emplace.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>コンテナ内への要素の直接構築</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[emplace_hint](/reference/unordered_set/unordered_set/emplace_hint.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>挿入位置のヒントを使用したコンテナ内への要素の直接構築</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[bucket_count](/reference/unordered_set/unordered_set/bucket_count.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>バケット数の取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[load_factor](/reference/unordered_set/unordered_set/load_factor.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>現在の負荷率（バケットあたりの要素数の平均）を取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[max_load_factor](/reference/unordered_set/unordered_set/max_load_factor.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>負荷率の最大値を取得、設定</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[rehash](/reference/unordered_set/unordered_set/rehash.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>最小バケット数指定によるバケット数の調整</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[reserve](/reference/unordered_set/unordered_set/reserve.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>最小要素数指定によるバケット数の調整</td>
</tr>
</tbody>
</table>